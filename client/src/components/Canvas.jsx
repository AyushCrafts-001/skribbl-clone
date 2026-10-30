import { useEffect, useRef, useState, useCallback } from "react";
import socket from "../services/socket";
import { SKRIBBL_PALETTE, BRUSH_SIZES } from "../utils/constants";
import "./Canvas.css";

export function Canvas({ roomCode, isDrawer = false, disabled = false }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const currentPath = useRef([]);
  const lastPoint = useRef(null);

  const [tool, setTool] = useState("pen"); // 'pen' | 'eraser' | 'bucket'
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(8);

  // Virtual canvas dimensions for resolution independence
  const VIRTUAL_WIDTH = 800;
  const VIRTUAL_HEIGHT = 600;

  // Initialize canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = VIRTUAL_WIDTH;
    canvas.height = VIRTUAL_HEIGHT;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
  }, []);

  // Helper to get normalized virtual coordinate {x, y}
  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = VIRTUAL_WIDTH / rect.width;
    const scaleY = VIRTUAL_HEIGHT / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Helper to draw a line segment
  const drawSegment = useCallback((fromX, fromY, toX, toY, strokeColor, strokeSize) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }, []);

  // Flood fill / Paint bucket algorithm (BFS)
  const floodFill = useCallback((startX, startY, fillHexColor) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = VIRTUAL_WIDTH;
    const height = VIRTUAL_HEIGHT;

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const x0 = Math.floor(Math.max(0, Math.min(width - 1, startX)));
    const y0 = Math.floor(Math.max(0, Math.min(height - 1, startY)));

    const startIndex = (y0 * width + x0) * 4;
    const startR = data[startIndex];
    const startG = data[startIndex + 1];
    const startB = data[startIndex + 2];
    const startA = data[startIndex + 3];

    // Convert hex to rgb
    const fillR = parseInt(fillHexColor.slice(1, 3), 16);
    const fillG = parseInt(fillHexColor.slice(3, 5), 16);
    const fillB = parseInt(fillHexColor.slice(5, 7), 16);
    const fillA = 255;

    // Same color check
    if (
      Math.abs(startR - fillR) < 5 &&
      Math.abs(startG - fillG) < 5 &&
      Math.abs(startB - fillB) < 5 &&
      startA === fillA
    ) {
      return;
    }

    const matchesStart = (idx) => {
      return (
        Math.abs(data[idx] - startR) < 28 &&
        Math.abs(data[idx + 1] - startG) < 28 &&
        Math.abs(data[idx + 2] - startB) < 28 &&
        Math.abs(data[idx + 3] - startA) < 28
      );
    };

    const queue = [x0 + y0 * width];
    const visited = new Uint8Array(width * height);
    visited[x0 + y0 * width] = 1;

    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      const cx = pos % width;
      const cy = Math.floor(pos / width);
      const idx = pos * 4;

      data[idx] = fillR;
      data[idx + 1] = fillG;
      data[idx + 2] = fillB;
      data[idx + 3] = fillA;

      // 4-directional flood fill
      const neighbors = [
        cx > 0 ? pos - 1 : -1,
        cx < width - 1 ? pos + 1 : -1,
        cy > 0 ? pos - width : -1,
        cy < height - 1 ? pos + width : -1,
      ];

      for (const n of neighbors) {
        if (n !== -1 && !visited[n] && matchesStart(n * 4)) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, []);

  // Replay complete draw history from server (e.g. late join or undo)
  const replayHistory = useCallback(
    (history) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

      if (!Array.isArray(history)) return;

      history.forEach((stroke) => {
        if (stroke.type === "line") {
          drawSegment(
            stroke.fromX,
            stroke.fromY,
            stroke.toX,
            stroke.toY,
            stroke.color,
            stroke.size
          );
        } else if (stroke.type === "fill") {
          floodFill(stroke.x, stroke.y, stroke.color);
        } else if (stroke.type === "clear") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
        }
      });
    },
    [drawSegment, floodFill]
  );

  // Setup Socket listeners for incoming drawing events
  useEffect(() => {
    const handleLine = (data) => {
      drawSegment(data.fromX, data.fromY, data.toX, data.toY, data.color, data.size);
    };

    const handleFill = (data) => {
      floodFill(data.x, data.y, data.color);
    };

    const handleClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    };

    const handleUndo = (data) => {
      replayHistory(data?.history || []);
    };

    const handleHistory = (data) => {
      replayHistory(data?.history || []);
    };

    socket.on("drawing:line", handleLine);
    socket.on("drawing:fill", handleFill);
    socket.on("drawing:clear", handleClear);
    socket.on("drawing:undo", handleUndo);
    socket.on("drawing:history", handleHistory);

    return () => {
      socket.off("drawing:line", handleLine);
      socket.off("drawing:fill", handleFill);
      socket.off("drawing:clear", handleClear);
      socket.off("drawing:undo", handleUndo);
      socket.off("drawing:history", handleHistory);
    };
  }, [drawSegment, floodFill, replayHistory]);

  // Pointer / Touch down
  const handleStart = (e) => {
    if (!isDrawer || disabled) return;
    const pt = getCanvasCoordinates(e);

    if (tool === "bucket") {
      floodFill(pt.x, pt.y, color);
      socket.emit("drawing:fill", {
        roomCode,
        type: "fill",
        x: pt.x,
        y: pt.y,
        color,
      });
      return;
    }

    isDrawing.current = true;
    lastPoint.current = pt;
    currentPath.current = [pt];

    // Single click dot
    const strokeColor = tool === "eraser" ? "#ffffff" : color;
    const strokeSize = tool === "eraser" ? brushSize * 2 : brushSize;
    drawSegment(pt.x, pt.y, pt.x + 0.1, pt.y + 0.1, strokeColor, strokeSize);

    socket.emit("drawing:line", {
      roomCode,
      type: "line",
      fromX: pt.x,
      fromY: pt.y,
      toX: pt.x + 0.1,
      toY: pt.y + 0.1,
      color: strokeColor,
      size: strokeSize,
    });
  };

  // Pointer / Touch move
  const handleMove = (e) => {
    if (!isDrawing.current || !isDrawer || disabled || tool === "bucket") return;
    const pt = getCanvasCoordinates(e);
    const prev = lastPoint.current;
    if (!prev) return;

    const strokeColor = tool === "eraser" ? "#ffffff" : color;
    const strokeSize = tool === "eraser" ? brushSize * 2 : brushSize;

    drawSegment(prev.x, prev.y, pt.x, pt.y, strokeColor, strokeSize);

    socket.emit("drawing:line", {
      roomCode,
      type: "line",
      fromX: prev.x,
      fromY: prev.y,
      toX: pt.x,
      toY: pt.y,
      color: strokeColor,
      size: strokeSize,
    });

    lastPoint.current = pt;
    currentPath.current.push(pt);
  };

  // Pointer / Touch up
  const handleEnd = () => {
    isDrawing.current = false;
    lastPoint.current = null;
    currentPath.current = [];
  };

  const handleClearCanvas = () => {
    if (!isDrawer || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    socket.emit("drawing:clear", { roomCode, type: "clear" });
  };

  const handleUndo = () => {
    if (!isDrawer || disabled) return;
    socket.emit("drawing:undo", { roomCode });
  };

  return (
    <div className="canvas-wrapper">
      {/* The drawing canvas surface */}
      <div className="canvas-frame">
        <canvas
          ref={canvasRef}
          className={`drawing-canvas ${isDrawer && !disabled ? (tool === "bucket" ? "cursor-bucket" : "cursor-draw") : "cursor-not-allowed"}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />

        {!isDrawer && (
          <div className="canvas-viewer-badge">
            <span>👀 Viewing Mode</span>
          </div>
        )}
      </div>

      {/* Skribbl Toolbar (Only visible to active drawer) */}
      {isDrawer && !disabled && (
        <div className="skribbl-toolbar">
          {/* Tool selector */}
          <div className="tool-group">
            <button
              type="button"
              className={`tool-btn ${tool === "pen" ? "active" : ""}`}
              onClick={() => setTool("pen")}
              title="Brush / Pen"
            >
              ✏️
            </button>
            <button
              type="button"
              className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
              onClick={() => setTool("eraser")}
              title="Eraser"
            >
              🧹
            </button>
            <button
              type="button"
              className={`tool-btn ${tool === "bucket" ? "active" : ""}`}
              onClick={() => setTool("bucket")}
              title="Fill Bucket"
            >
              🪣
            </button>
            <button
              type="button"
              className="tool-btn"
              onClick={handleUndo}
              title="Undo Last Stroke"
            >
              ↩️
            </button>
            <button
              type="button"
              className="tool-btn danger"
              onClick={handleClearCanvas}
              title="Clear Canvas"
            >
              🗑️
            </button>
          </div>

          {/* Size picker */}
          <div className="size-group">
            {BRUSH_SIZES.map((b) => (
              <button
                key={b.size}
                type="button"
                className={`size-btn ${brushSize === b.size ? "active" : ""}`}
                onClick={() => setBrushSize(b.size)}
                title={b.label}
              >
                <span
                  className="size-dot"
                  style={{
                    width: Math.min(22, Math.max(6, b.size)),
                    height: Math.min(22, Math.max(6, b.size)),
                    backgroundColor: tool === "eraser" ? "#64748b" : color,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Color palette */}
          <div className="palette-grid">
            {SKRIBBL_PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-swatch ${color === c && tool !== "eraser" ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => {
                  setColor(c);
                  if (tool === "eraser") setTool("pen");
                }}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                if (tool === "eraser") setTool("pen");
              }}
              className="custom-color-picker"
              title="Custom Color"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Canvas;
