import React from "react";
import { Maximize, Minimize, Info } from "lucide-react";
import HomeButton from "./HomeButton";

// Fixed top bar present on every screen: Home (branded), Fullscreen, and optional Info (i).
export default function TopControls({ fullscreen, onToggleFullscreen, onInfo }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-3 pointer-events-none">
      <div className="pointer-events-auto">
        <HomeButton />
      </div>
      <div className="flex items-center gap-2 pointer-events-auto">
        {onInfo && (
          <button
            onClick={onInfo}
            className="w-12 h-12 rounded-full bg-[#002244]/85 text-white shadow-lg
            hover:scale-110 transition-transform flex items-center justify-center border-2 border-white/30"
            aria-label="הוראות"
          >
            <Info className="w-6 h-6" strokeWidth={2.5} />
          </button>
        )}
        <button
          onClick={onToggleFullscreen}
          className="w-12 h-12 rounded-full bg-[#002244]/85 text-white shadow-lg
          hover:scale-110 transition-transform flex items-center justify-center border-2 border-white/30"
          aria-label="מסך מלא"
        >
          {fullscreen ? <Minimize className="w-6 h-6" strokeWidth={2.5} /> : <Maximize className="w-6 h-6" strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}