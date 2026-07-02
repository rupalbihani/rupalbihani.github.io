import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { ping } from "../lib/telegram";



// Deep obsidian plum with a soft cream halo — reads on both moon and dusk sky

const TEXT_ON_MOON = {

 color: "#2C1F4A",

 textShadow:

   "0 0 24px rgba(255,246,229,0.85), 0 0 48px rgba(255,246,229,0.4), 0 2px 0 rgba(255,246,229,0.5)",

};



const TEXT_ON_SKY = {

 color: "#FFF6E5",

 textShadow: "0 2px 12px rgba(44,38,69,0.7), 0 0 24px rgba(44,38,69,0.4)",

};



export default function Publish() {

 const nav = useNavigate();

 const [progress, setProgress] = useState(0);

 const [stage, setStage] = useState<"arrival" | "question" | "done">("arrival");

 const [showConfetti, setShowConfetti] = useState(false);

 const holdingRef = useRef(false);

 const rafRef = useRef<number | null>(null);

 const startRef = useRef<number>(0);



 useEffect(() => { ping("visit", { layer: "prakashit" }); }, []);



 useEffect(() => {

   if (stage === "arrival") {

     const t = setTimeout(() => setStage("question"), 4200);

     return () => clearTimeout(t);

   }

 }, [stage]);



 const start = () => {

   if (stage !== "question") return;

   holdingRef.current = true;

   startRef.current = Date.now();

   const tick = () => {

     if (!holdingRef.current) return;

     const p = Math.min((Date.now() - startRef.current) / 3000, 1);

     setProgress(p);

     if (p >= 1) {

       confirm();

       return;

     }

     rafRef.current = requestAnimationFrame(tick);

   };

   rafRef.current = requestAnimationFrame(tick);

 };



 const end = () => {

   holdingRef.current = false;

   if (rafRef.current) cancelAnimationFrame(rafRef.current);

   if (stage === "question") setProgress(0);

 };



 const confirm = () => {

   holdingRef.current = false;

   setStage("done");

   setShowConfetti(true);

   ping("publish", {});

 };



 const notYet = () => nav("/pehli-nazar");



 useEffect(() => () => end(), []);



 return (

   <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden ghibli-sky">

     <Stars />

     <Clouds />

     <Petals />



     {/* Giant painted moon backdrop */}

     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

       <motion.div

         initial={{ scale: 0.85, opacity: 0.9 }}

         animate={{

           scale: stage === "done" ? 1.6 : 1,

           opacity: 1,

         }}

         transition={{ duration: 5, ease: [0.4, 0, 0.2, 1] }}

         className="relative"

         style={{ width: "min(70vmin, 560px)", height: "min(70vmin, 560px)" }}

       >

         <PaintedMoon />

       </motion.div>

     </div>



     {showConfetti && <Confetti />}



     <AnimatePresence mode="wait">

       {/* -------- STAGE: ARRIVAL — text right on the moon -------- */}

       {stage === "arrival" && (

         <motion.div

           key="arrival"

           initial={{ opacity: 0 }}

           animate={{ opacity: 1 }}

           exit={{ opacity: 0 }}

           transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}

           className="relative z-10 max-w-lg px-6 text-center"

         >

           <motion.p

             initial={{ opacity: 0, y: 12 }}

             animate={{ opacity: 1, y: 0 }}

             transition={{ duration: 2, delay: 0.6 }}

             className="italic text-2xl md:text-3xl leading-relaxed"

             style={{

               fontFamily: "'Fraunces', serif",

               ...TEXT_ON_MOON,

             }}

           >

             loving you
             <br />
             will always be my privilege.
             <br />

           </motion.p>

           <motion.p

             initial={{ opacity: 0, y: 12 }}

             animate={{ opacity: 1, y: 0 }}

             transition={{ duration: 2, delay: 2 }}

             className="font-playful text-2xl md:text-3xl mt-6"

             style={TEXT_ON_MOON}

           >

             this is just my first attempt.

           </motion.p>

         </motion.div>

       )}



       {/* -------- STAGE: QUESTION -------- */}

       {stage === "question" && (

         <motion.div

           key="question"

           initial={{ opacity: 0, y: 20 }}

           animate={{ opacity: 1, y: 0 }}

           exit={{ opacity: 0, scale: 0.95 }}

           transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}

           className="relative z-10 flex flex-col items-center gap-7 max-w-xl px-6 text-center"

         >

           {/* Main question — floats above the moon in cream */}

           <p

             className="font-hindi text-5xl md:text-7xl leading-tight"

             style={{

               ...TEXT_ON_SKY,

               textShadow:

                 "0 3px 0 rgba(44,38,69,0.5), 0 8px 30px rgba(44,38,69,0.7), 0 0 40px rgba(255,246,229,0.3)",

             }}

           >

             क्या तुम तैयार हो?

           </p>



           {/* Sub-question — sits ON the moon in deep plum */}

           <p

             className="font-playful text-3xl md:text-4xl leading-tight"

             style={TEXT_ON_MOON}

           >

             to walk with me now,

             <br />

             and stay with me

             <br />

             <span className="italic" style={{ fontFamily: "'Fraunces', serif" }}>

               forever.

             </span>

           </p>



           {/* The vow — also on the moon */}

           <p

             className="italic text-lg md:text-xl leading-relaxed max-w-md"

             style={{

               fontFamily: "'Fraunces', serif",

               ...TEXT_ON_MOON,

             }}

           >

             your yes is my green light —

             <br />

             <span

               className="font-playful text-xl md:text-2xl"

               style={{ ...TEXT_ON_MOON }}

             >

               I promise to keep you happy forever.

             </span>

           </p>



           {/* Button */}

           <button

             onMouseDown={start}

             onMouseUp={end}

             onMouseLeave={end}

             onTouchStart={start}

             onTouchEnd={end}

             className="relative rounded-full px-14 py-6 overflow-hidden select-none transition-transform hover:scale-105 active:scale-100 mt-2"

             style={{

               background: "linear-gradient(145deg, #FFFAF0, #F4D6A8)",

               boxShadow:

                 "0 12px 40px rgba(255,214,176,0.6), 0 0 60px rgba(255,246,229,0.5), inset 0 2px 0 rgba(255,255,255,0.8)",

               border: "1.5px solid rgba(139,90,60,0.35)",

             }}

           >

             <span

               className="font-playful text-2xl relative z-10"

               style={{ color: "#3A1A0E", fontWeight: 700 }}

             >

               yes, publish us

             </span>

             <span

               className="absolute inset-0 pointer-events-none"

               style={{

                 background:

                   "linear-gradient(90deg, rgba(200,60,100,0.55), rgba(255,184,204,0.55))",

                 clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,

               }}

             />

           </button>



           <div className="flex flex-col items-center gap-1">

             <p className="font-playful text-lg" style={TEXT_ON_MOON}>

               {progress > 0 && progress < 1 ? "keep holding…" : "hold for 3 seconds"}

             </p>

             <button

               onClick={notYet}

               className="font-playful text-base underline underline-offset-4 hover:opacity-100 transition-opacity mt-1"

               style={TEXT_ON_MOON}

             >

               not yet — let me read again

             </button>

           </div>

         </motion.div>

       )}



       {/* -------- STAGE: DONE -------- */}

       {stage === "done" && (

         <motion.div

           key="done"

           initial={{ opacity: 0, y: 30 }}

           animate={{ opacity: 1, y: 0 }}

           transition={{ duration: 2.4, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}

           className="relative z-10 max-w-2xl px-6 text-center"

         >

                 <motion.p

             initial={{ opacity: 0, letterSpacing: "0.4em" }}

             animate={{ opacity: 1, letterSpacing: "0.02em" }}

             transition={{ duration: 3.5, delay: 1.5 }}

             className="font-hindi text-5xl md:text-7xl leading-tight mb-6"

             style={{

               color: "#2C1F4A",

               fontWeight: 700,

               textShadow:

                 "0 2px 0 rgba(255,246,229,0.8), 0 0 20px rgba(255,246,229,0.7), 0 4px 24px rgba(255,246,229,0.5)",

             }}

           >

             चाँद ने सुन लिया।

           </motion.p>



           {/* Short letter — all Caveat, right on the moon */}

           <motion.div

             initial={{ opacity: 0 }}

             animate={{ opacity: 1 }}

             transition={{ duration: 2.5, delay: 3.5 }}

             className="max-w-xl mx-auto"

           >

             <p

               className="font-playful text-2xl md:text-3xl leading-relaxed"

               style={TEXT_ON_MOON}

             >

               Rupal —

               <br />

               thank you for trusting on us.

               <br />

               <br />

               the moon we shared

               <br />

               across seven thousand miles

               <br />

               just became the moon

               <br />

               over one home.

             </p>



             <p

               className="font-playful text-2xl mt-6"

               style={TEXT_ON_MOON}

             >

               ~ Niraj 🌙

             </p>

           </motion.div>



                 <motion.p

             initial={{ opacity: 0 }}

             animate={{ opacity: 1 }}

             transition={{ duration: 3, delay: 6 }}

             className="mt-10 font-playful text-lg tracking-widest uppercase"

             style={{

               color: "#5B3B72",

               textShadow:

                 "0 1px 0 rgba(255,246,229,0.7), 0 0 16px rgba(255,246,229,0.5)",

             }}

           >

             a message just travelled home

           </motion.p>

         </motion.div>

       )}

     </AnimatePresence>

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

           "radial-gradient(circle, rgba(255,246,229,0.7) 0%, rgba(255,214,176,0.35) 40%, transparent 70%)",

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



/* ---------------- PETALS ---------------- */

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



/* ---------------- CONFETTI ---------------- */

function Confetti() {

 const pieces = Array.from({ length: 40 }, (_, i) => i);

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">

     {pieces.map((i) => {

       const angle = (i / 40) * Math.PI * 2;

       const distance = 30 + (i % 5) * 15;

       const dx = Math.cos(angle) * distance;

       const dy = Math.sin(angle) * distance;

       const delay = (i % 8) * 0.05;

       const symbols = ["✨", "⭐", "🌙", "🌸", "🤍"];

       return (

         <motion.span

           key={i}

           initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}

           animate={{

             x: `${dx}vw`,

             y: `${dy}vh`,

             opacity: [0, 1, 1, 0],

             scale: [0.3, 1.2, 1, 0.7],

             rotate: 360,

           }}

           transition={{ duration: 4, delay, ease: [0.4, 0, 0.2, 1] }}

           className="absolute top-1/2 left-1/2 text-2xl"

         >

           {symbols[i % symbols.length]}

         </motion.span>

       );

     })}

   </div>

 );

}