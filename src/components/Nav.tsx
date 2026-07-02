import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

import { Moon } from "lucide-react";

import { LAYERS } from "../lib/layers";

import { getMoonPhase } from "../lib/moonPhase";

import { daysTogether } from "../lib/daysTogether";



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

           <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">

       <div

         className="rounded-full px-6 py-2.5 flex items-center gap-4"

         style={{

           background: "rgba(42, 33, 64, 0.45)",

           backdropFilter: "blur(14px) saturate(160%)",

           WebkitBackdropFilter: "blur(14px) saturate(160%)",

           border: "1px solid rgba(255, 246, 229, 0.35)",

           boxShadow:

             "0 4px 20px rgba(44,38,69,0.3), inset 0 1px 0 rgba(255,246,229,0.15)",

         }}

       >

         <Link to="/" className="flex items-center gap-2">

           <Moon size={16} style={{ color: "#FFF6E5" }} />

           <span

             className="font-playful text-xl"

             style={{

               color: "#FFF6E5",

               textShadow: "0 1px 4px rgba(0,0,0,0.4)",

             }}

           >

             chandralok

           </span>

         </Link>

         <span style={{ color: "rgba(255,246,229,0.5)" }} className="text-xs">

           ·

         </span>

         <span

           className="font-hindi text-base"

           style={{

             color: "#FFE0BC",

             textShadow: "0 1px 4px rgba(0,0,0,0.4)",

           }}

         >

           {current.hindi}

         </span>

       </div>

     </nav>



     {/* Bottom left — layer counter + days together */}

        {/* Bottom left — days together */}

     <div className="fixed bottom-6 left-6 z-40">

       <p className="font-playful text-lg" style={{ color: "#FFF6E5", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>

         day {days} · {Math.floor(days / 29.53)} full moons together

       </p>

     </div>



     {/* Bottom right — real moon phase */}

        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">

       <div className="text-right">

         <p className="font-hindi text-base" style={{ color: "#FFF6E5", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>

           {phase.hindi}

         </p>

         <p className="font-playful text-sm" style={{ color: "#FFD6B0" }}>

           {phase.name}

         </p>

       </div>

       <MoonPhaseIcon fraction={phase.fraction} illumination={phase.illumination} />

     </div>

   </>

 );

}



function MoonPhaseIcon({ fraction, illumination }: { fraction: number; illumination: number }) {

 // Render an SVG moon phase visualization

 const waxing = fraction < 0.5;

 const size = 24;

 return (

   <svg width={size} height={size} viewBox="-1 -1 2 2" className="shadow-moon-glow rounded-full">

     {/* dark side */}

     <circle cx="0" cy="0" r="1" fill="#1A1A24" />

     {/* lit portion */}

     <path

       d={crescentPath(illumination, waxing)}

       fill="#E8E8F0"

     />

     {/* highlight */}

     <circle cx="0" cy="0" r="1" fill="none" stroke="rgba(232,232,240,0.25)" strokeWidth="0.05" />

   </svg>

 );

}



function crescentPath(illumination: number, waxing: boolean): string {

 // illumination: 0 (new) → 1 (full)

 // waxing: light on right side; waning: light on left

 if (illumination >= 0.98) return "M-1,0 A1,1 0 1,1 1,0 A1,1 0 1,1 -1,0 Z"; // full

 if (illumination <= 0.02) return "";



 const rx = Math.abs(1 - illumination * 2); // ellipse x-radius for terminator

 const sweep = waxing ? 0 : 1;

 const sweepInner = illumination > 0.5 ? sweep : 1 - sweep;

 return `M 0,-1

         A 1,1 0 0,${sweep} 0,1

         A ${rx},1 0 0,${sweepInner} 0,-1 Z`;

}