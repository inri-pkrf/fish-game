import React from "react";
import { Delete, Space } from "lucide-react";

// Standard mobile Hebrew keyboard layout, read left-to-right starting with ק.
const ROWS = [
  ["ק", "ר", "א", "ט", "ו", "ן", "מ", "פ"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
  ["ז", "ס", "ב", "נ", "מ", "צ", "ץ"]
];

export default function VirtualKeyboard({ onKey, onBackspace, onSpace, disabled, compact }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-full" dir="ltr">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 justify-center flex-wrap">
          {row.map((ch) => (
            <KeyButton key={ch} onClick={() => onKey(ch)} disabled={disabled} compact={compact}>
              {ch}
            </KeyButton>
          ))}
          {ri === 2 && (
            <>
              <KeyButton onClick={onBackspace} disabled={disabled} wide compact={compact}>
                <Delete className={compact ? "w-4 h-4" : "w-6 h-6"} />
              </KeyButton>
              <KeyButton onClick={onSpace} disabled={disabled} wide compact={compact}>
                <Space className={compact ? "w-4 h-4" : "w-6 h-6"} />
              </KeyButton>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function KeyButton({ children, onClick, disabled, wide, compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${wide ? (compact ? "px-3" : "px-5") : (compact ? "px-2" : "px-3")}
      ${compact ? "h-9 min-w-[2.1rem] text-base" : "h-12 min-w-[2.9rem] text-xl"}
      rounded-lg bg-white/95 text-slate-800 font-bold
      shadow-[0_3px_0_rgba(10,38,71,0.35)] active:translate-y-0.5 active:shadow-[0_1px_0_rgba(10,38,71,0.35)]
      border-2 border-white/60 transition-all hover:bg-white
      disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
    >
      {children}
    </button>
  );
}