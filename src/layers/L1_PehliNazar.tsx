import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { ping } from "../lib/telegram";



const TIMELINE = [

 { date: "9 May", note: "an Interest sent" },

 { date: "10 May", note: "an Interest accepted" },

 { date: "13 May", note: "the first message" },

 { date: "14 May", note: "the conversation came home" },

];



const NIRAJ_IMG = "/images/ghibli/niraj.png";

const RUPAL_IMG = "/images/ghibli/rupal.png";

const CHAT_IMG = "/images/ghibli/chat.png";



export default function PehliNazar() {

 const nav = useNavigate();

 const [openScroll, setOpenScroll] = useState(false);

 const [mouse, setMouse] = useState({ x: 0, y: 0 });



 useEffect(() => { ping("visit", { layer: "pehli-nazar" }); }, []);



 const onMouseMove = (e: React.MouseEvent) => {

   const nx = (e.clientX / window.innerWidth - 0.5) * 2;

   const ny = (e.clientY / window.innerHeight - 0.5) * 2;

   setMouse({ x: nx, y: ny });

 };



 return (

   <div

     onMouseMove={onMouseMove}

     className="relative min-h-screen overflow-hidden ghibli-sky"

   >

     <Clouds />

     <Fireflies />

     <Petals />



     <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 pt-28 pb-16">

       <motion.div

         initial={{ opacity: 0, y: -12 }}

         animate={{ opacity: 1, y: 0 }}

         transition={{ duration: 1.6, delay: 0.2 }}

         className="text-center mb-6"

       >

         <h2

           className="font-hindi text-6xl md:text-8xl tracking-tight"

           style={{

             color: "#FFF6E5",

             textShadow: "0 3px 0 rgba(44,38,69,0.35), 0 8px 30px rgba(0,0,0,0.35)",

           }}

         >

           पहली नज़र

         </h2>

         <p

           className="font-playful text-3xl md:text-4xl mt-2"

           style={{

             color: "#FFE0BC",

             textShadow: "0 2px 8px rgba(44,38,69,0.5)",

           }}

         >

           the first glance

         </p>

       </motion.div>



       <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-6 md:gap-8 items-center mt-6">

         <Character

           imgUrl={NIRAJ_IMG}

           label="Cuttuuu"

           sublabel="Toronto · her moon"

           side="left"

           delay={0.7}

           mouseX={mouse.x}

         />



         <motion.button

           onClick={() => setOpenScroll(true)}

           initial={{ opacity: 0, y: 40, rotateX: 20 }}

           animate={{

             opacity: 1,

             y: 0,

             rotateX: mouse.y * -4,

             rotateY: mouse.x * 4,

           }}

           transition={{ duration: 1.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}

           whileHover={{ scale: 1.03 }}

           whileTap={{ scale: 0.98 }}

           className="relative group cursor-zoom-in mx-auto"

           style={{ transformStyle: "preserve-3d", perspective: 1000 }}

         >

           <div

             className="absolute -inset-4 rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity"

             style={{

               background: "radial-gradient(ellipse, rgba(255,214,176,0.6), transparent 70%)",

               filter: "blur(20px)",

             }}

           />

           <div

             className="relative rounded-2xl p-2 pb-4 overflow-hidden"

             style={{

               background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",

               boxShadow: "0 20px 60px rgba(60,30,20,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",

               border: "2px solid rgba(139,90,60,0.15)",

             }}

           >

             <div

               className="w-[240px] md:w-[300px] rounded-lg block bg-center bg-cover"

               style={{

                 backgroundImage: `url(${CHAT_IMG})`,

                 aspectRatio: "9 / 16",

               }}

             />

             <p

               className="font-playful text-center mt-2 text-lg"

               style={{ color: "#5B3B1E" }}

             >

               our lifeline - maheshwari.org · मई 2026

             </p>

           </div>

           <motion.span

             animate={{ x: [0, 8, 0], y: [0, -6, 0], rotate: [0, 15, 0] }}

             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}

             className="absolute -top-4 -right-4 text-3xl"

           >

             🦋

           </motion.span>

         </motion.button>



         <Character

           imgUrl={RUPAL_IMG}

           label="Chikkuuuu"

           sublabel="Jaipur · my moon"

           side="right"

           delay={1.1}

           mouseX={mouse.x}

           heartTag

         />

       </div>



       <motion.div

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 2, delay: 1.8 }}

         className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl px-4"

       >

         {TIMELINE.map((t, i) => (

           <motion.div

             key={i}

             initial={{ opacity: 0, y: 10 }}

             animate={{ opacity: 1, y: 0 }}

             transition={{ duration: 0.8, delay: 2 + i * 0.15 }}

             className="px-4 py-2 rounded-full"

             style={{

               background: "linear-gradient(135deg, #FFF6E5, #F4D6A8)",

               boxShadow: "0 4px 12px rgba(60,30,20,0.15)",

               border: "1.5px solid rgba(139,90,60,0.35)",

               transform: `rotate(${-3 + (i % 2) * 6}deg)`,

             }}

           >

             <span

               className="font-playful text-xl"

               style={{ color: "#5B3B1E" }}

             >

               <b>{t.date}</b> — {t.note}

             </span>

           </motion.div>

         ))}

       </motion.div>



       <motion.blockquote

         initial={{ opacity: 0, y: 20 }}

         animate={{ opacity: 1, y: 0 }}

         transition={{ duration: 2.4, delay: 2.8 }}

         className="mt-12 max-w-2xl text-center px-6"

       >

         <p

           className="italic text-xl md:text-3xl leading-relaxed"

           style={{

             color: "#FFF6E5",

             fontFamily: "'Fraunces', serif",

             textShadow: "0 2px 8px rgba(44,38,69,0.4)",

           }}

         >

           &ldquo;went through your profile after we connected here

           <br className="hidden md:block" />

           and found a few similarities…&rdquo;

         </p>

         <p

           className="font-hindi text-2xl mt-4 tracking-wide"

           style={{

             color: "#FFF6E5",

             textShadow: "0 2px 8px rgba(44,38,69,0.6), 0 0 20px rgba(0,0,0,0.4)",

           }}

         >

           ~ the line which started it all ...

         </p>

       </motion.blockquote>



       <motion.button

         initial={{ opacity: 0 }}

         animate={{ opacity: 1 }}

         transition={{ duration: 2, delay: 3.6 }}

         onClick={() => nav("/do-sheher")}

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

           fall deeper →

         </p>

       </motion.button>

     </div>



     {openScroll && <Lightbox onClose={() => setOpenScroll(false)} />}

   </div>

 );

}



type CharacterProps = {

 imgUrl: string;

 label: string;

 sublabel: string;

 side: "left" | "right";

 delay: number;

 mouseX: number;

 heartTag?: boolean;

};



function Character(props: CharacterProps) {

 const { imgUrl, label, sublabel, side, delay, mouseX, heartTag } = props;

 const dir = side === "left" ? -1 : 1;

 const glowBg = side === "left"

   ? "radial-gradient(circle, rgba(255,180,140,0.5), transparent 70%)"

   : "radial-gradient(circle, rgba(255,182,193,0.55), transparent 70%)";



 const alignClass = side === "left" ? "md:items-end" : "md:items-start";



 return (

   <motion.div

     initial={{ opacity: 0, y: 30, x: dir * 30 }}

     animate={{ opacity: 1, y: 0, x: mouseX * -8 * dir }}

     transition={{ duration: 1.8, delay, ease: [0.4, 0, 0.2, 1] }}

     className={"flex flex-col items-center " + alignClass}

   >

     <motion.div

       animate={{ y: [0, -10, 0] }}

       transition={{

         duration: 6,

         repeat: Infinity,

         ease: "easeInOut",

         delay: side === "left" ? 0 : 1.5,

       }}

       className="relative"

     >

       <div

         className="absolute inset-0 rounded-full"

         style={{

           background: glowBg,

           filter: "blur(30px)",

           transform: "scale(1.1)",

         }}

       />

       <div

         className="relative w-[180px] md:w-[220px] rounded-2xl select-none bg-center bg-cover"

         style={{

           backgroundImage: `url(${imgUrl})`,

           aspectRatio: "3 / 4",

           filter: "drop-shadow(0 12px 24px rgba(60,30,20,0.35))",

         }}

       />

     </motion.div>



     <div className="relative -mt-2">

       {heartTag ? (

         <div

           className="px-4 py-1.5 flex items-center gap-2"

           style={{

             background: "linear-gradient(135deg, #FFE0EC, #FFB8CC)",

             borderRadius: "999px",

             boxShadow: "0 4px 12px rgba(200,60,100,0.25)",

             border: "1.5px solid rgba(200,60,100,0.5)",

           }}

         >

           <span>🌸</span>

           <span className="font-hindi text-xl" style={{ color: "#7A1F3D", fontWeight: 700 }}>

             {label}

           </span>

         </div>

       ) : (

         <div

           className="px-4 py-1.5"

           style={{

             background: "linear-gradient(135deg, #FFF6E5, #F4D6A8)",

             borderRadius: "999px",

             boxShadow: "0 4px 12px rgba(139,90,60,0.25)",

             border: "1.5px solid rgba(139,90,60,0.5)",

           }}

         >

           <span className="font-hindi text-xl" style={{ color: "#4A2E10", fontWeight: 700 }}>

             {label}

           </span>

         </div>

       )}

       <p

         className="font-playful text-center text-lg mt-1"

         style={{

           color: "#FFF6E5",

           textShadow: "0 2px 6px rgba(44,38,69,0.5)",

         }}

       >

         {sublabel}

       </p>

     </div>

   </motion.div>

 );

}



function Lightbox({ onClose }: { onClose: () => void }) {

 return (

   <motion.div

     initial={{ opacity: 0 }}

     animate={{ opacity: 1 }}

     exit={{ opacity: 0 }}

     onClick={onClose}

     className="fixed inset-0 z-[80] flex items-center justify-center p-6 cursor-zoom-out backdrop-blur-md"

     style={{ background: "rgba(44,38,69,0.85)" }}

   >

     <div

       className="max-w-full max-h-full rounded-2xl bg-center bg-contain bg-no-repeat"

       style={{

         backgroundImage: `url(${CHAT_IMG})`,

         width: "min(90vw, 500px)",

         height: "min(90vh, 900px)",

         boxShadow: "0 30px 80px rgba(0,0,0,0.5)",

       }}

     />

     <p

       className="absolute bottom-8 font-playful text-2xl"

       style={{ color: "#FFF6E5" }}

     >

       click anywhere to close

     </p>

   </motion.div>

 );

}



function Clouds() {

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {[0, 1, 2].map((i) => (

       <motion.div

         key={i}

         animate={{ x: ["-10%", "110%"] }}

         transition={{ duration: 80 + i * 30, repeat: Infinity, ease: "linear", delay: i * -20 }}

         className="absolute rounded-full"

         style={{

           top: (15 + i * 8) + "%",

           width: (200 + i * 80) + "px",

           height: (60 + i * 15) + "px",

           background: "radial-gradient(ellipse, rgba(255,246,229,0.5), transparent 70%)",

           filter: "blur(20px)",

         }}

       />

     ))}

   </div>

 );

}



function Fireflies() {

 const flies = Array.from({ length: 20 }, (_, i) => i);

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {flies.map((i) => {

       const x = (i * 53) % 100;

       const y = 30 + ((i * 37) % 60);

       const delay = (i % 8) * 0.7;

       return (

         <motion.span

           key={i}

           animate={{

             y: [0, -30, 0],

             opacity: [0.3, 1, 0.3],

             scale: [1, 1.4, 1],

           }}

           transition={{ duration: 4 + (i % 3), repeat: Infinity, delay, ease: "easeInOut" }}

           className="absolute rounded-full"

           style={{

             top: y + "%",

             left: x + "%",

             width: 4,

             height: 4,

             background: "radial-gradient(circle, #FFF3B0, transparent 70%)",

             boxShadow: "0 0 8px rgba(255,220,120,0.8)",

           }}

         />

       );

     })}

   </div>

 );

}



function Petals() {

 const petals = Array.from({ length: 12 }, (_, i) => i);

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {petals.map((i) => {

       const startX = (i * 41) % 100;

       const delay = (i % 6) * 3;

       const duration = 18 + (i % 5) * 4;

       return (

         <motion.span

           key={i}

           initial={{ y: -20, x: startX + "vw", rotate: 0, opacity: 0 }}

           animate={{

             y: "110vh",

             x: "calc(" + startX + "vw + " + ((i % 2 ? 1 : -1) * 20) + "vw)",

             rotate: 360,

             opacity: [0, 0.9, 0.9, 0],

           }}

           transition={{ duration, repeat: Infinity, delay, ease: "linear" }}

           className="absolute text-lg"

         >

           {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "🍃" : "✨"}

         </motion.span>

       );

     })}

   </div>

 );

}