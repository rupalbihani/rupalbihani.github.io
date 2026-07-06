import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ping } from "../lib/telegram";
import { CONFIG } from "../config";
import { daysTogether } from "../lib/daysTogether";

const DISTANCE_KM = 11_500;

export default function DoSheher() {
  const nav = useNavigate();
  const [now, setNow] = useState(new Date());
  const [rotation, setRotation] = useState(0);

  useEffect(() => { ping("visit", { layer: "do-sheher" }); }, []);

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) / 1000;
      setRotation((elapsed * 3) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const torontoTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: CONFIG.cities.toronto.tz,
  }).format(now);
  const jaipurTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: CONFIG.cities.jaipur.tz,
  }).format(now);

  const days = daysTogether(now);

  return (
    <div className="relative min-h-screen overflow-hidden ghibli-sky">
      <Stars />
      <Clouds />
      <Birds />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 sm:px-6 pt-20 sm:pt-24 pb-16">
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
            दो शहर, एक दिल
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 mt-4 sm:mt-6 max-w-2xl w-full"
        >
          <CityClock name="Toronto" hindi="टोरंटो" time={torontoTime} accent="#F4B893" />
          <CityClock name="Jaipur" hindi="जयपुर" time={jaipurTime} accent="#FFB8CC" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          className="relative my-6 sm:my-10"
          style={{ width: "min(80vmin, 520px)", height: "min(80vmin, 520px)" }}
        >
          <PaintedGlobe rotation={rotation} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl px-2 sm:px-4"
        >
          <Sticker label={`${DISTANCE_KM.toLocaleString()} km apart`} rotate={-3} />
          <Sticker label={`${days} days together`} rotate={2} />
          <Sticker label="9.5 hours behind you" rotate={-2} />
          <Sticker label="14 hour flight · one hug away" rotate={3} />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, delay: 2.2 }}
          className="mt-8 sm:mt-10 max-w-2xl text-center px-4 sm:px-6"
        >
          <p
            className="italic text-base sm:text-lg md:text-2xl leading-relaxed"
            style={{
              color: "#4A2E10",
              fontWeight: 500,
              fontFamily: "'Fraunces', serif",
              textShadow: "0 1px 0 rgba(255,246,229,0.6), 0 0 16px rgba(255,246,229,0.5)",
            }}
          >
            &ldquo;from Toronto dawns to Jaipur nights,
            <br className="hidden md:block" />
            my heart still finds you under the same moon.&rdquo;
          </p>
        </motion.blockquote>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          onClick={() => nav("/aaj-ka-geet")}
          className="mt-8 sm:mt-10 group relative"
        >
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
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
            className="font-playful text-xl sm:text-2xl mt-2 sm:mt-3"
            style={{
              color: "#4A2E10",
              fontWeight: 700,
              textShadow: "0 1px 0 rgba(255,246,229,0.6), 0 0 12px rgba(255,246,229,0.5)",
            }}
          >
            fall deeper →
          </p>
        </motion.button>
      </div>
    </div>
  );
}

function CityClock({ name, hindi, time, accent }: {
  name: string; hindi: string; time: string; accent: string;
}) {
  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,246,229,0.85), rgba(244,214,168,0.75))",
        border: "1.5px solid rgba(139,90,60,0.35)",
        boxShadow: "0 8px 24px rgba(60,30,20,0.25)",
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />
      <p className="font-playful text-base sm:text-xl md:text-2xl" style={{ color: "#5B3B1E" }}>
        {name}
      </p>
      <p className="font-hindi text-xs sm:text-sm mt-0.5" style={{ color: "#8B5A3C" }}>
        {hindi}
      </p>
      <p
        className="text-xl sm:text-3xl md:text-4xl mt-1 sm:mt-2 tracking-wide"
        style={{
          color: "#2C2645",
          fontFamily: "'Fraunces', serif",
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </p>
    </div>
  );
}

function Sticker({ label, rotate, hindi }: { label: string; rotate: number; hindi?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
      style={{
        background: "linear-gradient(135deg, #FFF6E5, #F4D6A8)",
        boxShadow: "0 4px 12px rgba(60,30,20,0.15)",
        border: "1.5px solid rgba(139,90,60,0.35)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <span
        className={
          hindi
            ? "font-hindi text-sm sm:text-base md:text-xl"
            : "font-playful text-sm sm:text-base md:text-xl"
        }
        style={{ color: "#5B3B1E", fontWeight: hindi ? 700 : 400 }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function PaintedGlobe({ rotation }: { rotation: number }) {
  const drift = Math.sin((rotation * Math.PI) / 180) * 8;
  const torontoX = 200 + drift - 108;
  const torontoY = 200 + 10;
  const jaipurX = 200 + drift + 108;
  const jaipurY = 200 + 24;

  const arcPath = `M ${torontoX} ${torontoY} Q 200 40 ${jaipurX} ${jaipurY}`;

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,246,229,0.5) 0%, transparent 70%)",
          filter: "blur(30px)",
          transform: "scale(1.4)",
        }}
      />

      <svg viewBox="0 0 400 400" className="relative w-full h-full">
        <defs>
          <radialGradient id="ocean" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFEBC5" />
            <stop offset="45%" stopColor="#F4B893" />
            <stop offset="80%" stopColor="#C88A5C" />
            <stop offset="100%" stopColor="#8B5A3C" />
          </radialGradient>
          <radialGradient id="oceanShade" cx="70%" cy="80%" r="60%">
            <stop offset="0%" stopColor="rgba(44,38,69,0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="softblur">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <circle cx="200" cy="200" r="190" fill="url(#ocean)" />
        <circle cx="200" cy="200" r="190" fill="url(#oceanShade)" />

        <g style={{ transformOrigin: "200px 200px", transform: `translateX(${drift}px)` }} filter="url(#softblur)">
          <path
            d="M 55 130 Q 40 160 55 195 Q 45 220 65 240 Q 80 265 105 258 Q 130 260 140 235 Q 155 215 145 190 Q 140 165 120 145 Q 95 125 55 130 Z"
            fill="#7BA05B" opacity="0.85"
          />
          <path
            d="M 100 275 Q 90 305 110 335 Q 120 355 135 340 Q 145 315 138 290 Q 120 270 100 275 Z"
            fill="#7BA05B" opacity="0.8"
          />
          <path
            d="M 195 130 Q 180 155 190 180 Q 175 210 195 235 Q 200 280 220 310 Q 235 330 245 305 Q 250 265 235 235 Q 250 210 240 180 Q 235 150 215 135 Q 200 125 195 130 Z"
            fill="#7BA05B" opacity="0.85"
          />
          <path
            d="M 265 125 Q 250 155 270 175 Q 285 195 315 190 Q 340 185 345 160 Q 340 135 315 125 Q 290 118 265 125 Z"
            fill="#7BA05B" opacity="0.85"
          />
          <path
            d="M 290 200 Q 285 220 300 235 Q 315 225 310 205 Q 300 195 290 200 Z"
            fill="#7BA05B" opacity="0.85"
          />
        </g>

        <ellipse cx="150" cy="130" rx="60" ry="30" fill="rgba(255,246,229,0.35)" filter="url(#softblur)" />

        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(139,90,60,0.35)" strokeWidth="1.5" />

        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,246,229,0.9)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          filter="url(#softblur)"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
        </path>

        <circle r="5" fill="#FFF6E5" opacity="0.9">
          <animateMotion dur="4s" repeatCount="indefinite" path={arcPath} />
          <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
        </circle>

        <g>
          <circle cx={torontoX} cy={torontoY} r="14" fill="#F4B893" opacity="0.5">
            <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx={torontoX} cy={torontoY} r="6" fill="#FFF6E5" stroke="#8B5A3C" strokeWidth="1.5" />
        </g>

        <g>
          <circle cx={jaipurX} cy={jaipurY} r="14" fill="#FFB8CC" opacity="0.5">
            <animate attributeName="r" values="10;18;10" dur="3s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx={jaipurX} cy={jaipurY} r="6" fill="#FFF6E5" stroke="#8B2C4F" strokeWidth="1.5" />
        </g>

        <text
          x={torontoX} y={torontoY + 28}
          textAnchor="middle"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fill: "#2C2645", fontWeight: 700 }}
        >
          Toronto
        </text>
        <text
          x={jaipurX} y={jaipurY + 28}
          textAnchor="middle"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fill: "#2C2645", fontWeight: 700 }}
        >
          Jaipur
        </text>
      </svg>

      <motion.div
        animate={{
          x: ["-10%", "110%"],
          y: [0, -20, 0, -15, 0],
          rotate: [0, 8, -4, 6, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
        className="absolute text-xl sm:text-2xl pointer-events-none"
        style={{ top: "35%" }}
      >
        ✈️
      </motion.div>
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((i) => {
        const top = (i * 79) % 50;
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

function Birds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ x: "-10%", y: (15 + i * 8) + "%" }}
          animate={{ x: "110%", y: [(15 + i * 8) + "%", (10 + i * 8) + "%", (15 + i * 8) + "%"] }}
          transition={{
            duration: 60 + i * 20,
            repeat: Infinity,
            ease: "linear",
            delay: i * 12,
          }}
          className="absolute"
        >
          <BirdSvg />
        </motion.div>
      ))}
    </div>
  );
}

function BirdSvg() {
  return (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
      <motion.path
        d="M 2 8 Q 6 2 10 8 Q 14 2 18 8 Q 22 4 24 8"
        stroke="rgba(44,38,69,0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={{
          d: [
            "M 2 8 Q 6 2 10 8 Q 14 2 18 8 Q 22 4 24 8",
            "M 2 6 Q 6 10 10 6 Q 14 10 18 6 Q 22 8 24 6",
            "M 2 8 Q 6 2 10 8 Q 14 2 18 8 Q 22 4 24 8",
          ],
        }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}