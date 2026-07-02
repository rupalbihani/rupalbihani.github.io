import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { CONFIG } from "../config";

import { ping } from "../lib/telegram";



export default function Moonrise() {

 const nav = useNavigate();

 const [mouse, setMouse] = useState({ x: 0, y: 0 });



 useEffect(() => {

   ping("visit", { layer: "moonrise" });

 }, []);



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

     <Stars />

     <Clouds />

     <Fireflies />



     {/* Painted moon */}

     <motion.div

       initial={{ opacity: 0, scale: 0.8, y: 40 }}

       animate={{ opacity: 1, scale: 1, y: 0 }}

       transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}

       className="absolute left-1/2 top-[18%] -translate-x-1/2 pointer-events-none"

       style={{

         width: "min(46vmin, 480px)",

         height: "min(46vmin, 480px)",

       }}

     >

       <PaintedMoon />

     </motion.div>



     {/* Left polaroid */}

     <Polaroid

       src="/images/ghibli/rupal-photo-1.png"

       rotate={-8}

       side="left"

       delay={1.2}

       mouseX={mouse.x}

       mouseY={mouse.y}

       caption="मेरी चाँदनी 🌗"

     />



     {/* Right polaroid */}

     <Polaroid

       src="/images/ghibli/rupal-photo-2.png"

       rotate={7}

       side="right"

       delay={1.6}

       mouseX={mouse.x}

       mouseY={mouse.y}

       caption="चीकू 🌸"

     />



     {/* Her name and prompt */}

     <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-32 pointer-events-none px-6">

       <motion.h1

         initial={{ opacity: 0, y: 30 }}

         animate={{ opacity: 1, y: 0 }}

         transition={{ duration: 2.5, delay: 2 }}

         className="font-hindi text-7xl md:text-9xl tracking-tight text-center"

         style={{

           color: "#FFF6E5",

           textShadow:

             "0 4px 0 rgba(44,38,69,0.35), 0 12px 40px rgba(0,0,0,0.35)",

         }}

       >

         {CONFIG.name.hindi}

       </motion.h1>

       <motion.p

         initial={{ opacity: 0 }}

         animate={{ opacity: 0.7 }}

         transition={{

           duration: 3,

           delay: 3.5,

           repeat: Infinity,

           repeatType: "reverse",

         }}

         className="font-playful text-2xl md:text-3xl mt-8"

         style={{

           color: "#FFD6B0",

           textShadow: "0 2px 8px rgba(44,38,69,0.4)",

         }}

       >

         my application to make you my forever moon, click on it when ready

       </motion.p>

     </div>



     {/* Invisible click target over the moon */}

     <button

       onClick={() => nav("/pehli-nazar")}

       className="absolute left-1/2 top-[18%] -translate-x-1/2 cursor-pointer z-20 rounded-full"

       style={{

         width: "min(46vmin, 480px)",

         height: "min(46vmin, 480px)",

         background: "transparent",

         border: "none",

       }}

       aria-label="enter chandralok"

     />

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

           "radial-gradient(circle, rgba(255,246,229,0.6) 0%, rgba(255,214,176,0.3) 40%, transparent 70%)",

         filter: "blur(20px)",

         transform: "scale(1.6)",

       }}

     />

     <motion.div

       animate={{ scale: [1, 1.02, 1] }}

       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}

       className="absolute inset-0 rounded-full"

       style={{

         background:

           "radial-gradient(circle at 35% 30%, #FFF6E5 0%, #FFEBC5 40%, #F4B893 80%, #C88A5C 100%)",

         boxShadow:

           "inset -30px -30px 60px rgba(139,90,60,0.35), 0 0 80px rgba(255,246,229,0.4)",

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



/* ---------------- POLAROID ---------------- */

type PolaroidProps = {

 src: string;

 rotate: number;

 side: "left" | "right";

 delay: number;

 mouseX: number;

 mouseY: number;

 caption: string;

};



function Polaroid(props: PolaroidProps) {

 const { src, rotate, side, delay, mouseX, mouseY, caption } = props;

 const posClass =

   side === "left"

     ? "left-4 md:left-16 top-[42%]"

     : "right-4 md:right-16 top-[46%]";

 const parallaxX = side === "left" ? mouseX * 12 : mouseX * -12;

 const parallaxY = mouseY * -8;



 return (

   <motion.div

     initial={{ opacity: 0, y: 60, rotate: rotate * 2 }}

     animate={{

       opacity: 1,

       y: 0,

       rotate,

       x: parallaxX,

     }}

     transition={{ duration: 2, delay, ease: [0.4, 0, 0.2, 1] }}

     whileHover={{ scale: 1.05, rotate: rotate / 2, zIndex: 30 }}

     className={`absolute ${posClass} pointer-events-auto cursor-pointer z-20`}

     style={{ transform: `translateY(${parallaxY}px)` }}

   >

     <motion.div

       animate={{ y: [0, -8, 0] }}

       transition={{

         duration: 6,

         repeat: Infinity,

         ease: "easeInOut",

         delay: side === "left" ? 0 : 2,

       }}

       className="relative"

       style={{

         background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",

         padding: "10px 10px 40px 10px",

         borderRadius: "8px",

         boxShadow: "0 20px 50px rgba(60,30,20,0.5)",

       }}

     >

       <img

         src={src}

         alt={caption}

         className="w-[140px] md:w-[180px] h-[160px] md:h-[220px] object-cover rounded-sm block"

         draggable={false}

       />

       <p

         className="font-playful text-center mt-2 text-xl"

         style={{ color: "#5B3B1E" }}

       >

         {caption}

       </p>

     </motion.div>

   </motion.div>

 );

}



/* ---------------- STARS ---------------- */

function Stars() {

 const stars = Array.from({ length: 40 }, (_, i) => i);

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {stars.map((i) => {

       const top = (i * 79) % 60;

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

             top: `${top}%`,

             left: `${left}%`,

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

     {[0, 1, 2, 3].map((i) => (

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

           top: `${10 + i * 12}%`,

           width: `${240 + i * 100}px`,

           height: `${70 + i * 18}px`,

           background:

             "radial-gradient(ellipse, rgba(255,246,229,0.35), transparent 70%)",

           filter: "blur(24px)",

         }}

       />

     ))}

   </div>

 );

}



/* ---------------- FIREFLIES ---------------- */

function Fireflies() {

 const flies = Array.from({ length: 15 }, (_, i) => i);

 return (

   <div className="absolute inset-0 pointer-events-none overflow-hidden">

     {flies.map((i) => {

       const x = (i * 53) % 100;

       const y = 50 + ((i * 37) % 45);

       const delay = (i % 6) * 0.6;

       return (

         <motion.span

           key={i}

           animate={{

             y: [0, -40, 0],

             opacity: [0.3, 1, 0.3],

             scale: [1, 1.4, 1],

           }}

           transition={{

             duration: 5 + (i % 3),

             repeat: Infinity,

             delay,

             ease: "easeInOut",

           }}

           className="absolute rounded-full"

           style={{

             top: `${y}%`,

             left: `${x}%`,

             width: 5,

             height: 5,

             background: "radial-gradient(circle, #FFF3B0, transparent 70%)",

             boxShadow: "0 0 10px rgba(255,220,120,0.9)",

           }}

         />

       );

     })}

   </div>

 );

}