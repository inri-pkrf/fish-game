import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import BeachBackground from "./BeachBackground";
import { CharacterFigure } from "./Characters";
import TopControls from "./TopControls";
import VirtualKeyboard from "./VirtualKeyboard";
import InstructionsModal from "./InstructionsModal";
import { sounds } from "@/lib/sounds";

// Screen 2: character selection + name input. The keyboard opens inline just under the
// text box (compact, elegant), only when the box is tapped.
export default function CharacterSelect({ onSelect, onBack, fullscreen, onToggleFullscreen }) {
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleKey = (ch) => setName((n) => (n.length < 14 ? n + ch : n));
  const handleBackspace = () => setName((n) => n.slice(0, -1));
  const handleSpace = () => setName((n) => (n.length < 14 ? n + " " : n));

  const ready = selected && name.trim();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BeachBackground />
      <TopControls fullscreen={fullscreen} onToggleFullscreen={onToggleFullscreen} onInfo={() => { sounds.click(); setShowInfo(true); }} />

      <button
        onClick={() => { sounds.click(); onBack(); }}
        className="absolute top-20 right-4 z-30 flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 text-slate-800 font-bold shadow-lg hover:scale-105 transition"
      >
        <ArrowRight className="w-5 h-5" /> חזרה
      </button>

      <div className="absolute inset-0 pt-20 pb-6 px-4 flex flex-col items-center justify-center" dir="rtl">
        <motion.h2
          initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="font-display font-bold text-5xl text-white text-center mb-5"
          style={{ textShadow: "0 0 20px rgba(255,102,0,0.5), 3px 3px 0 #002244" }}
        >
          בחר דמות ושם
        </motion.h2>

        <div className="flex gap-6 items-center justify-center w-full max-w-md mb-5">
          <CharacterCard selected={selected === "soldier"} onClick={() => { sounds.click(); setSelected("soldier"); }}>
            <CharacterFigure type="soldier" size={140} />
            <span className="font-display font-bold text-2xl text-[#3D2B26] mt-1">חייל</span>
          </CharacterCard>
          <CharacterCard selected={selected === "soldierette"} onClick={() => { sounds.click(); setSelected("soldierette"); }}>
            <CharacterFigure type="soldierette" size={140} />
            <span className="font-display font-bold text-2xl text-[#3D2B26] mt-1">חיילת</span>
          </CharacterCard>
        </div>

        {/* Name input — tap to open inline keyboard */}
        <div className="w-full max-w-md">
          <button
            onClick={() => { sounds.click(); setKeyboardOpen((v) => !v); }}
            className="w-full h-14 rounded-2xl bg-white/95 shadow-xl border-4 border-[#FF6600] flex items-center justify-center px-4"
          >
            <span className={`text-xl font-bold ${name.trim() ? "text-slate-800" : "text-slate-400"}`}>
              {name.trim() || "הקלד את שמך (לחץ לפתיחת מקלדת)"}
            </span>
          </button>

          {/* Inline compact keyboard below the input */}
          <AnimatePresence>
            {keyboardOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-2xl bg-white/85 backdrop-blur-sm border-2 border-[#FF6600]/40 p-2.5 flex flex-col items-center">
                  <button
                    onClick={() => { sounds.click(); setKeyboardOpen(false); }}
                    className="self-end mb-1 flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF6600] text-white font-bold text-sm shadow hover:scale-105 transition"
                  >
                    <Check className="w-4 h-4" /> סיום
                  </button>
                  <VirtualKeyboard onKey={handleKey} onBackspace={handleBackspace} onSpace={handleSpace} compact />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue */}
        <button
          disabled={!ready}
          onClick={() => { sounds.cast(); onSelect(selected, name.trim()); }}
          className="mt-5 flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#FF6600] text-white font-black text-2xl
          shadow-[0_6px_0_#c44a00] active:translate-y-1 active:shadow-[0_1px_0_#c44a00]
          hover:bg-[#ff7d3a] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none animate-pulse"
        >
          🎣 התחל לדוג!
        </button>
      </div>

      <AnimatePresence>
        {showInfo && <InstructionsModal onClose={() => setShowInfo(false)} />}
      </AnimatePresence>
    </div>
  );
}

function CharacterCard({ selected, onClick, children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      className={`relative flex flex-col items-center rounded-3xl p-4 w-44 transition-all
      ${selected ? "ring-4 ring-[#FF6600] shadow-[0_0_35px_rgba(255,102,0,0.65)] scale-105 bg-[#F5C453]" : "shadow-xl bg-[#F5C453]"}`}
    >
      {selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -inset-1.5 rounded-3xl bg-[#FF6600]/30 blur-md -z-10" />}
      {children}
    </motion.button>
  );
}