import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { ping } from "../lib/telegram";

import shayariData from "../data/shayari.json";



type Shayari = {

 id: number;

 date: string;

 title: string;

 hindi: string;

 roman?: string;

 english?: string;

};



const POEMS = shayariData as Shayari[];



export default function Shayari() {

 const nav = useNavigate();

 const [open, setOpen] = useState<Shayari | null>(null);



 useEffect(() => { ping("visit", { layer: "shayari" }); }, []);



 const openPoem = (p: Shayari) => {

   setOpen(p);

   ping("poem", { title: p.title });

 };



 return (

   <div className="relative min-h-screen overflow-hidden ghibli-sky">

     <Stars twinkleCount={40} />

     <Clouds />

     <FallingInk />



     <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 pt-24 pb-16">

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

           शायरी की चाँदनी

         </h2>

         <p

           className="font-playful text-2xl md:text-3xl mt-2"

           style={{

             color: "#FFE0BC",

             textShadow: "0 2px 8px rgba(44,38,69,0.5)",

           }}

         >

           verses written under moonlight

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

           fontSize: "1.1rem",

           textShadow: "0 2px 8px rgba(44,38,69,0.4)",

         }}

       >

         a scrapbook of everything I couldn&rsquo;t say out loud —

         <br />

         <span className="font-hindi">click a page to hear it whispered</span>

       </motion.p>



       <motion.div

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 1.6, delay: 1 }}

         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full"

       >

         {POEMS.map((p, i) => (

           <PoemCard key={p.id} poem={p} index={i} onOpen={() => openPoem(p)} />

         ))}

         <ComingSoonCard index={POEMS.length} />

       </motion.div>



       <motion.p

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 2, delay: 1.6 }}

         className="font-playful text-xl mt-10"

         style={{

           color: "#FFE0BC",

           textShadow: "0 2px 6px rgba(44,38,69,0.4)",

         }}

       >

         {POEMS.length} {POEMS.length === 1 ? "verse" : "verses"} · मेरी क़लम, तेरे नाम

       </motion.p>



       <motion.button

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 2, delay: 2.2 }}

         onClick={() => nav("/mann")}

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



     <AnimatePresence>

       {open && (

         <PoemLightbox poem={open} onClose={() => setOpen(null)} />

       )}

     </AnimatePresence>

   </div>

 );

}



function PoemCard({ poem, index, onOpen }: {

 poem: Shayari; index: number; onOpen: () => void;

}) {

 const rotate = -3 + (index % 3) * 3;

 return (

   <motion.button

     initial={{ opacity: 0, y: 20, rotate: rotate * 2 }}

     animate={{ opacity: 1, y: 0, rotate }}

     transition={{ duration: 1.2, delay: 1.2 + index * 0.15 }}

     whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}

     whileTap={{ scale: 0.98 }}

     onClick={onOpen}

     className="relative text-left group"

     style={{

       background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",

       borderRadius: "12px",

       padding: "18px 20px 22px 20px",

       boxShadow: "0 12px 30px rgba(60,30,20,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",

       border: "1.5px solid rgba(139,90,60,0.25)",

     }}

   >

     <div

       className="absolute -top-2 left-4 h-4 w-16 opacity-70 rotate-[-6deg]"

       style={{

         background: "linear-gradient(135deg, rgba(255,214,176,0.7), rgba(255,246,229,0.5))",

         border: "1px solid rgba(139,90,60,0.15)",

       }}

     />



     <p className="font-playful text-sm" style={{ color: "#8B5A3C" }}>

       {poem.date}

     </p>

     <h3

       className="font-hindi text-2xl md:text-3xl mt-1 leading-tight"

       style={{ color: "#4A2E10", fontWeight: 700 }}

     >

       {poem.title}

     </h3>

     <p

       className="mt-4 italic leading-relaxed text-base"

       style={{

         color: "#5B3B1E",

         fontFamily: "'Fraunces', serif",

         display: "-webkit-box",

         WebkitLineClamp: 3,

         WebkitBoxOrient: "vertical",

         overflow: "hidden",

       }}

     >

       {poem.hindi.split("\n")[0]}…

     </p>

     <p className="font-playful text-lg mt-4" style={{ color: "#7A1F3D" }}>

       read the whole thing →

     </p>

   </motion.button>

 );

}



function ComingSoonCard({ index }: { index: number }) {

 const rotate = -3 + (index % 3) * 3;

 return (

   <motion.div

     initial={{ opacity: 0, y: 20, rotate: rotate * 2 }}

     animate={{ opacity: 1, y: 0, rotate }}

     transition={{ duration: 1.2, delay: 1.2 + index * 0.15 }}

     className="relative flex flex-col items-center justify-center text-center"

     style={{

       background: "rgba(255,246,229,0.15)",

       borderRadius: "12px",

       padding: "40px 20px",

       border: "2px dashed rgba(255,246,229,0.5)",

       minHeight: "220px",

     }}

   >

     <span className="text-4xl mb-3">🌸</span>

     <p

       className="font-playful text-2xl"

       style={{

         color: "#FFF6E5",

         textShadow: "0 2px 6px rgba(44,38,69,0.4)",

       }}

     >

       more coming

     </p>

     <p

       className="font-hindi text-sm mt-2"

       style={{

         color: "#FFD6B0",

         textShadow: "0 2px 6px rgba(44,38,69,0.4)",

       }}

     >

       जब भी लिखूँगा, यहाँ जोड़ता जाऊँगा

     </p>

   </motion.div>

 );

}



function PoemLightbox({ poem, onClose }: {

 poem: Shayari; onClose: () => void;

}) {

 const stanzas = poem.hindi.split(/\n\n+/);

 const romanStanzas = poem.roman ? poem.roman.split(/\n\n+/) : [];

 const englishStanzas = poem.english ? poem.english.split(/\n\n+/) : [];

 const [showRoman, setShowRoman] = useState(false);

 const [showEnglish, setShowEnglish] = useState(false);



 return (

   <motion.div

     initial={{ opacity: 0 }}

     animate={{ opacity: 1 }}

     exit={{ opacity: 0 }}

     onClick={onClose}

     className="fixed inset-0 z-[80] flex items-start justify-center p-4 md:p-8 cursor-zoom-out backdrop-blur-md overflow-y-auto"

     style={{ background: "rgba(44,38,69,0.88)" }}

   >

     <motion.div

       initial={{ scale: 0.9, y: 20 }}

       animate={{ scale: 1, y: 0 }}

       exit={{ scale: 0.9, y: 20 }}

       transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}

       onClick={(e) => e.stopPropagation()}

       className="relative max-w-3xl w-full my-8 cursor-default"

       style={{

         background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",

         borderRadius: "16px",

         padding: "40px 32px 32px 32px",

         boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",

         border: "2px solid rgba(139,90,60,0.35)",

       }}

     >

       <div

         className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"

         style={{ background: "linear-gradient(90deg, transparent, rgba(139,90,60,0.6), transparent)" }}

       />



       <div className="text-center">

         <p className="font-playful text-lg" style={{ color: "#8B5A3C" }}>

           {poem.date}

         </p>

         <h3

           className="font-hindi text-4xl md:text-5xl mt-1 leading-tight"

           style={{ color: "#4A2E10", fontWeight: 700 }}

         >

           {poem.title}

         </h3>

       </div>



       <div className="w-full h-px my-6" style={{ background: "rgba(139,90,60,0.3)" }} />



       <div className="space-y-6">

         {stanzas.map((stanza, i) => (

           <motion.p

             key={i}

             initial={{ opacity: 0, y: 12 }}

             animate={{ opacity: 1, y: 0 }}

             transition={{ duration: 1.2, delay: 0.4 + i * 0.5, ease: [0.4, 0, 0.2, 1] }}

             className="font-hindi text-xl md:text-2xl leading-relaxed whitespace-pre-line text-center"

             style={{ color: "#2C2645", fontWeight: 500 }}

           >

             {stanza}

           </motion.p>

         ))}

       </div>



       {(poem.roman || poem.english) && (

         <div className="flex flex-wrap justify-center gap-3 mt-8">

           {poem.roman && (

             <button

               onClick={() => setShowRoman((v) => !v)}

               className="font-playful text-lg px-4 py-1.5 rounded-full transition-all hover:scale-105"

               style={{

                 background: showRoman

                   ? "linear-gradient(135deg, #FFE0EC, #FFB8CC)"

                   : "rgba(139,90,60,0.1)",

                 border: "1.5px solid rgba(139,90,60,0.35)",

                 color: showRoman ? "#7A1F3D" : "#8B5A3C",

               }}

             >

               {showRoman ? "hide" : "show"} roman

             </button>

           )}

           {poem.english && (

             <button

               onClick={() => setShowEnglish((v) => !v)}

               className="font-playful text-lg px-4 py-1.5 rounded-full transition-all hover:scale-105"

               style={{

                 background: showEnglish

                   ? "linear-gradient(135deg, #FFE0EC, #FFB8CC)"

                   : "rgba(139,90,60,0.1)",

                 border: "1.5px solid rgba(139,90,60,0.35)",

                 color: showEnglish ? "#7A1F3D" : "#8B5A3C",

               }}

             >

               {showEnglish ? "hide" : "show"} english

             </button>

           )}

         </div>

       )}



       <AnimatePresence>

         {showRoman && (

           <motion.div

             initial={{ opacity: 0, height: 0 }}

             animate={{ opacity: 1, height: "auto" }}

             exit={{ opacity: 0, height: 0 }}

             transition={{ duration: 0.5 }}

             className="overflow-hidden"

           >

             <div className="w-full h-px my-6" style={{ background: "rgba(139,90,60,0.3)" }} />

             <div className="space-y-4">

               {romanStanzas.map((s, i) => (

                 <p

                   key={i}

                   className="italic text-base leading-relaxed whitespace-pre-line text-center"

                   style={{ color: "#8B5A3C", fontFamily: "'Fraunces', serif" }}

                 >

                   {s}

                 </p>

               ))}

             </div>

           </motion.div>

         )}

       </AnimatePresence>



       <AnimatePresence>

         {showEnglish && (

           <motion.div

             initial={{ opacity: 0, height: 0 }}

             animate={{ opacity: 1, height: "auto" }}

             exit={{ opacity: 0, height: 0 }}

             transition={{ duration: 0.5 }}

             className="overflow-hidden"

           >

             <div className="w-full h-px my-6" style={{ background: "rgba(139,90,60,0.3)" }} />

             <div className="space-y-4">

               {englishStanzas.map((s, i) => (

                 <p

                   key={i}

                   className="font-playful text-lg md:text-xl leading-relaxed whitespace-pre-line text-center"

                   style={{ color: "#5B3B72" }}

                 >

                   {s}

                 </p>

               ))}

             </div>

           </motion.div>

         )}

       </AnimatePresence>



       <div className="w-full h-px mt-8 mb-4" style={{ background: "rgba(139,90,60,0.3)" }} />



       <p className="font-playful text-lg text-center" style={{ color: "#8B5A3C" }}>

         ~ निराज · for चीकू 🌸

       </p>



       <div

         className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px"

         style={{ background: "linear-gradient(90deg, transparent, rgba(139,90,60,0.6), transparent)" }}

       />

     </motion.div>



     <p

       className="fixed bottom-6 left-1/2 -translate-x-1/2 font-playful text-xl pointer-events-none"

       style={{ color: "#FFF6E5", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}

     >

       click outside to close

     </p>

   </motion.div>

 );

}



function Stars({ twinkleCount }: { twinkleCount: number }) {

 const stars = Array.from({ length: twinkleCount }, (_, i) => i);

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



function FallingInk() {

 const drops = Array.from({ length: 10 }, (_, i) => i);

 const symbols = ["✒️", "📜", "🌸", "✨", "🪶"];

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {drops.map((i) => {

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

             opacity: [0, 0.8, 0.8, 0],

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