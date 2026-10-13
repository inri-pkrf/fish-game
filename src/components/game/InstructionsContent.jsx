import React from "react";
import { Fish, Timer, Heart, Hand, AlertTriangle } from "lucide-react";

// Instructions steps — reused inline on the landing screen and inside the (i) overlay.
export default function InstructionsContent({ compact = false }) {
  return (
    <div className={compact ? "space-y-2 text-slate-700 text-base leading-relaxed" : "space-y-3 text-slate-700 text-lg leading-relaxed"} dir="rtl">
      <p className={`font-bold text-[#002244] ${compact ? "text-lg" : "text-xl"}`}>איך משחקים? 🌊</p>
      <ul className="space-y-2">
        <li className="flex gap-2 items-start">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF6600] text-white font-bold flex items-center justify-center text-sm">1</span>
          <span>מזינים שם ובוחרים דמות.</span>
        </li>
        <li className="flex gap-2 items-start">
          <Hand className="flex-shrink-0 w-7 h-7 text-[#FF6600]" />
          <span>בים שוחים דגים — <b>לוחצים על דג</b> כדי לקבל שאלת פיקוד העורף.</span>
        </li>
        <li className="flex gap-2 items-start">
          <Timer className="flex-shrink-0 w-7 h-7 text-[#FF6600]" />
          <span>עונים תוך <b>10 שניות</b>.</span>
        </li>
        <li className="flex gap-2 items-start">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 text-white font-bold flex items-center justify-center text-sm">✓</span>
          <span>תשובה נכונה — הדג נתפס לסל! 🎣</span>
        </li>
        <li className="flex gap-2 items-start">
          <Heart className="flex-shrink-0 w-7 h-7 text-red-500 fill-red-500" />
          <span>טעות או סיום זמן — הדג בורח ומאבדים לב (יש <b>3 לבבות</b>).</span>
        </li>
        <li className="flex gap-2 items-start">
          <Fish className="flex-shrink-0 w-7 h-7 text-[#4FC3D9]" />
          <span>תפסו כמה שיותר דגים והפכו לאלופי פיקוד העורף!</span>
        </li>
      </ul>
      <div className="flex items-center gap-2 bg-[#FFD60A]/30 border-2 border-[#FFD60A] rounded-xl p-2.5">
        <AlertTriangle className="w-5 h-5 text-[#c49600] flex-shrink-0" />
        <span className="font-bold text-[#7a5c00] text-sm">בהצלחה! 🎖️</span>
      </div>
    </div>
  );
}