import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import BeachBackground from "./BeachBackground";
import InstructionsContent from "./InstructionsContent";
import TopControls from "./TopControls";
import { sounds } from "@/lib/sounds";

// Screen 1: title + inline instructions + a single "Start game" button. No scrolling.
export default function LandingScreen({ onStart, fullscreen, onToggleFullscreen }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <BeachBackground />
      <TopControls fullscreen={fullscreen} onToggleFullscreen={onToggleFullscreen} />

      <div className="absolute inset-0 pt-20 pb-6 px-4 flex flex-col items-center justify-center" dir="rtl">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6">
          <h1
            className="font-display font-bold text-7xl text-white leading-none"
            style={{ textShadow: "0 0 30px rgba(255,102,0,0.6), 4px 4px 0 #002244" }}
          >
            דגים הנחיות!
          </h1>
          <p className="text-cyan-50 font-bold text-2xl mt-1 drop-shadow">פיקוד העורף 🎣</p>
        </motion.div>

        {/* Inline instructions box */}
        <div className="w-full max-w-md mb-6 bg-white/95 rounded-3xl shadow-2xl border-4 border-[#FF6600] p-5">
          <InstructionsContent compact />
        </div>

        {/* Start game */}
        <button
          onClick={() => { sounds.cast(); onStart(); }}
          className="flex items-center gap-3 px-12 py-5 rounded-2xl bg-[#FF6600] text-white font-black text-3xl
          shadow-[0_7px_0_#c44a00] active:translate-y-1 active:shadow-[0_1px_0_#c44a00]
          hover:bg-[#ff7d3a] transition-all animate-pulse"
        >
          <Play className="w-8 h-8 fill-white" />
          התחל משחק
        </button>
      </div>
    </div>
  );
}