import React, { useMemo } from "react";

// Beach background for landing / character select / game over: sky, sun, sea horizon, sand.
export default function BeachBackground() {
  const birds = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({ top: 8 + i * 6, left: 10 + i * 22, size: 16 + (i % 2) * 6, delay: i * 1.5 })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" dir="ltr">
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #7ec8f5 0%, #aee3f5 35%, #d6f3f7 52%, #bfe9e4 58%, #2ba7c4 62%, #0e5a78 100%)"
        }}
      />
      {/* Sun glow */}
      <div
        className="absolute"
        style={{ top: "8%", right: "12%", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,236,170,0.95), rgba(255,200,120,0.25) 60%, transparent 70%)" }}
      />
      <div className="absolute" style={{ top: "12%", right: "16%", width: 64, height: 64, borderRadius: "50%", background: "#FFE9A8", boxShadow: "0 0 40px rgba(255,220,140,0.8)" }} />

      {/* Sea horizon shimmer */}
      <div className="absolute left-0 right-0" style={{ top: "56%", height: 4, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)" }} />
      <div className="absolute left-0 right-0" style={{ top: "58%", height: 2, background: "rgba(255,255,255,0.3)" }} />

      {/* Distant waves */}
      {[60, 62, 64].map((t, i) => (
        <div key={i} className="absolute left-0 right-0" style={{ top: `${t}%`, height: 6, background: "rgba(255,255,255,0.18)", borderRadius: "50%", filter: "blur(2px)" }} />
      ))}

      {/* Sand beach */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "30%", background: "linear-gradient(180deg, #f3e2b3, #e6cf8e 40%, #d9bd72 100%)", borderRadius: "50% 50% 0 0 / 16% 16% 0 0" }}
      />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "12%", background: "rgba(255,255,255,0.15)" }} />

      {/* Birds */}
      {birds.map((b, i) => (
        <div key={i} className="absolute" style={{ top: `${b.top}%`, left: `${b.left}%` }}>
          <svg width={b.size} height={b.size * 0.5} viewBox="0 0 30 15">
            <path d="M2 10 Q8 2 14 8 Q20 2 28 10" stroke="#002244" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
      ))}

      {/* Palm tree rooted on the sand (bottom-left), tall and detailed */}
      <div className="absolute sway" style={{ bottom: 0, left: "-3%", width: "34%", maxWidth: 380, minWidth: 240, height: "100%", transformOrigin: "bottom center" }}>
        <svg viewBox="0 0 200 600" className="w-full h-full" preserveAspectRatio="xMidYMax meet" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="palmTrunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#8a5a2e" /><stop offset="0.5" stopColor="#b07d44" /><stop offset="1" stopColor="#6e431d" />
            </linearGradient>
            <linearGradient id="palmFrond" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2e8b57" /><stop offset="1" stopColor="#56cf91" />
            </linearGradient>
          </defs>
          {/* trunk curving from sand up to crown at y=184 */}
          <path d="M72 600 Q60 470 78 320 Q84 230 98 188 L114 192 Q102 232 94 326 Q88 480 100 600 Z" fill="url(#palmTrunk)" stroke="#4a2a10" strokeWidth="3" strokeLinejoin="round" />
          {/* trunk rings */}
          {[240, 310, 380, 450, 520, 570].map((y) => (
            <ellipse key={y} cx={90 - (y - 240) * 0.04} cy={y} rx="17" ry="3.5" fill="#5a3a1a" opacity="0.45" />
          ))}
          {/* coconuts */}
          <circle cx="96" cy="188" r="11" fill="#6e431d" stroke="#3a2410" strokeWidth="2" />
          <circle cx="112" cy="196" r="11" fill="#7a4a22" stroke="#3a2410" strokeWidth="2" />
          <circle cx="88" cy="202" r="10" fill="#5a3417" stroke="#3a2410" strokeWidth="2" />
          {/* fronds radiating + drooping from crown (100,184) */}
          {[-110, -86, -62, -36, -10, 16, 42, 68, 94].map((a, i) => (
            <g key={i} transform={`rotate(${a} 100 184)`}>
              <path d="M100 184 C 132 176, 196 180, 244 198 C 198 208, 142 200, 100 192 Z" fill="url(#palmFrond)" stroke="#1c5e3a" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M100 184 Q 176 182 240 196" stroke="#1c5e3a" strokeWidth="1.1" fill="none" opacity="0.6" />
              {[44, 94, 144, 194, 238].map((x) => (
                <line key={x} x1={100 + x} y1={184 - (x / 244) * 8} x2={100 + x} y2={184 + (x / 244) * 8} stroke="#1c5e3a" strokeWidth="0.6" opacity="0.4" />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}