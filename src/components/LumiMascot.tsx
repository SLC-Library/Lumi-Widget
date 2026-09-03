import React from 'react';

interface LumiMascotProps {
  className?: string;
  size?: number;
  mood?: 'happy' | 'thinking' | 'waving' | 'smart';
  withBadge?: boolean;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({
  className = '',
  size = 48,
  mood = 'happy',
  withBadge = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
      >
        {/* Subtle glow / back rim */}
        <circle cx="50" cy="52" r="42" fill="#E2E8F0" opacity="0.15" />

        {/* Fluffy Sheep Wool / Body Puffs */}
        <g id="wool-body">
          {/* Outer wool bubbles */}
          <circle cx="30" cy="32" r="14" fill="#FFFFFF" />
          <circle cx="50" cy="24" r="15" fill="#FFFFFF" />
          <circle cx="70" cy="32" r="14" fill="#FFFFFF" />
          <circle cx="78" cy="50" r="13" fill="#FFFFFF" />
          <circle cx="72" cy="68" r="14" fill="#FFFFFF" />
          <circle cx="50" cy="76" r="15" fill="#FFFFFF" />
          <circle cx="28" cy="68" r="14" fill="#FFFFFF" />
          <circle cx="22" cy="50" r="13" fill="#FFFFFF" />
          
          {/* Main central head puff */}
          <circle cx="50" cy="50" r="32" fill="#F8FAFC" />
          {/* Soft shadow underside */}
          <ellipse cx="50" cy="74" rx="22" ry="7" fill="#CBD5E1" opacity="0.35" />
        </g>

        {/* Left Ear */}
        <g id="left-ear">
          <ellipse cx="18" cy="46" rx="10" ry="6" fill="#F1F5F9" transform="rotate(-25 18 46)" />
          <ellipse cx="18" cy="46" rx="6" ry="3.5" fill="#FBCFE8" transform="rotate(-25 18 46)" />
        </g>

        {/* Right Ear */}
        <g id="right-ear">
          <ellipse cx="82" cy="46" rx="10" ry="6" fill="#F1F5F9" transform="rotate(25 82 46)" />
          <ellipse cx="82" cy="46" rx="6" ry="3.5" fill="#FBCFE8" transform="rotate(25 82 46)" />
        </g>

        {/* Sheep Face (Warm cream / soft pinkish tone) */}
        <ellipse cx="50" cy="53" rx="23" ry="19" fill="#FFF1F2" />

        {/* Forehead Wool Curls (Top hair fluff) */}
        <circle cx="42" cy="34" r="7.5" fill="#FFFFFF" />
        <circle cx="58" cy="34" r="7.5" fill="#FFFFFF" />
        <circle cx="50" cy="30" r="7" fill="#FFFFFF" />
        <circle cx="50" cy="36" r="6" fill="#FFFFFF" />

        {/* Cute Sparkly Black Eyes */}
        <g id="eyes">
          {mood === 'thinking' ? (
            <>
              {/* Curious expression */}
              <ellipse cx="41" cy="50" rx="3.5" ry="4" fill="#0F172A" />
              <circle cx="39.5" cy="48.5" r="1.2" fill="#FFFFFF" />
              <path d="M57 49 Q61 46 65 49" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Happy big sparkly eyes */}
              <ellipse cx="40" cy="51" rx="3.5" ry="4.5" fill="#0B192C" />
              <circle cx="38.5" cy="49" r="1.5" fill="#FFFFFF" />
              <circle cx="42" cy="53" r="0.8" fill="#FFFFFF" />

              <ellipse cx="60" cy="51" rx="3.5" ry="4.5" fill="#0B192C" />
              <circle cx="58.5" cy="49" r="1.5" fill="#FFFFFF" />
              <circle cx="62" cy="53" r="0.8" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Rosy Cheeks */}
        <circle cx="33" cy="57" r="4.5" fill="#FDA4AF" opacity="0.65" />
        <circle cx="67" cy="57" r="4.5" fill="#FDA4AF" opacity="0.65" />

        {/* Tiny cute nose and smile */}
        <g id="mouth">
          {/* Sheep nose - tiny rounded Y/triangle */}
          <ellipse cx="50" cy="57" rx="2" ry="1.4" fill="#FB7185" />
          {/* Happy w-shaped or gentle curve mouth */}
          <path
            d="M46 59 Q48 62 50 60 Q52 62 54 59"
            stroke="#0F172A"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Cute Academic / Library Element: Round Reading Glasses or Academic Cap */}
        {mood === 'smart' && (
          <g id="glasses" stroke="#D97706" strokeWidth="1.6" fill="none">
            <circle cx="40" cy="51" r="6" />
            <circle cx="60" cy="51" r="6" />
            <path d="M46 51 L54 51" />
          </g>
        )}

        {/* Little Library Grad Cap / Book Accessory */}
        <g id="mini-cap">
          <path
            d="M40 22 L50 17 L60 22 L50 26 Z"
            fill="#1E3A8A"
            stroke="#38BDF8"
            strokeWidth="1"
          />
          <path d="M44 24 L44 28 C44 30 56 30 56 28 L56 24" fill="#1E3A8A" />
          {/* Yellow Tassel */}
          <circle cx="50" cy="17" r="1.2" fill="#F59E0B" />
          <path d="M50 17 Q58 20 59 25" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
          <circle cx="59" cy="25" r="1" fill="#F59E0B" />
        </g>

        {/* Tiny Star sparkles */}
        <path d="M78 24 L79.5 28 L83.5 29.5 L79.5 31 L78 35 L76.5 31 L72.5 29.5 L76.5 28 Z" fill="#FBBF24" opacity="0.9" />
      </svg>

      {/* Online indicator badge if requested */}
      {withBadge && (
        <span className="absolute bottom-0 right-0 block w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-sm" />
      )}
    </div>
  );
};
