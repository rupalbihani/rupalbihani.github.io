import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ping } from "../lib/telegram";

type Mood = {
  id: string;
  hindi: string;
  english: string;
  emoji: string;
  color: string;
  glow: string;
};

const MOODS: Mood[] = [
  { id: "calm",      hindi: "शांत",        english: "calm",        emoji: "🌙", color: "#B58AB4", glow: "rgba(181,138,180,0.55)" },
  { id: "missing",   hindi: "तुम्हारी याद", english: "missing you", emoji: "💭", color: "#F4B893", glow: "rgba(244,184,147,0.55)" },
  { id: "playful",   hindi: "खिलखिलाहट",  english: "playful",     emoji: "🌸", color: "#FFB8CC", glow: "rgba(255,184,204,0.55)" },
  { id: "tired",     hindi: "थकी हुई",     english: "tired",       emoji: "🌌", color: "#5B4780", glow: "rgba(91,71,128,0.55)" },
  { id: "inlove",    hindi: "प्रेम में",    english: "in love",     emoji: "🤍", color: "#FFE0EC", glow: "rgba(255,224,236,0.7)" },
  { id: "thoughtful", hindi: "सोच में",      english: "thoughtful",  emoji: "✨", color: "#FFE0BC", glow: "rgba(255,224,188,0.6)" },
  { id: "joyful",    hindi: "खुशी",         english: "joyful",      emoji: "⭐", color: "#FFF3B0", glow: "rgba(255,243,176,0.65)" },
  { id: "blue",      hindi: "उदास",         english: "blue",        emoji: "🌊", color: "#7BA0C4", glow: "rgba(123,160,196,0.55)" },
];

export default function Mann() {
  const nav = useNavigate();
  const [selected, setSelected] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => { ping("visit", { layer: "mann" }); }, []);

  const send = async () => {
    if (!selected) return;
    await ping("mood", {
      mood: selected.english,
      hindi: selected.hindi,
      emoji: selected.emoji,
      note: note.trim() || undefined,
    });
    setSent(true);
  };

  const reset = () => {
    setSelected(null);
    setNote("");
    setSent(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden ghibli-sky">
      <Stars />
      <Clouds />
      <Sparkles />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="text-center mb-4"
        >
          <h2
            className="font-hindi text-4xl sm:text-5xl md:text-7xl tracking-tight"
            style={{
              color: "#FFF6E5",
              textShadow: "0 3px 0 rgba(44,38,69,0.35), 0 8px 30px rgba(0,0,0,0.35)",
            }}
          >
            आज का मन
          </h2>
          <p
            className="font-playful text-xl sm:text-2xl md:text-3xl mt-2"
            style={{
              color: "#FFE0BC",
              textShadow: "0 2px 8px rgba(44,38,69,0.5)",
            }}
          >
            how does today feel?
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="italic max-w-xl text-center mt-2 mb-10"
          style={{
            color: "#FFF6E5",
            fontFamily: "'Fraunces', serif",
            fontSize: "1rem",
            textShadow: "0 2px 8px rgba(44,38,69,0.4)",
          }}
        >
          pick a mood — it flies straight to me,
          <br />
          <span className="font-hindi">तुम्हारा मन, मेरे तक</span>
        </motion.p>

        {/* Mood orbs floating in a circle */}
        {!sent && (
          <div className="relative w-full max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {MOODS.map((m, i) => (
                <MoodOrb
                  key={m.id}
                  mood={m}
                  index={i}
                  isSelected={selected?.id === m.id}
                  onPick={() => setSelected(m)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Selected mood → note input + send */}
        <AnimatePresence>
          {selected && !sent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-lg mt-10"
            >
              <div
                className="rounded-3xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",
                  border: "1.5px solid rgba(139,90,60,0.35)",
                  boxShadow: "0 12px 40px rgba(60,30,20,0.3)",
                }}
              >
                <p className="font-playful text-lg text-center" style={{ color: "#8B5A3C" }}>
                  today I feel
                </p>
                <p className="text-center mt-1">
                  <span className="text-2xl sm:text-3xl mr-2">{selected.emoji}</span>
                  <span className="font-hindi text-2xl sm:text-3xl" style={{ color: "#4A2E10", fontWeight: 700 }}>
                    {selected.hindi}
                  </span>
                  <span className="font-playful text-xl sm:text-2xl ml-2" style={{ color: "#7A1F3D" }}>
                    · {selected.english}
                  </span>
                </p>

                <div className="mt-6">
                  <label
                    className="font-playful text-base sm:text-lg block mb-2"
                    style={{ color: "#5B3B1E" }}
                  >
                    a little note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={280}
                    rows={3}
                    placeholder="कुछ कहना चाहती हो?"
                    className="w-full rounded-2xl px-4 py-3 resize-none focus:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      border: "1.5px solid rgba(139,90,60,0.3)",
                      color: "#2C2645",
                      fontFamily: "'Fraunces', serif",
                      fontSize: "1rem",
                    }}
                  />
                  <p
                    className="font-playful text-xs text-right mt-1"
                    style={{ color: "#8B5A3C" }}
                  >
                    {note.length}/280
                  </p>
                </div>

                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={() => setSelected(null)}
                    className="font-playful text-base sm:text-lg px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all hover:scale-105"
                    style={{
                      background: "rgba(139,90,60,0.15)",
                      border: "1.5px solid rgba(139,90,60,0.3)",
                      color: "#8B5A3C",
                    }}
                  >
                    change my mind
                  </button>
                  <button
                    onClick={send}
                    className="font-playful text-base sm:text-lg px-5 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #FFE0EC, #FFB8CC)",
                      border: "1.5px solid rgba(200,60,100,0.5)",
                      color: "#7A1F3D",
                      boxShadow: "0 6px 20px rgba(200,60,100,0.3)",
                    }}
                  >
                    ✨ send to Niraj
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sent confirmation */}
        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-xl mt-4 text-center"
            >
              <div className="text-6xl mb-4">🌙</div>
              <p
                className="font-hindi text-3xl sm:text-4xl md:text-5xl leading-tight"
                style={{
                  color: "#FFF6E5",
                  textShadow: "0 3px 0 rgba(44,38,69,0.35), 0 8px 30px rgba(0,0,0,0.35)",
                }}
              >
                भेज दिया
              </p>
              <p
                className="font-playful text-xl sm:text-2xl mt-3"
                style={{
                  color: "#FFE0BC",
                  textShadow: "0 2px 8px rgba(44,38,69,0.4)",
                }}
              >
                the moon carried it to him
              </p>

              <div className="flex justify-center gap-3 mt-8">
                <button
                  onClick={reset}
                  className="font-playful text-lg px-5 py-2 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,246,229,0.4)",
                    border: "1.5px solid rgba(139,90,60,0.35)",
                    color: "#FFF6E5",
                    textShadow: "0 2px 6px rgba(44,38,69,0.4)",
                  }}
                >
                  send another mood
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Portal — always visible */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          onClick={() => nav("/prakashit")}
          className="mt-12 group relative"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              background: "rgba(255,246,229,0.4)",
              border: "1.5px solid rgba(139,90,60,0.35)",
              boxShadow: "0 0 30px rgba(255,214,176,0.5)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-breathe"
              style={{ background: "#5B3B72" }}
            />
          </div>
          <p
            className="font-playful text-2xl mt-3"
            style={{
              color: "#FFF6E5",
              textShadow: "0 2px 6px rgba(44,38,69,0.4)",
            }}
          >
            the last layer →
          </p>
        </motion.button>
      </div>
    </div>
  );
}

/* ---------------- MOOD ORB ---------------- */
function MoodOrb({ mood, index, isSelected, onPick }: {
  mood: Mood; index: number; isSelected: boolean; onPick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.9 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.08, y: -6 }}
      whileTap={{ scale: 0.95 }}
      onClick={onPick}
      className="relative flex flex-col items-center justify-center rounded-full aspect-square transition-shadow duration-500 animate-drift"
      style={{
        background: `radial-gradient(circle at 35% 30%, #FFF6E5 0%, ${mood.color} 60%, ${mood.color} 100%)`,
        border: isSelected
          ? "2.5px solid rgba(255,246,229,0.95)"
          : "1.5px solid rgba(139,90,60,0.3)",
        boxShadow: isSelected
          ? `0 0 40px ${mood.glow}, 0 0 80px ${mood.glow}, inset 0 4px 12px rgba(255,255,255,0.3)`
          : `0 8px 24px rgba(60,30,20,0.3), 0 0 30px ${mood.glow}, inset 0 2px 6px rgba(255,255,255,0.25)`,
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <span className="text-3xl sm:text-4xl md:text-5xl">{mood.emoji}</span>
      <span
        className="font-hindi text-sm sm:text-base md:text-xl mt-1"
        style={{ color: "#2C2645", fontWeight: 700, textShadow: "0 1px 0 rgba(255,246,229,0.4)" }}
      >
        {mood.hindi}
      </span>
      <span
        className="font-playful text-xs sm:text-sm md:text-base"
        style={{ color: "#4A2E10" }}
      >
        {mood.english}
      </span>
    </motion.button>
  );
}

/* ---------------- STARS ---------------- */
function Stars() {
  const stars = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((i) => {
        const top = (i * 79) % 55;
        const left = (i * 53) % 100;
        const size = 1 + ((i * 7) % 3);
        const delay = (i % 8) * 0.5;
        return (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              top: top + "%", left: left + "%", width: size, height: size,
              background: "#FFF6E5", boxShadow: "0 0 6px rgba(255,246,229,0.9)",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- CLOUDS ---------------- */
function Clouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 100 + i * 40, repeat: Infinity, ease: "linear", delay: i * -30 }}
          className="absolute rounded-full"
          style={{
            top: (8 + i * 10) + "%",
            width: (240 + i * 100) + "px",
            height: (70 + i * 18) + "px",
            background: "radial-gradient(ellipse, rgba(255,246,229,0.35), transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- SPARKLES ---------------- */
function Sparkles() {
  const drops = Array.from({ length: 14 }, (_, i) => i);
  const symbols = ["✨", "🌸", "💭", "🤍", "🪶"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((i) => {
        const startX = (i * 41) % 100;
        const delay = (i % 6) * 3;
        const duration = 22 + (i % 5) * 4;
        return (
          <motion.span
            key={i}
            initial={{ y: "110vh", x: startX + "vw", rotate: 0, opacity: 0 }}
            animate={{
              y: "-10vh",
              x: "calc(" + startX + "vw + " + ((i % 2 ? 1 : -1) * 15) + "vw)",
              rotate: 360,
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            className="absolute text-lg"
          >
            {symbols[i % symbols.length]}
          </motion.span>
        );
      })}
    </div>
  );
}