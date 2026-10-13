import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/game/LandingScreen";
import CharacterSelect from "@/components/game/CharacterSelect";
import GameplayScreen from "@/components/game/GameplayScreen";
import GameOverScreen from "@/components/game/GameOverScreen";

export default function Game() {
  const [screen, setScreen] = useState("landing"); // landing | character | play | over
  const [playerName, setPlayerName] = useState("");
  const [character, setCharacter] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [victory, setVictory] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0E5A78] overflow-hidden select-none font-body" dir="rtl">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {screen === "landing" && (
            <div key="landing" className="absolute inset-0">
              <LandingScreen
                onStart={() => setScreen("character")}
                fullscreen={fullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </div>
          )}
          {screen === "character" && (
            <div key="character" className="absolute inset-0">
              <CharacterSelect
                onSelect={(c, name) => { setCharacter(c); setPlayerName(name); setScreen("play"); }}
                onBack={() => setScreen("landing")}
                fullscreen={fullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </div>
          )}
          {screen === "play" && (
            <div key="play" className="absolute inset-0">
              <GameplayScreen
                playerName={playerName}
                character={character}
                onFinish={(score, lives, isVictory) => { setFinalScore(score); setVictory(isVictory); setScreen("over"); }}
                fullscreen={fullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </div>
          )}
          {screen === "over" && (
            <div key="over" className="absolute inset-0">
              <GameOverScreen
                playerName={playerName}
                score={finalScore}
                victory={victory}
                onNewGame={() => setScreen("character")}
                fullscreen={fullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}