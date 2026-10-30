import { AVATAR_COLORS, TOTAL_EYES, TOTAL_MOUTHS } from "../utils/constants";

export function Avatar({ avatar, size = 48, className = "" }) {
  const color = avatar?.color || AVATAR_COLORS[0];
  const eyes = Number(avatar?.eyes) || 0;
  const mouth = Number(avatar?.mouth) || 0;

  const renderEyes = () => {
    switch (eyes % TOTAL_EYES) {
      case 1: // Cute happy curved eyes
        return (
          <>
            <path d="M 28 36 Q 34 30 40 36" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 60 36 Q 66 30 72 36" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 2: // Cool Sunglasses
        return (
          <>
            <rect x="25" y="30" width="20" height="13" rx="4" fill="#0f172a" />
            <rect x="55" y="30" width="20" height="13" rx="4" fill="#0f172a" />
            <line x1="45" y1="36" x2="55" y2="36" stroke="#0f172a" strokeWidth="3" />
          </>
        );
      case 3: // Angry eyes
        return (
          <>
            <line x1="28" y1="30" x2="42" y2="36" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="35" cy="40" r="4.5" fill="#1e293b" />
            <line x1="72" y1="30" x2="58" y2="36" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="65" cy="40" r="4.5" fill="#1e293b" />
          </>
        );
      case 4: // Wink eye
        return (
          <>
            <circle cx="34" cy="38" r="5" fill="#1e293b" />
            <circle cx="36" cy="36" r="1.5" fill="#ffffff" />
            <path d="M 58 38 Q 65 32 72 38" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 5: // Big cute anime eyes with white sparkle
        return (
          <>
            <circle cx="34" cy="37" r="7" fill="#1e293b" />
            <circle cx="36" cy="35" r="2.5" fill="#ffffff" />
            <circle cx="66" cy="37" r="7" fill="#1e293b" />
            <circle cx="68" cy="35" r="2.5" fill="#ffffff" />
          </>
        );
      case 0:
      default: // Normal friendly round eyes
        return (
          <>
            <circle cx="34" cy="37" r="5" fill="#1e293b" />
            <circle cx="36" cy="35" r="1.5" fill="#ffffff" />
            <circle cx="66" cy="37" r="5" fill="#1e293b" />
            <circle cx="68" cy="35" r="1.5" fill="#ffffff" />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (mouth % TOTAL_MOUTHS) {
      case 1: // Open happy mouth
        return (
          <path d="M 36 54 Q 50 72 64 54 Z" fill="#b91c1c" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
        );
      case 2: // Tongue sticking out
        return (
          <>
            <path d="M 36 55 Q 50 63 64 55" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 45 58 Q 50 70 55 58 Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
          </>
        );
      case 3: // Big toothy smile
        return (
          <>
            <path d="M 34 53 Q 50 70 66 53 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
            <line x1="50" y1="54" x2="50" y2="62" stroke="#1e293b" strokeWidth="2" />
          </>
        );
      case 4: // Neutral straight line
        return <line x1="38" y1="58" x2="62" y2="58" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />;
      case 5: // Laughing wide curve
        return (
          <path d="M 32 52 Q 50 74 68 52" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        );
      case 0:
      default: // Friendly warm smile
        return (
          <path d="M 35 55 Q 50 67 65 55" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        );
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="drop-shadow-sm select-none">
        {/* Blob body */}
        <circle cx="50" cy="50" r="45" fill={color} stroke="#1e293b" strokeWidth="4.5" />
        {/* Cheeks blush */}
        <ellipse cx="25" cy="48" rx="6" ry="4" fill="#f43f5e" opacity="0.4" />
        <ellipse cx="75" cy="48" rx="6" ry="4" fill="#f43f5e" opacity="0.4" />
        {/* Eyes & Mouth */}
        {renderEyes()}
        {renderMouth()}
      </svg>
    </div>
  );
}

export default Avatar;
