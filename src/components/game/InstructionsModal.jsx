import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import InstructionsContent from "./InstructionsContent";

// Floating overlay showing the instructions (used by the (i) button during gameplay — does not reset state).
export default function InstructionsModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[60] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-[#EAFBFB] to-white rounded-3xl shadow-2xl max-w-md w-full max-h-[92vh] overflow-y-auto border-4 border-[#FF6600]"
      >
        <div className="sticky top-0 bg-[#002244] text-white px-5 py-3 flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl">הוראות המשחק</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-5">
          <InstructionsContent />
          <button
            onClick={onClose}
            className="w-full mt-4 py-3.5 rounded-2xl bg-[#FF6600] text-white font-black text-xl
            shadow-[0_5px_0_#c44a00] active:translate-y-1 active:shadow-[0_1px_0_#c44a00] hover:bg-[#ff7d3a] transition-all"
          >
            סגירה והמשך משחק
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}