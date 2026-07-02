import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { ping } from "../lib/telegram";

import { CONFIG } from "../config";



const PLAYLIST_ID = CONFIG.youtubePlaylistId;



export default function AajKaGeet() {

 const nav = useNavigate();

 const [needleDown, setNeedleDown] = useState(false);

 const [shuffle, setShuffle] = useState(false);


 useEffect(() => { ping("visit", { layer: "aaj-ka-geet" }); }, []);



 // needle drops onto the record after 1s (theatrical opening)

 useEffect(() => {

   const t = setTimeout(() => setNeedleDown(true), 1200);

   return () => clearTimeout(t);

 }, []);



 const openPlaylistOnYouTube = () => {

   window.open(`https://music.youtube.com/playlist?list=${PLAYLIST_ID}`, "_blank");

 };



 return (

   <div className="relative min-h-screen overflow-hidden ghibli-sky">

     <Stars />

     <Clouds />

     <MusicNotes />



     <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 pt-24 pb-16">

       {/* Title */}

       <motion.div

         initial={{ opacity: 0, y: -12 }}

         animate={{ opacity: 1, y: 0 }}

         transition={{ duration: 1.6, delay: 0.2 }}

         className="text-center mb-4"

       >

         <h2

           className="font-hindi text-5xl md:text-7xl tracking-tight"

           style={{

             color: "#FFF6E5",

             textShadow: "0 3px 0 rgba(44,38,69,0.35), 0 8px 30px rgba(0,0,0,0.35)",

           }}

         >

           our song of the day

         </h2>

         <p

           className="font-playful text-2xl md:text-3xl mt-2"

           style={{

             color: "#FFE0BC",

             textShadow: "0 2px 8px rgba(44,38,69,0.5)",

           }}

         >

           {/* our song of the day */}

         </p>

       </motion.div>



       {/* Vinyl + needle scene */}

       <motion.div

         initial={{ opacity: 0, scale: 0.85 }}

         animate={{ opacity: 1, scale: 1 }}

         transition={{ duration: 2, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}

         className="relative my-8"

         style={{ width: "min(60vmin, 420px)", height: "min(60vmin, 420px)" }}

       >

              <MoonlightVinyl fast={shuffle} />



         <Needle down={needleDown} />

       </motion.div>



       {/* Playlist embed */}

       <motion.div

         initial={{ opacity: 0, y: 30 }}

         animate={{ opacity: 1, y: 0 }}

         transition={{ duration: 1.8, delay: 1.2 }}

         className="relative w-full max-w-2xl mt-2"

       >

         <div

           className="relative rounded-3xl p-3 overflow-hidden"

           style={{

             background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",

             boxShadow: "0 20px 60px rgba(60,30,20,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",

             border: "2px solid rgba(139,90,60,0.25)",

           }}

         >

                 <div className="rounded-2xl overflow-hidden aspect-video">

             <iframe

               key={shuffle ? "shuffle-on" : "shuffle-off"}

               className="w-full h-full"

               src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&modestbranding=1&rel=0&color=white${shuffle ? "&shuffle=1" : ""}`}

               title="our playlist"

               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"

               allowFullScreen

             />

           </div>

           <p

             className="font-playful text-center mt-3 text-lg"

             style={{ color: "#5B3B1E" }}

           >

  every song holds a feeling we lived together, one ordinary day at a time

           </p>

         </div>



         {/* Butterfly on the corner */}

         <motion.span

           animate={{ x: [0, 8, 0], y: [0, -6, 0], rotate: [0, 15, 0] }}

           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}

           className="absolute -top-3 -right-3 text-3xl"

         >

           🎵

         </motion.span>

       </motion.div>



           {/* Actions */}

       <motion.div

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 2, delay: 1.8 }}

         className="mt-8 flex flex-wrap justify-center gap-3"

       >

         <button

           onClick={() => setShuffle((s) => !s)}

           className="font-playful text-xl px-6 py-2.5 rounded-full transition-all hover:scale-105 flex items-center gap-2"

           style={{

             background: shuffle

               ? "linear-gradient(135deg, #FFE0EC, #FFB8CC)"

               : "linear-gradient(135deg, #FFF6E5, #F4D6A8)",

             border: shuffle

               ? "1.5px solid rgba(200,60,100,0.5)"

               : "1.5px solid rgba(139,90,60,0.35)",

             color: shuffle ? "#7A1F3D" : "#5B3B1E",

             boxShadow: shuffle

               ? "0 6px 20px rgba(200,60,100,0.35), inset 0 2px 6px rgba(200,60,100,0.15)"

               : "0 6px 20px rgba(60,30,20,0.25)",

           }}

         >

           <span className="text-2xl">🔀</span>

           {shuffle ? "shuffle on" : "shuffle off"}

         </button>

         <button

           onClick={openPlaylistOnYouTube}

           className="font-playful text-xl px-6 py-2.5 rounded-full transition-all hover:scale-105"

           style={{

             background: "linear-gradient(135deg, #FFF6E5, #F4D6A8)",

             border: "1.5px solid rgba(139,90,60,0.35)",

             color: "#5B3B1E",

             boxShadow: "0 6px 20px rgba(60,30,20,0.25)",

           }}

         >

           🎼 open in YouTube Music

         </button>

       </motion.div>



       {/* The vow */}

       <motion.blockquote

         initial={{ opacity: 0, y: 20 }}

         animate={{ opacity: 1, y: 0 }}

         transition={{ duration: 2.4, delay: 2.4 }}

         className="mt-10 max-w-2xl text-center px-6"

       >

         <p

           className="italic text-xl md:text-2xl leading-relaxed"

           style={{

             color: "#FFF6E5",

             fontFamily: "'Fraunces', serif",

             textShadow: "0 2px 8px rgba(44,38,69,0.4)",

           }}

         >

           &ldquo;every song we add is a little chapter

           <br className="hidden md:block" />

           in a story only we&rsquo;re writing.&rdquo;

         </p>

         <p

           className="font-hindi text-xl mt-4 tracking-wide"

           style={{

             color: "#FFF6E5",

             textShadow: "0 2px 8px rgba(44,38,69,0.6), 0 0 20px rgba(0,0,0,0.4)",

           }}

         >

           {/* ~ हमारी अपनी धुनें */}

         </p>

       </motion.blockquote>



       {/* Portal */}

       <motion.button

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 2, delay: 3 }}

         onClick={() => nav("/shayari")}

         className="mt-10 group relative"

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

           fall deeper →

         </p>

       </motion.button>

     </div>

   </div>

 );

}



/* ---------------- MOONLIGHT VINYL ---------------- */


function MoonlightVinyl({ fast = false }: { fast?: boolean }) {

 return (

   <motion.div

     animate={{ rotate: 360 }}

     transition={{ duration: fast ? 8 : 24, repeat: Infinity, ease: "linear" }}

     className="relative w-full h-full rounded-full"

   >

     {/* Halo */}

     <div

       className="absolute inset-0 rounded-full"

       style={{

         background:

           "radial-gradient(circle, rgba(255,246,229,0.55) 0%, rgba(255,214,176,0.25) 40%, transparent 70%)",

         filter: "blur(30px)",

         transform: "scale(1.4)",

       }}

     />



     <svg viewBox="0 0 400 400" className="relative w-full h-full">

       <defs>

         <radialGradient id="vinyl" cx="50%" cy="50%" r="50%">

           <stop offset="0%"  stopColor="#FFF6E5" />

           <stop offset="12%" stopColor="#FFB8CC" />

           <stop offset="14%" stopColor="#3E2A5A" />

           <stop offset="70%" stopColor="#2C2645" />

           <stop offset="100%" stopColor="#1A1230" />

         </radialGradient>

         <radialGradient id="vinylShine" cx="30%" cy="30%" r="70%">

           <stop offset="0%" stopColor="rgba(255,246,229,0.35)" />

           <stop offset="60%" stopColor="transparent" />

         </radialGradient>

         <radialGradient id="labelGrad" cx="50%" cy="50%" r="50%">

           <stop offset="0%" stopColor="#FFF6E5" />

           <stop offset="70%" stopColor="#F4D6A8" />

           <stop offset="100%" stopColor="#C88A5C" />

         </radialGradient>

       </defs>



       {/* Outer disc */}

       <circle cx="200" cy="200" r="196" fill="url(#vinyl)" />

       <circle cx="200" cy="200" r="196" fill="url(#vinylShine)" />



       {/* Concentric grooves */}

       {[186, 174, 162, 150, 138, 126, 114, 102].map((r) => (

         <circle key={r} cx="200" cy="200" r={r}

           fill="none" stroke="rgba(255,246,229,0.06)" strokeWidth="1" />

       ))}



       {/* Center label */}

       <circle cx="200" cy="200" r="72" fill="url(#labelGrad)" />

       <circle cx="200" cy="200" r="72" fill="none"

         stroke="rgba(139,90,60,0.4)" strokeWidth="1.5" />



       {/* Label text */}

       <text

         x="200" y="188"

         textAnchor="middle"

         style={{

           fontFamily: "'Kalam', 'Tiro Devanagari Hindi', serif",

           fontSize: "22px",

           fontWeight: 700,

           fill: "#5B3B1E",

         }}

       >

         चाँदनी

       </text>

       <text

         x="200" y="212"

         textAnchor="middle"

         style={{

           fontFamily: "'Caveat', cursive",

           fontSize: "18px",

           fontWeight: 700,

           fill: "#8B5A3C",

         }}

       >

         side A

       </text>

       <text

         x="200" y="232"

         textAnchor="middle"

         style={{

           fontFamily: "'Caveat', cursive",

           fontSize: "13px",

           fill: "#8B5A3C",

         }}

       >

         Toronto ↔ Jaipur

       </text>



       {/* Spindle hole */}

       <circle cx="200" cy="200" r="7" fill="#0A0A0F" />

       <circle cx="200" cy="200" r="3" fill="#FFF6E5" />

     </svg>

   </motion.div>

 );

}



/* ---------------- NEEDLE ---------------- */

function Needle({ down }: { down: boolean }) {

 return (

   <motion.div

     initial={{ rotate: -30 }}

     animate={{ rotate: down ? -8 : -30 }}

     transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}

     className="absolute pointer-events-none"

     style={{

       top: "-8%",

       right: "-6%",

       width: "60%",

       height: "60%",

       transformOrigin: "top right",

     }}

   >

     <svg viewBox="0 0 200 200" className="w-full h-full">

       <defs>

         <linearGradient id="tonearm" x1="0" y1="0" x2="1" y2="1">

           <stop offset="0%" stopColor="#E8E8F0" />

           <stop offset="50%" stopColor="#C0C0C8" />

           <stop offset="100%" stopColor="#8A8A96" />

         </linearGradient>

       </defs>

       {/* Base pivot */}

       <circle cx="180" cy="20" r="14" fill="url(#tonearm)" stroke="#5B3B1E" strokeWidth="1" />

       <circle cx="180" cy="20" r="6" fill="#5B3B1E" />

       {/* Arm */}

       <rect

         x="70" y="16"

         width="115" height="8"

         rx="4"

         fill="url(#tonearm)"

         stroke="rgba(60,30,20,0.35)"

         strokeWidth="0.5"

       />

       {/* Cartridge head */}

       <rect x="60" y="10" width="18" height="22" rx="3" fill="#5B3B1E" />

       {/* Needle */}

       <line x1="66" y1="32" x2="66" y2="42" stroke="#FFF6E5" strokeWidth="1.5" />

     </svg>

   </motion.div>

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



/* ---------------- MUSIC NOTES DRIFTING ---------------- */

function MusicNotes() {

 const notes = Array.from({ length: 14 }, (_, i) => i);

 const symbols = ["🎵", "🎶", "♪", "♫", "✨"];

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {notes.map((i) => {

       const startX = (i * 41) % 100;

       const delay = (i % 6) * 3;

       const duration = 20 + (i % 5) * 4;

       const drift = (i % 2 ? 1 : -1) * 15;

       return (

         <motion.span

           key={i}

           initial={{ y: "110vh", x: startX + "vw", rotate: 0, opacity: 0 }}

           animate={{

             y: "-10vh",

             x: "calc(" + startX + "vw + " + drift + "vw)",

             rotate: (i % 2 ? 360 : -360),

             opacity: [0, 0.7, 0.7, 0],

           }}

           transition={{ duration, repeat: Infinity, delay, ease: "linear" }}

           className="absolute text-xl"

           style={{

             color: i % 3 === 0 ? "#FFF6E5" : i % 3 === 1 ? "#FFB8CC" : "#FFE0BC",

             textShadow: "0 2px 6px rgba(44,38,69,0.35)",

           }}

         >

           {symbols[i % symbols.length]}

         </motion.span>

       );

     })}

   </div>

 );

}