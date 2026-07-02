import { AnimatePresence, motion } from "framer-motion";

import { useLocation } from "react-router-dom";

import type { ReactNode } from "react";



const dropIn = {

 initial: { opacity: 0, scale: 1.15, filter: "blur(20px)" },

 animate: { opacity: 1, scale: 1,   filter: "blur(0px)" },

 exit:   { opacity: 0, scale: 0.85, filter: "blur(30px)" },

};



export function LayerTransition({ children }: { children: ReactNode }) {

 const { pathname } = useLocation();

 return (

   <AnimatePresence mode="wait">

     <motion.div

       key={pathname}

       variants={dropIn}

       initial="initial"

       animate="animate"

       exit="exit"

       transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}

       className="min-h-screen"

     >

       {children}

     </motion.div>

   </AnimatePresence>

 );

}