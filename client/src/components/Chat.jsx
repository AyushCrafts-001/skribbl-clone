import { useState, useEffect, useRef } from "react";
import socket from "../services/socket";
import sound from "../utils/sound";

export function Chat({ roomCode, playerName, isDrawer = false, hasGuessed = false }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleChatMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.type === "system" || msg.type === "guesser_chat") {
        sound.playPop();
      }
    };

    const handleCorrectGuess = (data) => {
      sound.playCorrect();
      setMessages((prev) => [
        ...prev,
        {
          type: "correct_guess",
          playerName: data.playerName,
          points: data.points,
          text: `🎉 ${data.playerName} guessed the word! (+${data.points} pts)`,
          timestamp: Date.now(),
        },
      ]);
    };

    const handleSystemAlert = (data) => {
      sound.playBuzz();
      setMessages((prev) => [
        ...prev,
        {
          type: data.type === "close" ? "close_alert" : "system_alert",
          text: data.message,
          timestamp: Date.now(),
        },
      ]);
    };

    const handleRoundEnded = (data) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "round_summary",
          text: `⏱️ ${data.reason || "Round ended!"} The word was: "${data.word}"`,
          timestamp: Date.now(),
        },
      ]);
    };

    socket.on("chat:message", handleChatMessage);
    socket.on("game:correct_guess", handleCorrectGuess);
    socket.on("chat:system_alert", handleSystemAlert);
    socket.on("game:round_ended", handleRoundEnded);

    return () => {
      socket.off("chat:message", handleChatMessage);
      socket.off("game:correct_guess", handleCorrectGuess);
      socket.off("chat:system_alert", handleSystemAlert);
      socket.off("game:round_ended", handleRoundEnded);
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    socket.emit("chat:message", { roomCode, text: trimmed });
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="chat-container">
      {/* Chat header */}
      <div className="chat-header">
        <span className="chat-title">💬 Game Chat & Guesses</span>
      </div>

      {/* Messages list */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">Chat or type guesses here!</div>
        )}

        {messages.map((m, idx) => {
          if (m.type === "correct_guess") {
            return (
              <div key={idx} className="msg msg-correct">
                {m.text}
              </div>
            );
          }

          if (m.type === "close_alert") {
            return (
              <div key={idx} className="msg msg-close">
                {m.text}
              </div>
            );
          }

          if (m.type === "system_alert" || m.type === "round_summary") {
            return (
              <div key={idx} className="msg msg-system">
                {m.text}
              </div>
            );
          }

          if (m.type === "system") {
            return (
              <div key={idx} className="msg msg-info">
                ℹ️ {m.text}
              </div>
            );
          }

          const isSelf = m.playerName?.toLowerCase() === playerName?.toLowerCase();

          if (m.type === "guesser_chat") {
            return (
              <div key={idx} className={`msg msg-guesser ${isSelf ? "msg-self" : ""}`}>
                <span className="msg-author">{m.playerName} (guessed): </span>
                <span className="msg-content">{m.text}</span>
              </div>
            );
          }

          return (
            <div key={idx} className={`msg msg-normal ${isSelf ? "msg-self" : ""}`}>
              <span className="msg-author">{m.playerName}: </span>
              <span className="msg-content">{m.text}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="chat-form">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            hasGuessed
              ? "You guessed it! Chat with other guessers..."
              : isDrawer
              ? "Chat with viewers (don't spoil word)..."
              : "Type your guess here..."
          }
          maxLength={100}
          className={`chat-input ${hasGuessed ? "input-solved" : ""}`}
        />
        <button type="submit" className="chat-send-btn" disabled={!text.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
