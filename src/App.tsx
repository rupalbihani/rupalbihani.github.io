import { useEffect, useState } from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import { Gate } from "./components/Gate";

import { Nav } from "./components/Nav";

import { LayerTransition } from "./components/LayerTransition";

import Moonrise from "./layers/L0_Moonrise";

import PehliNazar from "./layers/L1_PehliNazar";

import DoSheher from "./layers/L2_DoSheher";

import AajKaGeet from "./layers/L3_AajKaGeet";

import Shayari from "./layers/L4_Shayari";

import Mann from "./layers/L5_Mann";

import Publish from "./layers/L6_Publish";

import Ring from "./layers/L7_Ring";



export default function App() {

 const [ok, setOk] = useState(false);



 useEffect(() => {

   if (localStorage.getItem("chandralok:auth") === "1") setOk(true);

 }, []);



 if (!ok) {

   return (

     <div className="grain">

       <Gate onPass={() => setOk(true)} />

     </div>

   );

 }



 return (

   <div className="grain">

     <HashRouter>
      <ScrollToTop /> 
       <Nav />

       <LayerTransition>

         <Routes>

           <Route path="/"            element={<Moonrise />} />

           <Route path="/pehli-nazar" element={<PehliNazar />} />

           <Route path="/do-sheher"   element={<DoSheher />} />

           <Route path="/aaj-ka-geet" element={<AajKaGeet />} />

           <Route path="/shayari"     element={<Shayari />} />

           <Route path="/mann"        element={<Mann />} />

           <Route path="/prakashit"   element={<Publish />} />

           <Route path="/ring" element={<Ring />} />

         </Routes>

       </LayerTransition>

     </HashRouter>

   </div>

 );

}