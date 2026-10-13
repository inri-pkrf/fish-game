import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";
import BeachBackground from "./BeachBackground";
import TopControls from "./TopControls";
import { sounds } from "@/lib/sounds";

const TOTAL = 20;

function getRank(score) {
  if (score >= 18) return { title: "אלופי פיקוד העורף!", emoji: "🏆" };
  if (score >= 14) return { title: "מומחה חירום ימי!", emoji: "🎖️" };
  if (score >= 10) return { title: "מפקד חוף מצטיין", emoji: "🥇" };
  if (score >= 6) return { title: "דייג מתחיל", emoji: "🎣" };
  return { title: "טירון זהיר", emoji: "🐟" };
}

export default function GameOverScreen({ playerName, score, victory, onNewGame, fullscreen, onToggleFullscreen }) {
  const rank = getRank(score);
  useEffect(() => { if (victory) sounds.victory(); }, [victory]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BeachBackground />
      <TopControls fullscreen={fullscreen} onToggleFullscreen={onToggleFullscreen} />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 text-center border-4 border-[#FF6600]"
          dir="rtl"
        >
          <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.6, delay: 0.3 }} className="text-7xl mb-2">
            {victory ? "🏆" : rank.emoji}
          </motion.div>
          <h2 className="font-display font-bold text-4xl text-[#002244] mb-1">
            {victory ? "ניצחת את כל השאלות!" : "סוף המשחק!"}
          </h2>
          <p className="text-xl text-slate-600 mb-4">
            כל הכבוד <span className="font-black text-[#FF6600]">{playerName}</span>! תפסת {score} דגים!
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-[#FFD60A]" />
            <span className="text-5xl font-black text-[#002244]">{score}</span>
            <span className="text-2xl font-bold text-slate-500">/ {TOTAL}</span>
          </div>
          <div className="rounded-2xl py-3 px-4 mb-5 bg-[#FF6600]/15 border-2 border-[#FF6600]">
            <p className="font-display font-bold text-2xl text-[#FF6600]">{rank.emoji} {rank.title}</p>
          </div>
          <button
            onClick={() => { sounds.click(); onNewGame(); }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#FF6600] text-white font-black text-xl
            shadow-[0_5px_0_#c44a00] active:translate-y-1 active:shadow-[0_1px_0_#c44a00] hover:bg-[#ff7d3a] transition-all"
          >
            <RotateCcw className="w-6 h-6" /> משחק חדש
          </button>
        </motion.div>
      </div>
    </div>
  );
}