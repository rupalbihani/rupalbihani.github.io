import { useState } from "react";

import { CONFIG } from "../config";



export function Gate({ onPass }: { onPass: () => void }) {

 const [val, setVal] = useState("");

 const [wrong, setWrong] = useState(false);



 const submit = () => {

   if (val.trim() === CONFIG.gate.answer) {

     localStorage.setItem("chandralok:auth", "1");

     onPass();

   } else {

     setWrong(true);

     setTimeout(() => setWrong(false), 2000);

   }

 };



 return (

   <div className="fixed inset-0 z-[100] flex items-center justify-center bg-deep">

     <div className="liquid-glass rounded-3xl p-10 max-w-md w-full mx-6">

       <p className="font-hindi text-2xl text-chandni mb-2">

         {CONFIG.gate.question}

       </p>

       <p className="text-silverDim text-sm mb-6 font-serif italic">

         A question only my moon would know.

       </p>

       <input

         className="w-full bg-transparent border-b border-silver/30 py-3 text-chandni

                    text-lg focus:outline-none focus:border-chandni font-hindi"

         value={val}

         onChange={(e) => setVal(e.target.value)}

         onKeyDown={(e) => e.key === "Enter" && submit()}

         placeholder="…"

         autoFocus

       />

       {wrong && (

         <p className="mt-3 text-sm text-rose-300/70 font-serif italic">

           Not quite. Look at the moon and try again. 🌙

         </p>

       )}

     </div>

   </div>

 );

}