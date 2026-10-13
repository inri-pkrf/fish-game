import React from "react";

// Flat, hand-drawn style characters (per the user's reference):
// thick dark-reddish-brown outlines (#3D2B26), rounded shapes, minimalist closed-eye
// faces, oversized grid-pattern coat, red boots, mitten hands, a shoulder tote.
// viewBox 0 0 140 200.

export function figureShapes(type) {
  return type === "soldierette" ? <Soldierette /> : <Soldier />;
}

export function CharacterFigure({ type, size = 150 }) {
  return (
    <svg viewBox="0 0 140 200" width={size} height={(size * 200) / 140}>
      {figureShapes(type)}
    </svg>
  );
}

const INK = "#3D2B26";
const SKIN = "#FAD9E6";
const HAIR = "#59443E";
const RED = "#FF4D4D";
const BOOT_DK = "#C23B3B";

function Legs() {
  return (
    <g>
      <rect x="56" y="150" width="12" height="34" rx="4" fill={HAIR} stroke={INK} strokeWidth="3" />
      <rect x="72" y="150" width="12" height="34" rx="4" fill={HAIR} stroke={INK} strokeWidth="3" />
      <path d="M50 182 L50 192 Q50 196 56 196 L66 196 L66 182 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M74 182 L74 192 Q74 196 80 196 L90 196 L90 182 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="48" y="190" width="20" height="5" rx="2" fill={BOOT_DK} />
      <rect x="72" y="190" width="20" height="5" rx="2" fill={BOOT_DK} />
    </g>
  );
}

function Sleeves({ coat }) {
  return (
    <g>
      <path d="M44 90 Q32 94 30 116 L28 132 Q27 140 35 140 L44 134 L48 100 Z" fill={coat} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M96 90 Q108 94 110 116 L112 132 Q113 140 105 140 L96 134 L92 100 Z" fill={coat} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* mitten left */}
      <path d="M30 134 q-6 4 -4 12 q6 4 10 -2 l4 -8 q2 -6 -4 -8 q-4 -2 -6 2 Z" fill={SKIN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M27 145 q2 3 5 2 M31 147 q2 3 5 2" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* mitten right */}
      <path d="M110 134 q6 4 4 12 q-6 4 -10 -2 l-4 -8 q-2 -6 4 -8 q4 -2 6 2 Z" fill={SKIN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M113 145 q-2 3 -5 2 M109 147 q-2 3 -5 2" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Face() {
  return (
    <g>
      <circle cx="58" cy="60" r="3" fill="#F4A6B6" opacity="0.65" />
      <circle cx="82" cy="60" r="3" fill="#F4A6B6" opacity="0.65" />
      <path d="M58 54 q4 4 8 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M74 54 q4 4 8 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M64 62 q6 5 12 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Soldierette() {
  return (
    <g>
      <defs>
        <pattern id="coatF" width="13" height="13" patternUnits="userSpaceOnUse">
          <rect width="13" height="13" fill="#A2C8F3" />
          <line x1="0" y1="0" x2="13" y2="0" stroke="#5b8fd6" strokeWidth="1.3" />
          <line x1="0" y1="0" x2="0" y2="13" stroke="#5b8fd6" strokeWidth="1.3" />
        </pattern>
      </defs>
      {/* hair back */}
      <path d="M44 54 Q38 86 52 100 L64 94 L64 60 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M96 54 Q102 86 88 100 L76 94 L76 60 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <Legs />
      {/* coat */}
      <path d="M42 88 Q36 86 34 96 L28 152 Q28 158 34 158 L106 158 Q112 158 112 152 L106 96 Q104 86 98 88 Q86 80 70 80 Q54 80 42 88 Z" fill="url(#coatF)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1="70" y1="82" x2="70" y2="156" stroke="#5b8fd6" strokeWidth="1.6" opacity="0.6" />
      <Sleeves coat="url(#coatF)" />
      {/* neck */}
      <rect x="62" y="74" width="16" height="12" fill={SKIN} stroke={INK} strokeWidth="3" />
      {/* head */}
      <circle cx="70" cy="54" r="24" fill={SKIN} stroke={INK} strokeWidth="3" />
      {/* wavy fringe */}
      <path d="M46 46 Q52 38 60 42 Q66 35 72 41 Q78 35 84 42 Q90 38 94 48 Q88 52 82 49 Q76 54 70 50 Q64 54 58 49 Q52 52 46 46 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* strawberry beret */}
      <path d="M44 40 Q70 16 96 40 Q94 50 70 50 Q46 50 44 40 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <g stroke={BOOT_DK} strokeWidth="1.8" strokeLinecap="round">
        <line x1="56" y1="34" x2="60" y2="38" />
        <line x1="64" y1="30" x2="68" y2="34" />
        <line x1="74" y1="30" x2="78" y2="34" />
        <line x1="82" y1="34" x2="86" y2="38" />
        <line x1="62" y1="42" x2="66" y2="46" />
        <line x1="74" y1="42" x2="78" y2="46" />
      </g>
      <path d="M64 28 Q60 20 66 18 Q70 24 68 28 Z" fill="#4CAF50" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M76 28 Q80 20 74 18 Q70 24 72 28 Z" fill="#4CAF50" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <Face />
      {/* tote bag with strawberry */}
      <path d="M84 100 L97 100 L99 134 Q99 140 93 140 L90 140 Q84 140 84 134 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M86 100 Q88 90 94 90 Q100 90 99 100" stroke={INK} strokeWidth="2.6" fill="none" />
      <path d="M91 128 Q87 122 93 120 Q99 122 95 128 Z" fill={RED} stroke={INK} strokeWidth="1.4" />
      <path d="M91 122 q1 1 2 0 M94 122 q1 1 2 0" stroke={BOOT_DK} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M92 120 q2 -3 4 0 Z" fill="#4CAF50" stroke={INK} strokeWidth="1" />
      <path d="M92 125 q2 1.5 4 0" stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Soldier() {
  return (
    <g>
      <defs>
        <pattern id="coatM" width="13" height="13" patternUnits="userSpaceOnUse">
          <rect width="13" height="13" fill="#8FD4C9" />
          <line x1="0" y1="0" x2="13" y2="0" stroke="#3FAE9E" strokeWidth="1.3" />
          <line x1="0" y1="0" x2="0" y2="13" stroke="#3FAE9E" strokeWidth="1.3" />
        </pattern>
      </defs>
      {/* short hair back */}
      <path d="M48 50 Q44 72 54 80 L62 78 L62 56 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M92 50 Q96 72 86 80 L78 78 L78 56 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <Legs />
      {/* coat */}
      <path d="M42 88 Q36 86 34 96 L28 152 Q28 158 34 158 L106 158 Q112 158 112 152 L106 96 Q104 86 98 88 Q86 80 70 80 Q54 80 42 88 Z" fill="url(#coatM)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1="70" y1="82" x2="70" y2="156" stroke="#3FAE9E" strokeWidth="1.6" opacity="0.6" />
      <Sleeves coat="url(#coatM)" />
      {/* neck */}
      <rect x="62" y="74" width="16" height="12" fill={SKIN} stroke={INK} strokeWidth="3" />
      {/* head */}
      <circle cx="70" cy="54" r="24" fill={SKIN} stroke={INK} strokeWidth="3" />
      {/* short hair top */}
      <path d="M47 48 Q54 34 70 34 Q86 34 93 48 Q88 44 82 44 Q76 38 70 42 Q64 38 58 44 Q52 44 47 48 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* blue beret */}
      <path d="M46 40 Q70 20 94 40 Q92 48 70 48 Q48 48 46 40 Z" fill="#5aa6e6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M94 42 Q104 46 100 54 L92 50 Z" fill="#5aa6e6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* emblem star */}
      <path d="M70 37 L71.4 40.6 L75.2 40.8 L72.3 43 L73.4 46.6 L70 44.6 L66.6 46.6 L67.7 43 L64.8 40.8 L68.6 40.6 Z" fill="#FFD60A" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <Face />
      {/* tote bag with star */}
      <path d="M84 100 L97 100 L99 134 Q99 140 93 140 L90 140 Q84 140 84 134 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M86 100 Q88 90 94 90 Q100 90 99 100" stroke={INK} strokeWidth="2.6" fill="none" />
      <path d="M91 126 L91.8 128.2 L94 128.4 L92.3 129.8 L92.9 132 L91 130.8 L89.1 132 L89.7 129.8 L88 128.4 L90.2 128.2 Z" fill="#FFD60A" stroke={INK} strokeWidth="0.8" strokeLinejoin="round" />
    </g>
  );
}