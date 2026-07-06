import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ping } from "../lib/telegram";

const TEXT_ON_MOON = {
  color: "#2C1F4A",
  textShadow:
    "0 0 24px rgba(255,246,229,0.85), 0 0 48px rgba(255,246,229,0.4), 0 2px 0 rgba(255,246,229,0.5)",
};

const TEXT_ON_SKY = {
  color: "#FFF6E5",
  textShadow: "0 2px 12px rgba(44,38,69,0.7), 0 0 24px rgba(44,38,69,0.4)",
};

const PROMISES = [
  "morning tea, every day",
  "your art on every wall",
  "your father's approval, earned",
  "your favorite corner, always saved",
  "our mothers' laughter in one home",
  "a garden you can wake up to",
];

function bookFlightsUrl(): string {
  const today = new Date();
  const nextSat = new Date(today);
  nextSat.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7 || 7));
  const nextSatPlus7 = new Date(nextSat);
  nextSatPlus7.setDate(nextSat.getDate() + 7);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return (
    "https://www.google.com/flights?hl=en#flt=YYZ.JAI." +
    fmt(nextSat) +
    "*JAI.YYZ." +
    fmt(nextSatPlus7) +
    ";c:CAD;e:1;sd:1;t:f"
  );
}

export default function Ring() {
  const nav = useNavigate();
  const [hoveredPromise, setHoveredPromise] = useState<number | null>(null);

  useEffect(() => {
    ping("visit", { layer: "ring" });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden ghibli-sky">
      <Stars />
      <Clouds />
      <Petals />
      <Sparkles />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 sm:px-6 pt-20 sm:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="text-center mb-4"
        >
          <p
            className="font-playful text-base sm:text-lg uppercase tracking-widest mb-2"
            style={TEXT_ON_SKY}
          >
            {/* what comes next */}
          </p>
          <h2
            className="font-hindi text-4xl sm:text-5xl md:text-7xl tracking-tight"
            style={TEXT_ON_SKY}
          >
            {/* एक अंगूठी, एक वादा */}
          </h2>
          <p
            className="font-playful text-xl sm:text-2xl md:text-3xl mt-2"
            style={TEXT_ON_SKY}
          >
            one ring, forever promise
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative my-6"
          style={{ width: "min(80vmin, 480px)", height: "min(80vmin, 480px)" }}
        >
          <FloatingRing />
          <OrbitingPromises
            promises={PROMISES}
            hovered={hoveredPromise}
            setHovered={setHoveredPromise}
          />
        </motion.div>

        <motion.div
          className="min-h-[3rem] mb-6 text-center px-6"
          animate={{ opacity: hoveredPromise !== null ? 1 : 0.5 }}
        >
          <p
            className="font-playful text-xl sm:text-2xl md:text-3xl"
            style={TEXT_ON_MOON}
          >
            {hoveredPromise !== null
              ? "\u201C" + PROMISES[hoveredPromise] + "\u201D"
              : "hover the gems, one by one"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, delay: 1.4 }}
          className="max-w-2xl w-full rounded-3xl px-6 sm:px-8 md:px-12 py-8 md:py-12 relative overflow-hidden"
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
            className="font-playful text-lg sm:text-xl md:text-2xl leading-relaxed"
            style={{ color: "#4A2E10" }}
          >
            Rupal,
            <br />
            <br />
            you pressed the button.
            <br />
            the moon has heard.
            <br />
            <br />
            now the real work begins 
            <br />
            not the kind that feels like work,
            <br />
            but the kind that feels like coming home
            <br />
            every single day.
            <br />
            <br />
            somewhere between our mothers making chai
            <br />
            and our fathers arguing about politics,
            <br />
            we will become official
            <br />
            in the only way that matters.
            <br />
            <br />
            a ring will slide onto your hand
            <br />
            like it always belonged there.
            <br />
            your name will settle beside mine
            <br />
            the way the moon settles into the sky.
            <br />
            <br />
            everything you feared 
            <br />
            everything you doubted 
            <br />
            let it rest now.
            <br />
            you never had to wonder.
            <br />
            I was always here.
            <br />
            I&apos;ll always be.
          </p>

          <div className="mt-8 text-4xl">💍</div>

          <p
            className="font-playful text-xl sm:text-2xl mt-4"
            style={{ color: "#8B5A3C" }}
          >
            forever yours,
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

        <div className="mt-10">
          <FlightButton />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 3, delay: 3.5 }}
          className="mt-6 font-playful text-sm sm:text-base tracking-widest uppercase"
          style={TEXT_ON_MOON}
        >
          the story continues
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 4 }}
          onClick={() => nav("/")}
          className="mt-8 font-playful text-lg underline underline-offset-4 hover:opacity-100 transition-opacity"
          style={TEXT_ON_SKY}
        >
          walk it all again 🌙
        </motion.button>
      </div>
    </div>
  );
}

/* ---------------- FLIGHT BUTTON ---------------- */
function FlightButton() {
  const href = bookFlightsUrl();
  const style = {
    background: "linear-gradient(135deg, #FFE0EC, #FFB8CC)",
    border: "1.5px solid rgba(200,60,100,0.5)",
    color: "#7A1F3D",
    boxShadow:
      "0 6px 20px rgba(200,60,100,0.35), inset 0 2px 6px rgba(200,60,100,0.15)",
    fontWeight: 700 as const,
  };
  const className =
    "font-playful text-xl sm:text-2xl px-8 py-4 rounded-full transition-all hover:scale-105 inline-block";

  return React.createElement(
    "a",
    { href, target: "_blank", rel: "noreferrer", className, style },
    "\u2708\uFE0F  book the flight to Jaipur"
  );
}

/* ---------------- FLOATING RING ---------------- */
function FloatingRing() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="ringHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,246,229,0.6)" />
            <stop offset="60%" stopColor="rgba(255,214,176,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="ringBand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF6E5" />
            <stop offset="30%" stopColor="#F4D6A8" />
            <stop offset="60%" stopColor="#C88A5C" />
            <stop offset="100%" stopColor="#8B5A3C" />
          </linearGradient>
          <radialGradient id="gemGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF6E5" />
            <stop offset="40%" stopColor="#FFE0BC" />
            <stop offset="100%" stopColor="#F4B893" />
          </radialGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="200" cy="200" r="180" fill="url(#ringHalo)" />

        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="url(#ringBand)"
          strokeWidth="18"
          filter="url(#ringGlow)"
        />
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="rgba(255,246,229,0.4)"
          strokeWidth="4"
        />

        <g filter="url(#ringGlow)">
          <circle cx="200" cy="88" r="24" fill="url(#gemGrad)" />
          <circle
            cx="200"
            cy="88"
            r="24"
            fill="none"
            stroke="#8B5A3C"
            strokeWidth="1.5"
          />
          <circle cx="192" cy="80" r="6" fill="rgba(255,255,255,0.7)" />
        </g>
      </svg>
    </motion.div>
  );
}

/* ---------------- ORBITING PROMISES ---------------- */
function OrbitingPromises({
  promises,
  hovered,
  setHovered,
}: {
  promises: string[];
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {promises.map((_, i) => {
        const angle = (i / promises.length) * 360 + 90;
        const rad = (angle * Math.PI) / 180;
        const radius = 42;
        const x = 50 + Math.cos(rad) * radius;
        const y = 50 + Math.sin(rad) * radius;
        return (
          <motion.button
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              width: hovered === i ? 32 : 22,
              height: hovered === i ? 32 : 22,
              background: "radial-gradient(circle at 30% 30%, #FFF6E5, #FFB8CC)",
              boxShadow:
                hovered === i
                  ? "0 0 24px rgba(255,184,204,0.9)"
                  : "0 0 12px rgba(255,214,176,0.6)",
              border: "1.5px solid rgba(139,90,60,0.4)",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(i)}
            aria-label={"promise " + (i + 1)}
          />
        );
      })}
    </div>
  );
}

/* ---------------- STARS ---------------- */
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
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              top: top + "%",
              left: left + "%",
              width: size,
              height: size,
              background: "#FFF6E5",
              boxShadow: "0 0 6px rgba(255,246,229,0.9)",
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
          transition={{
            duration: 100 + i * 40,
            repeat: Infinity,
            ease: "linear",
            delay: i * -30,
          }}
          className="absolute rounded-full"
          style={{
            top: 8 + i * 10 + "%",
            width: 240 + i * 100 + "px",
            height: 70 + i * 18 + "px",
            background:
              "radial-gradient(ellipse, rgba(255,246,229,0.35), transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- PETALS ---------------- */
function Petals() {
  const petals = Array.from({ length: 12 }, (_, i) => i);
  const symbols = ["🌸", "🍃", "🤍", "✨"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((i) => {
        const startX = (i * 41) % 100;
        const delay = (i % 6) * 3;
        const duration = 22 + (i % 5) * 4;
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

/* ---------------- SPARKLES ---------------- */
function Sparkles() {
  const sp = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sp.map((i) => {
        const top = 30 + ((i * 37) % 60);
        const left = (i * 53) % 100;
        const delay = (i % 6) * 0.5;
        return (
          <motion.span
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.4, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              top: top + "%",
              left: left + "%",
              width: 4,
              height: 4,
              background: "radial-gradient(circle, #FFF6E5, transparent 70%)",
              boxShadow: "0 0 12px rgba(255,246,229,0.9)",
            }}
          />
        );
      })}
    </div>
  );
}