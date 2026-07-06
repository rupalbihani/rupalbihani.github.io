import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { LAYERS } from "../lib/layers";
import { getMoonPhase } from "../lib/moonPhase";
import { daysTogether } from "../lib/daysTogether";

function poeticDayLine(days: number): string {
  const moons = Math.floor(days / 29.53);
  const weeks = Math.floor(days / 7);
  const options = [
    `day ${days} · ${moons} moons`,
    `${weeks} weeks of waiting`,
    `${days} sunrises, one heart`,
    `${moons} full moons shared`,
    `${days} days closer to home`,
  ];
  const hour = new Date().getHours();
  return options[hour % options.length];
}

export function Nav() {
  const { pathname } = useLocation();
  const current = LAYERS.find((l) => l.path === pathname) ?? LAYERS[0];

  const [phase, setPhase] = useState(getMoonPhase());
  const [days, setDays] = useState(daysTogether());

  useEffect(() => {
    const i = setInterval(() => {
      setPhase(getMoonPhase());
      setDays(daysTogether());
    }, 60_000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* Top center pill */}
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-40 px-3 max-w-[calc(100%-16px)]">
        <div
          className="rounded-full px-3 md:px-6 py-1.5 md:py-2.5 flex items-center gap-2 md:gap-4"
          style={{
            background: "rgba(42, 33, 64, 0.5)",
            backdropFilter: "blur(14px) saturate(160%)",
            WebkitBackdropFilter: "blur(14px) saturate(160%)",
            border: "1px solid rgba(255, 246, 229, 0.35)",
            boxShadow:
              "0 4px 20px rgba(44,38,69,0.3), inset 0 1px 0 rgba(255,246,229,0.15)",
          }}
        >
          <Link to="/" className="flex items-center gap-1.5 md:gap-2">
            <Moon size={14} style={{ color: "#FFF6E5" }} />
            <span
              className="font-playful text-base md:text-xl whitespace-nowrap"
              style={{
                color: "#FFF6E5",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              chandralok
            </span>
          </Link>
          <span
            style={{ color: "rgba(255,246,229,0.5)" }}
            className="text-xs hidden sm:inline"
          >
            ·
          </span>
          <span
            className="font-hindi text-sm md:text-base hidden sm:inline whitespace-nowrap"
            style={{
              color: "#FFE0BC",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {current.hindi}
          </span>
        </div>
      </nav>

      {/* Bottom left — days together */}
      <div className="fixed bottom-3 left-3 z-40 max-w-[45vw] md:max-w-[280px]">
        <p
          className="font-playful text-xs sm:text-sm md:text-lg leading-tight"
          style={{
            color: "#FFF6E5",
            textShadow: "0 2px 6px rgba(0,0,0,0.4)",
          }}
        >
          {poeticDayLine(days)}
        </p>
      </div>

      {/* Bottom right — moon phase */}
      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-1.5 md:gap-3">
        <div className="text-right">
          <p
            className="font-hindi text-xs sm:text-sm md:text-base"
            style={{
              color: "#4A2E10",
              fontWeight: 700,
              textShadow: "0 1px 0 rgba(255,246,229,0.6), 0 0 12px rgba(255,246,229,0.5)",
            }}
          >
            {phase.hindi}
          </p>
          
          <p
            className="font-playful text-xs hidden sm:block"
            style={{
              color: "#4A2E10",
              fontWeight: 700,
              textShadow: "0 1px 0 rgba(255,246,229,0.6)",
            }}
          >
            {phase.name}
          </p>

        </div>
        <MoonPhaseIcon
          fraction={phase.fraction}
          illumination={phase.illumination}
        />
      </div>
    </>
  );
}

function MoonPhaseIcon({
  fraction,
  illumination,
}: {
  fraction: number;
  illumination: number;
}) {
  const waxing = fraction < 0.5;
  const size = 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-1 -1 2 2"
      className="shadow-moon-glow rounded-full"
    >
      <circle cx="0" cy="0" r="1" fill="#1A1A24" />
      <path d={crescentPath(illumination, waxing)} fill="#E8E8F0" />
      <circle
        cx="0"
        cy="0"
        r="1"
        fill="none"
        stroke="rgba(232,232,240,0.25)"
        strokeWidth="0.05"
      />
    </svg>
  );
}

function crescentPath(illumination: number, waxing: boolean): string {
  if (illumination >= 0.98)
    return "M-1,0 A1,1 0 1,1 1,0 A1,1 0 1,1 -1,0 Z";
  if (illumination <= 0.02) return "";

  const rx = Math.abs(1 - illumination * 2);
  const sweep = waxing ? 0 : 1;
  const sweepInner = illumination > 0.5 ? sweep : 1 - sweep;

  return `M 0,-1
          A 1,1 0 0,${sweep} 0,1
          A ${rx},1 0 0,${sweepInner} 0,-1 Z`;
}