import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Fish, X } from "lucide-react";
import FishScene, { makeFish } from "./FishScene";
import TopControls from "./TopControls";
import InstructionsModal from "./InstructionsModal";
import { sounds } from "@/lib/sounds";
import { QUESTIONS } from "@/data/questions";

const QUESTION_TIME = 10;
const WARNING_AT = 5;

export default function GameplayScreen({ playerName, character, onFinish, fullscreen, onToggleFullscreen }) {
  const [questions] = useState(() => shuffle(QUESTIONS));
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [phase, setPhase] = useState("ready"); // ready | question | feedback
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [fish, setFish] = useState(() => ["fish", "shark", "jellyfish", "whale", "seahorse"].map((t, i) => makeFish(i, t)));
  const [selectedFish, setSelectedFish] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [shake, setShake] = useState(false);

  const timerRef = useRef(null);
  const advanceRef = useRef(null);
  const handleAnswerRef = useRef(null);
  const showInfoRef = useRef(false);
  showInfoRef.current = showInfo;
  const currentQ = questions[qIndex];

  const tapFish = useCallback((id) => {
    if (phase !== "ready") return;
    sounds.click();
    setSelectedFish(id);
    setPhase("question");
  }, [phase]);

  const handleAnswer = useCallback((idx) => {
    if (phase !== "question") return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(idx);
    const correct = idx === currentQ.correctIndex;
    setFeedback({ correct, correctIndex: currentQ.correctIndex });
    setPhase("feedback");

    const newLives = correct ? lives : lives - 1;
    const newScore = score + (correct ? 1 : 0);

    if (correct) {
      sounds.correct();
      setScore(newScore);
      confetti({ particleCount: 90, spread: 80, startVelocity: 38, origin: { y: 0.55 }, colors: ["#FF6600", "#FFD60A", "#4FC3D9", "#ffffff"], disableCache: true });
      setFish((prev) => {
        const next = prev.filter((f) => f.id !== selectedFish);
        next.push(makeFish(next.length));
        return next;
      });
    } else {
      sounds.wrong();
      setLives(newLives);
      setShake(true);
    }

    advanceRef.current = setTimeout(() => {
      setShake(false);
      if (qIndex + 1 >= questions.length) {
        onFinish(newScore, newLives, true);
        return;
      }
      if (newLives <= 0) {
        onFinish(newScore, 0, false);
        return;
      }
      setQIndex((i) => i + 1);
      setSelected(null);
      setFeedback(null);
      setSelectedFish(null);
      setPhase("ready");
    }, 2600);
  }, [phase, currentQ, lives, score, selectedFish, onFinish, qIndex, questions.length]);
  handleAnswerRef.current = handleAnswer;

  // Timer (pauses while info overlay is open)
  useEffect(() => {
    if (phase !== "question") return;
    setTimeLeft(QUESTION_TIME);
    const start = Date.now();
    let offset = 0;
    let pauseStart = null;
    timerRef.current = setInterval(() => {
      if (showInfoRef.current) {
        if (pauseStart === null) pauseStart = Date.now();
        return;
      }
      if (pauseStart !== null) { offset += Date.now() - pauseStart; pauseStart = null; }
      const elapsed = (Date.now() - start - offset) / 1000;
      const left = Math.max(0, QUESTION_TIME - elapsed);
      setTimeLeft(left);
      if (left <= WARNING_AT && left > 0 && Math.floor(left) !== Math.floor(left + 0.1)) sounds.tick();
      if (left <= 0) { clearInterval(timerRef.current); handleAnswerRef.current(null); }
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [phase, qIndex]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
  }, []);

  const warning = timeLeft <= WARNING_AT;
  const livesArr = [0, 1, 2];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <TopControls fullscreen={fullscreen} onToggleFullscreen={onToggleFullscreen} onInfo={() => setShowInfo(true)} />

      {/* HUD */}
      <div className="absolute top-20 left-0 right-0 z-40 flex items-center justify-center px-4">
        <div className="flex items-center gap-3 bg-white/90 rounded-full px-5 py-2 shadow-lg">
          <span className="font-bold text-[#002244] text-base max-w-[120px] truncate">{playerName}</span>
          <span className="w-px h-6 bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <Fish className="w-5 h-5 text-[#4FC3D9]" />
            <span className="font-black text-[#FF6600] text-xl">{score}</span>
          </div>
          <span className="w-px h-6 bg-slate-300" />
          <div className="flex gap-1 items-center">
            {livesArr.map((i) => (
              <motion.div key={i} animate={i === lives && feedback && !feedback.correct ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : {}} transition={{ duration: 0.5 }}>
                <Heart className={`w-6 h-6 ${i < lives ? "text-red-500 fill-red-500" : "text-slate-300"}`} />
              </motion.div>
            ))}
            <AnimatePresence>
              {feedback && !feedback.correct && <HeartBurst key={`hb-${qIndex}`} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scene with screen shake */}
      <motion.div className="absolute inset-0 z-10" animate={shake ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }} transition={{ duration: 0.45 }}>
        <FishScene fish={fish} onTapFish={tapFish} disabled={phase !== "ready"} hint={phase === "ready"} />
      </motion.div>

      <AnimatePresence>
        {phase === "question" && (
          <QuestionCard key={`q-${qIndex}`} question={currentQ} timeLeft={timeLeft} selected={selected} onAnswer={handleAnswer} warning={warning} />
        )}
        {phase === "feedback" && feedback && (
          <FeedbackCard key={`f-${qIndex}`} feedback={feedback} question={currentQ} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInfo && <InstructionsModal onClose={() => setShowInfo(false)} />}
      </AnimatePresence>
    </div>
  );
}

function HeartBurst() {
  return (
    <motion.div className="absolute" style={{ right: -8, top: 0 }} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.7 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <motion.span key={i} className="absolute block w-2 h-2 rounded-full bg-red-400"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(a) * 22, y: Math.sin(a) * 22, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.6 }}
          />
        );
      })}
    </motion.div>
  );
}

function QuestionCard({ question, timeLeft, selected, onAnswer, warning }) {
  const pct = (timeLeft / QUESTION_TIME) * 100;
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-4 border-[#FF6600]">
        <div className="h-3 bg-slate-100 relative">
          <motion.div
            className={`h-full ${warning ? "bg-red-500" : "bg-[#FF6600]"}`}
            style={{ width: `${pct}%` }}
            animate={warning ? { opacity: [1, 0.45, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${warning ? "text-red-600" : "text-slate-600"}`}>
            {Math.ceil(timeLeft)} שניות
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#002244] text-white text-sm font-bold">
              {question.type === "boolean" ? "נכון / לא נכון" : "בחירה מרובה"}
            </span>
            <Fish className="w-5 h-5 text-[#FFD60A]" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 leading-relaxed" dir="rtl">{question.question}</h3>
          <div className={`grid gap-3 ${question.options.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {question.options.map((opt, i) => (
              <button key={i} onClick={() => onAnswer(i)} disabled={selected !== null}
                className="px-4 py-3.5 rounded-2xl bg-[#EAFBFB] border-2 border-[#4FC3D9] text-slate-800 font-bold text-base
                hover:bg-[#4FC3D9] hover:text-white transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-right">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeedbackCard({ feedback, question }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.5, rotate: feedback.correct ? 0 : -5 }} animate={{ scale: 1, rotate: 0 }}
        className={`bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 text-center border-4 ${feedback.correct ? "border-green-500" : "border-red-500"}`}>
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${feedback.correct ? "bg-green-100" : "bg-red-100"}`}>
          {feedback.correct ? <Fish className="w-12 h-12 text-green-500" /> : <X className="w-12 h-12 text-red-500" strokeWidth={3} />}
        </div>
        <h3 className={`font-display font-bold text-4xl mb-3 ${feedback.correct ? "text-green-600" : "text-red-600"}`}>
          {feedback.correct ? "הדג נתפס! 🎣" : "הדג ברח! 💧"}
        </h3>
        {!feedback.correct && (
          <div className="bg-slate-50 rounded-2xl p-3 mb-3">
            <p className="text-sm text-slate-500 mb-1">התשובה הנכונה:</p>
            <p className="font-bold text-slate-800 text-lg">{question.options[feedback.correctIndex]}</p>
          </div>
        )}
        <p className="text-slate-600 leading-relaxed">{question.explanation}</p>
      </motion.div>
    </motion.div>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}