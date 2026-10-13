import React from "react";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";

const CREATURES = ["fish", "shark", "jellyfish", "whale", "seahorse"];
let FISH_ID = 1;

export function makeFish(i = 0, forcedType) {
  const type = forcedType || CREATURES[Math.floor(Math.random() * CREATURES.length)];
  return {
    id: FISH_ID++,
    type,
    top: type === "whale" ? 6 + Math.random() * 8 : 10 + Math.random() * 58,
    dir: Math.random() < 0.5 ? "right" : "left",
    dur: 11 + Math.random() * 9,
    delay: -Math.random() * 14,
  };
}

// Full-bleed underwater scene with varied, realistic sea creatures.
export default function FishScene({ fish, onTapFish, disabled, hint }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "linear-gradient(180deg,#6ad6e8 0%,#36b3cf 28%,#1592b6 58%,#0a4666 100%)" }}>
      {/* Sunlight caustics from surface */}
      <div className="absolute inset-0 pointer-events-none">
        {[6, 22, 40, 58, 76].map((x, i) => (
          <div key={i} className="absolute top-0" style={{
            left: `${x}%`, width: `${5 + (i % 2) * 5}%`, height: "82%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.22), transparent)",
            transform: `skewX(${i % 2 ? -12 : 12}deg)`,
          }} />
        ))}
      </div>

      {/* Surface shimmer */}
      <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)" }} />

      {/* Rich seabed */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{
        height: "20%",
        background: "linear-gradient(180deg,#d8bd7a,#9c7a38)",
        borderRadius: "46% 46% 0 0 / 34% 34% 0 0",
      }} />
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{
        height: "10%",
        background: "linear-gradient(180deg,#7a5a25,#5a4218)",
        borderRadius: "46% 46% 0 0 / 34% 34% 0 0",
      }} />

      {/* Treasure chest — detailed with gold coins spilling */}
      <div className="absolute pointer-events-none" style={{ left: "66%", bottom: "2.5%", width: "15%", maxWidth: 160 }}>
        <svg viewBox="0 0 120 92" className="w-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.4)]">
          <defs>
            <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a9763e" /><stop offset="1" stopColor="#6e4a20" />
            </linearGradient>
            <linearGradient id="chestLid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c08a4a" /><stop offset="1" stopColor="#8a5a28" />
            </linearGradient>
            <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe680" /><stop offset="1" stopColor="#e0a518" />
            </linearGradient>
          </defs>
          {/* spilled coins */}
          <ellipse cx="100" cy="82" rx="8" ry="3" fill="url(#gold)" />
          <ellipse cx="106" cy="78" rx="7" ry="3" fill="url(#gold)" />
          <ellipse cx="96" cy="86" rx="7" ry="2.5" fill="url(#gold)" />
          {/* body */}
          <rect x="14" y="44" width="92" height="42" rx="5" fill="url(#chestWood)" stroke="#3a2410" strokeWidth="2.5" />
          {/* iron bands */}
          <rect x="14" y="60" width="92" height="6" fill="#4a3a2a" stroke="#3a2410" strokeWidth="1" />
          <rect x="22" y="44" width="6" height="42" fill="#4a3a2a" />
          <rect x="92" y="44" width="6" height="42" fill="#4a3a2a" />
          {/* lid */}
          <path d="M14 48 Q60 14 106 48 L106 56 L14 56 Z" fill="url(#chestLid)" stroke="#3a2410" strokeWidth="2.5" />
          <rect x="14" y="50" width="92" height="4" fill="#4a3a2a" />
          {/* lock */}
          <rect x="54" y="52" width="12" height="16" rx="2" fill="url(#gold)" stroke="#3a2410" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="2" fill="#3a2410" />
          {/* coin pile inside */}
          <ellipse cx="52" cy="46" rx="4" ry="2" fill="url(#gold)" />
          <ellipse cx="64" cy="44" rx="4" ry="2" fill="url(#gold)" />
          <ellipse cx="58" cy="42" rx="4" ry="2" fill="url(#gold)" />
          {/* sparkles */}
          {[28, 78, 60].map((x, i) => (
            <motion.g key={i} animate={{ opacity: [0.1, 1, 0.1], scale: [0.6, 1.1, 0.6] }} transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <path d={`M${x} 30 L${x + 2} 34 L${x + 4} 30 L${x + 2} 26 Z`} fill="#fff7c0" />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Lush seaweed clusters across the width */}
      {[4, 12, 22, 34, 48, 62, 82, 92].map((x, i) => (
        <div key={i} className="absolute bottom-0 sway pointer-events-none" style={{ left: `${x}%`, height: `${18 + (i % 4) * 7}%`, width: `${3 + (i % 2)}%`, animationDuration: `${3 + (i % 3)}s` }}>
          <svg viewBox="0 0 30 120" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`w${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={i % 3 === 0 ? "#3cb371" : i % 3 === 1 ? "#2e8b57" : "#46c98a"} />
                <stop offset="1" stopColor="#1c5e3a" />
              </linearGradient>
            </defs>
            <path d="M15 120 Q6 90 16 64 Q5 40 15 0" stroke={`url(#w${i})`} strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M15 120 Q20 92 12 66 Q21 42 14 12" stroke={`url(#w${i})`} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
            <path d="M15 120 Q10 96 18 72 Q9 48 15 22" stroke={`url(#w${i})`} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>
      ))}

      {/* Bubbles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          left: `${(i * 5.5 + 3) % 100}%`, bottom: 0, width: `${5 + (i % 5) * 4}px`, height: `${5 + (i % 5) * 4}px`,
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.25))",
          border: "1px solid rgba(255,255,255,0.5)",
          animation: `riseBubble ${5 + (i % 6)}s linear ${i * 0.5}s infinite`,
        }} />
      ))}

      {/* Swimming creatures */}
      {fish.map((f) => (
        <button
          key={f.id}
          disabled={disabled}
          onClick={() => onTapFish(f.id)}
          className="absolute z-20 disabled:cursor-default"
          style={{
            top: `${f.top}%`,
            left: 0,
            animation: `${f.dir === "right" ? "swimRight" : "swimLeft"} ${f.dur}s linear ${f.delay}s infinite`,
          }}
        >
          <Creature type={f.type} dir={f.dir} />
        </button>
      ))}

      {/* Tap hint */}
      {hint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[14%] z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-[#002244] font-bold text-lg shadow-xl animate-pulse"
        >
          <Hand className="w-5 h-5 text-[#FF6600]" />
          לחצו על דג לשאלה!
        </motion.div>
      )}
    </div>
  );
}

function Creature({ type, dir }) {
  const flip = dir === "left" ? { transform: "scaleX(-1)" } : {};
  const wrap = (viewBox, w, el) => (
    <div style={{ width: w, ...flip }}>
      <svg viewBox={viewBox} className="w-full h-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.32)]">{el}</svg>
    </div>
  );
  if (type === "shark") return wrap("0 0 90 46", 110, <Shark />);
  if (type === "whale") return wrap("0 0 120 56", 150, <Whale />);
  if (type === "jellyfish") return wrap("0 0 60 90", 72, <Jellyfish />);
  if (type === "seahorse") return wrap("0 0 62 122", 82, <Seahorse />);
  return wrap("0 0 70 42", 86, <FishArt />);
}

function FishArt() {
  return (
    <g>
      <defs>
        <linearGradient id="fishBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcf3d" /><stop offset="0.55" stopColor="#ff9a1f" /><stop offset="1" stopColor="#fff4d0" />
        </linearGradient>
        <linearGradient id="fishFin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb84d" /><stop offset="1" stopColor="#ff7a1f" />
        </linearGradient>
      </defs>
      {/* tail */}
      <path d="M8 21 L0 6 L14 18 L0 36 Z" fill="url(#fishFin)" stroke="#7a3d00" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 21 L4 11 L14 18 Z" fill="#ffe9a8" opacity="0.6" />
      {/* body */}
      <ellipse cx="40" cy="21" rx="28" ry="15" fill="url(#fishBody)" stroke="#7a3d00" strokeWidth="1.4" />
      {/* belly highlight */}
      <ellipse cx="42" cy="27" rx="22" ry="7" fill="#fff8df" opacity="0.7" />
      {/* scales */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${30 + i * 6} 13 Q${33 + i * 6} 21 ${30 + i * 6} 29`} stroke="#d27a18" strokeWidth="0.8" fill="none" opacity="0.5" />
      ))}
      {/* dorsal fin */}
      <path d="M34 8 Q40 -1 52 8 L48 13 L36 13 Z" fill="url(#fishFin)" stroke="#7a3d00" strokeWidth="1.2" />
      {/* pectoral fin */}
      <path d="M40 24 Q48 30 42 34 L36 30 Z" fill="url(#fishFin)" stroke="#7a3d00" strokeWidth="1.2" />
      {/* gill */}
      <path d="M52 15 Q54 21 52 27" stroke="#7a3d00" strokeWidth="1.1" fill="none" />
      {/* eye */}
      <circle cx="58" cy="17" r="3.4" fill="#fff" stroke="#7a3d00" strokeWidth="1" />
      <circle cx="59" cy="17" r="2" fill="#1f1f1f" />
      <circle cx="59.7" cy="16.3" r="0.7" fill="#fff" />
      {/* lips */}
      <path d="M66 21 Q68 21 66 23" stroke="#7a3d00" strokeWidth="1" fill="none" />
    </g>
  );
}

function Shark() {
  return (
    <g>
      <defs>
        <linearGradient id="sharkBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b7785" /><stop offset="0.5" stopColor="#3a5563" /><stop offset="1" stopColor="#dfe6ea" />
        </linearGradient>
        <linearGradient id="sharkFin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a5563" /><stop offset="1" stopColor="#243843" />
        </linearGradient>
      </defs>
      {/* tail */}
      <path d="M8 23 L0 6 L12 18 L2 40 L12 23 Z" fill="url(#sharkFin)" stroke="#1a2a30" strokeWidth="1.2" strokeLinejoin="round" />
      {/* body */}
      <path d="M10 23 Q30 6 70 12 Q82 14 86 23 Q82 32 70 34 Q40 40 10 23 Z" fill="url(#sharkBody)" stroke="#1a2a30" strokeWidth="1.3" />
      <path d="M14 24 Q40 14 68 18 Q78 20 82 23 Q70 28 40 30 Q22 30 14 27 Z" fill="#eef3f5" opacity="0.6" />
      {/* dorsal fin */}
      <path d="M40 10 L48 0 L58 12 L52 14 Z" fill="url(#sharkFin)" stroke="#1a2a30" strokeWidth="1.2" />
      {/* pectoral fin */}
      <path d="M40 30 L34 40 L50 34 Z" fill="url(#sharkFin)" stroke="#1a2a30" strokeWidth="1.2" />
      {/* second dorsal */}
      <path d="M68 22 L74 16 L78 24 Z" fill="url(#sharkFin)" stroke="#1a2a30" strokeWidth="1" />
      {/* gills */}
      <path d="M58 14 L60 24 M62 15 L64 24 M66 16 L67 23" stroke="#1a2a30" strokeWidth="0.9" />
      {/* mouth + teeth */}
      <path d="M74 26 Q80 28 86 24" stroke="#1a2a30" strokeWidth="1.3" fill="none" />
      <path d="M77 27 L78 29 L79 27 L80 29 L81 27 L82 29 L83 27 L84 29" stroke="#fff" strokeWidth="1.2" fill="#fff" />
      {/* eye */}
      <circle cx="72" cy="18" r="2.6" fill="#1f1f1f" />
      <circle cx="72.6" cy="17.4" r="0.8" fill="#fff" />
    </g>
  );
}

function Whale() {
  return (
    <g>
      <defs>
        <linearGradient id="whaleBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a90b8" /><stop offset="0.55" stopColor="#2e6f93" /><stop offset="1" stopColor="#cfe6f2" />
        </linearGradient>
      </defs>
      {/* tail fluke */}
      <path d="M6 28 L0 8 L16 22 L0 48 Z" fill="url(#whaleBody)" stroke="#16384f" strokeWidth="1.3" strokeLinejoin="round" />
      {/* body */}
      <path d="M14 28 Q40 8 96 16 Q112 20 118 28 Q112 36 96 40 Q40 48 14 28 Z" fill="url(#whaleBody)" stroke="#16384f" strokeWidth="1.4" />
      {/* belly */}
      <path d="M22 30 Q50 22 92 28 Q104 30 112 33 Q90 40 50 42 Q30 40 22 36 Z" fill="#e6f3fa" opacity="0.8" />
      {/* belly grooves */}
      <path d="M28 34 L30 40 M36 35 L37 42 M44 36 L45 43 M52 36 L52 43 M60 36 L60 43 M68 36 L67 43" stroke="#9cc4d6" strokeWidth="1" opacity="0.7" />
      {/* pectoral flipper */}
      <path d="M58 32 Q66 44 56 48 L48 38 Z" fill="#3a7a9c" stroke="#16384f" strokeWidth="1.2" />
      {/* dorsal */}
      <path d="M82 16 L88 8 L94 20 Z" fill="url(#whaleBody)" stroke="#16384f" strokeWidth="1.1" />
      {/* eye */}
      <circle cx="100" cy="22" r="3" fill="#fff" stroke="#16384f" strokeWidth="1" />
      <circle cx="101" cy="22" r="1.8" fill="#1f1f1f" />
      {/* mouth */}
      <path d="M104 30 Q112 31 116 27" stroke="#16384f" strokeWidth="1.3" fill="none" />
      {/* spout */}
      <motion.g animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
        <path d="M96 8 Q94 2 98 -4 M100 8 Q100 1 102 -4 M92 8 Q88 2 90 -3" stroke="#cfeaf5" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
      </motion.g>
    </g>
  );
}

function Jellyfish() {
  return (
    <g>
      <defs>
        <radialGradient id="jellyDome" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffd6f5" /><stop offset="0.6" stopColor="#e08fd8" /><stop offset="1" stopColor="#a451b0" />
        </radialGradient>
      </defs>
      {/* dome */}
      <path d="M8 36 Q8 6 30 6 Q52 6 52 36 Z" fill="url(#jellyDome)" stroke="#7a3a8a" strokeWidth="1.4" opacity="0.92" />
      <ellipse cx="24" cy="20" rx="8" ry="5" fill="#fff" opacity="0.35" />
      <path d="M8 36 Q30 44 52 36" stroke="#7a3a8a" strokeWidth="1.2" fill="none" />
      {/* oral arms (frilly) */}
      <path d="M18 38 Q16 50 20 58 Q16 64 20 72" stroke="#c977cf" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M30 40 Q28 52 32 62 Q28 70 32 78" stroke="#d98fd6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />
      {/* tentacles (wavy) */}
      <motion.path d="M10 38 Q6 55 12 72 Q6 84 10 90"
        animate={{ d: ["M10 38 Q6 55 12 72 Q6 84 10 90", "M10 38 Q14 55 8 72 Q14 84 10 90", "M10 38 Q6 55 12 72 Q6 84 10 90"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        stroke="#e6a7ec" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
      <motion.path d="M42 38 Q46 55 40 72 Q46 84 42 90"
        animate={{ d: ["M42 38 Q46 55 40 72 Q46 84 42 90", "M42 38 Q38 55 44 72 Q38 84 42 90", "M42 38 Q46 55 40 72 Q46 84 42 90"] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        stroke="#e6a7ec" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function Seahorse() {
  return (
    <g>
      <defs>
        <linearGradient id="seahorseBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb24d" /><stop offset="0.5" stopColor="#ff7a1f" /><stop offset="1" stopColor="#e8450a" />
        </linearGradient>
      </defs>
      {/* dorsal fin (frilly back) */}
      <path d="M24 34 Q10 42 18 50 Q6 58 16 68 Q26 64 30 54 Q32 44 28 36 Z" fill="#ff9a3d" stroke="#a8350a" strokeWidth="1.2" opacity="0.92" />
      <path d="M22 38 L13 44 M20 48 L11 54 M20 58 L13 64" stroke="#a8350a" strokeWidth="0.7" opacity="0.5" />
      {/* body + head smooth S */}
      <path d="M40 20 C 50 18, 58 22, 58 28 C 58 32, 52 34, 46 32 C 44 38, 48 44, 44 50 C 40 58, 44 66, 38 74 C 34 80, 30 82, 28 84 C 24 90, 26 100, 32 100 C 36 100, 36 94, 32 94 C 30 94, 30 92, 32 90 C 36 84, 38 76, 36 68 C 34 58, 36 48, 40 40 C 42 32, 42 24, 40 20 Z" fill="url(#seahorseBody)" stroke="#a8350a" strokeWidth="1.5" strokeLinejoin="round" />
      {/* belly highlight */}
      <path d="M40 26 C 46 26, 50 28, 52 31 C 48 32, 44 31, 42 28 Z" fill="#ffe0b0" opacity="0.6" />
      {/* snout tip */}
      <path d="M56 26 Q63 27 61 31 Q57 32 54 30 Z" fill="url(#seahorseBody)" stroke="#a8350a" strokeWidth="1.2" />
      {/* coronet (crown spikes) */}
      <path d="M40 20 L36 12 L41 16 L39 8 L44 14 L46 6 L49 16 L44 20 Z" fill="url(#seahorseBody)" stroke="#a8350a" strokeWidth="1.2" strokeLinejoin="round" />
      {/* eye */}
      <circle cx="48" cy="26" r="2.7" fill="#fff" stroke="#a8350a" strokeWidth="0.8" />
      <circle cx="49" cy="26" r="1.7" fill="#1f1f1f" />
      <circle cx="49.6" cy="25.4" r="0.6" fill="#fff" />
      {/* pectoral fin */}
      <path d="M42 34 Q34 38 38 44 Q44 42 44 36 Z" fill="#ffb24d" stroke="#a8350a" strokeWidth="1" />
      {/* body plates (ridges) */}
      <path d="M44 38 L53 36 M42 46 L52 44 M40 54 L50 54 M38 62 L48 62 M34 70 L44 72 M30 78 L40 80" stroke="#a8350a" strokeWidth="0.8" opacity="0.5" fill="none" />
      {/* tail curl */}
      <path d="M30 84 C 22 90, 24 100, 32 100" fill="none" stroke="url(#seahorseBody)" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M30 84 C 22 90, 24 100, 32 100" fill="none" stroke="#a8350a" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M31 96 Q34 98 33 93" stroke="#a8350a" strokeWidth="1" fill="none" />
    </g>
  );
}