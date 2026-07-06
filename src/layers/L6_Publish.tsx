import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ping } from "../lib/telegram";
import { CONFIG } from "../config";

const TEXT_ON_MOON = {
  color: "#2C1F4A",
  textShadow:
    "0 0 24px rgba(255,246,229,0.85), 0 0 48px rgba(255,246,229,0.4), 0 2px 0 rgba(255,246,229,0.5)",
};

const TEXT_ON_SKY = {
  color: "#FFF6E5",
  textShadow: "0 2px 12px rgba(44,38,69,0.7), 0 0 24px rgba(44,38,69,0.4)",
};

function formatPublishDate(iso: string): string {
  // Parse as local date to avoid UTC timezone shift
  const [y, m, day] = iso.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Publish() {
  const nav = useNavigate();

  useEffect(() => {
    ping("visit", { layer: "prakashit" });
  }, []);

  const publishedOn = formatPublishDate(CONFIG.publishDate);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden ghibli-sky"><Stars />
      <Clouds />
      <Petals />
      <SoftConfetti />

      {/* Giant painted moon backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0.85 }}
          animate={{ scale: 1.3, opacity: 1 }}
          transition={{ duration: 5, ease: [0.4, 0, 0.2, 1] }}
          className="relative"
          style={{ width: "min(70vmin, 560px)", height: "min(70vmin, 560px)" }}
        >
          <PaintedMoon />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 max-w-3xl px-6 pt-24 sm:pt-28 pb-16 text-center"
      >
        {/* Timestamp — small, above */}
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="font-playful text-base sm:text-lg md:text-xl uppercase tracking-widest mb-2"
          style={TEXT_ON_SKY}
        >
          published on {publishedOn}
        </motion.p>


        {/* The verdict — big Hindi */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.02em" }}
          transition={{ duration: 3, delay: 1 }}
          className="font-hindi text-4xl sm:text-5xl md:text-7xl leading-tight mb-8"
          style={TEXT_ON_MOON}
        >
          चाँद ने सुन लिया।
        </motion.p>

        {/* Card — the memorial letter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.6, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-3xl px-6 sm:px-8 md:px-12 py-8 md:py-12 mx-auto max-w-2xl relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",
            boxShadow:
              "0 30px 80px rgba(60,30,20,0.5), inset 0 1px 0 rgba(255,255,255,0.6)",
            border: "2px solid rgba(139,90,60,0.35)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,90,60,0.6), transparent)",
            }}
          />

          <p
            className="font-playful text-xl sm:text-2xl md:text-3xl leading-relaxed"
            style={{ color: "#4A2E10" }}
          >
            oh look who finally held the button.
            <br />
            <br />
            after round 47 of &ldquo;kya sach mein karta hai?&rdquo;
            <br />
            after &ldquo;ab dil khol sakte ho&rdquo;
            <br />
            after a hundred silent yeses
            <br />
            you finally said one out loud.
            <br />
            <br />
            told you I wasn&rsquo;t going anywhere.
            <br />
            told you every single day
            <br />
            in every single way
            <br />
            except the one you kept waiting for.
            <br />
            <br />
            now the moon has heard.
            <br />
            the words have been said.
            <br />
            <br />
            honestly? this was the easy part.
            <br />
            the fun part is next.
          </p>

          <div className="mt-8 text-4xl">🌙</div>

          <p
            className="font-playful text-xl sm:text-2xl mt-4"
            style={{ color: "#8B5A3C" }}
          >
            forever yours (and dramatically so),
            <br />
            Niraj
          </p>

          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,90,60,0.6), transparent)",
            }}
          />
        </motion.div>

        {/* Discovery hint — the hidden layer */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 4 }}
          onClick={() => nav("/ring")}
          className="mt-10 group flex flex-col items-center gap-2"
        >
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              background: "rgba(255,246,229,0.5)",
              border: "1.5px solid rgba(139,90,60,0.5)",
              boxShadow: "0 0 30px rgba(255,214,176,0.7)",
            }}
          >
            <span className="text-2xl">💍</span>
          </div>
          <p
            className="font-playful text-lg sm:text-xl uppercase tracking-widest"
            style={TEXT_ON_SKY}
          >
            what comes next →
          </p>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 3, delay: 6 }}
          className="mt-8 font-playful text-sm sm:text-base tracking-widest uppercase"
          style={TEXT_ON_SKY}
        >
          a message has already travelled home
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ---------------- PAINTED MOON ---------------- */
function PaintedMoon() {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,246,229,0.7) 0%, rgba(255,214,176,0.4) 40%, transparent 70%)",
          filter: "blur(30px)",
          transform: "scale(1.6)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #FFFCF3 0%, #FFEBC5 40%, #F4B893 80%, #C88A5C 100%)",
          boxShadow:
            "inset -30px -30px 60px rgba(139,90,60,0.35), 0 0 100px rgba(255,246,229,0.55)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 60% 55%, rgba(139,90,60,0.35) 0%, transparent 15%), radial-gradient(circle at 30% 70%, rgba(139,90,60,0.25) 0%, transparent 12%), radial-gradient(circle at 70% 25%, rgba(139,90,60,0.2) 0%, transparent 10%)",
        }}
      />
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => i);
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

function Clouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 100 + i * 40, repeat: Infinity, ease: "linear", delay: i * -30 }}
          className="absolute rounded-full"
          style={{
            top: (10 + i * 12) + "%",
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

function Petals() {
  const petals = Array.from({ length: 14 }, (_, i) => i);
  const symbols = ["🌸", "🍃", "✨", "🤍"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((i) => {
        const startX = (i * 41) % 100;
        const delay = (i % 6) * 3;
        const duration = 20 + (i % 5) * 4;
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: startX + "vw", rotate: 0, opacity: 0 }}
            animate={{
              y: "110vh",
              x: "calc(" + startX + "vw + " + ((i % 2 ? 1 : -1) * 15) + "vw)",
              rotate: 360,
              opacity: [0, 0.9, 0.9, 0],
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

/* Softer confetti — always visible now, not a burst */
function SoftConfetti() {
  const pieces = Array.from({ length: 25 }, (_, i) => i);
  const symbols = ["✨", "⭐", "💛"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {pieces.map((i) => {
        const x = (i * 41) % 100;
        const delay = (i * 0.3) % 6;
        return (
          <motion.span
            key={i}
            initial={{ y: "-5vh", x: x + "vw", opacity: 0, scale: 0.4 }}
            animate={{
              y: "105vh",
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.4, 0.9, 0.9, 0.4],
              rotate: 360,
            }}
            transition={{ duration: 18, repeat: Infinity, delay, ease: "linear" }}
            className="absolute text-lg"
          >
            {symbols[i % symbols.length]}
          </motion.span>
        );
      })}
    </div>
  );
}