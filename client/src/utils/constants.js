// Shared Skribbl Constants

export const AVATAR_COLORS = [
  "#f59e0b", // Warm Yellow / Gold
  "#3b82f6", // Vibrant Blue
  "#10b981", // Emerald Green
  "#ef4444", // Bright Red
  "#8b5cf6", // Purple
  "#f97316", // Orange
  "#06b6d4", // Cyan
  "#ec4899", // Pink
];

export const TOTAL_EYES = 6;
export const TOTAL_MOUTHS = 6;

export const getRandomAvatar = () => ({
  color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
  eyes: Math.floor(Math.random() * TOTAL_EYES),
  mouth: Math.floor(Math.random() * TOTAL_MOUTHS),
});

// Skribbl.io iconic 22-color palette
export const SKRIBBL_PALETTE = [
  "#ffffff", "#c1c1c1", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#ec4899", "#d97706",
  "#000000", "#4b5563", "#7f1d1d", "#7c2d12", "#713f12", "#14532d", "#155e75", "#1e3a8a", "#581c87", "#831843", "#78350f"
];

export const BRUSH_SIZES = [
  { size: 4, label: "Fine" },
  { size: 8, label: "Medium" },
  { size: 16, label: "Thick" },
  { size: 28, label: "Huge" },
];
