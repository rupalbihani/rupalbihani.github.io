type Props = {

 src: string;

 position?: "left" | "right" | "center";

 opacity?: number;

};



export function HerPhoto({ src, position = "right", opacity = 0.08 }: Props) {

 const posClass =

   position === "left"  ? "-left-20 bottom-0"

   : position === "right" ? "-right-20 bottom-0"

   : "left-1/2 -translate-x-1/2 bottom-0";



 return (

   <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

     <img
       src={src}
       className={`absolute ${posClass} h-[90vh] select-none`}
       style={{
         opacity,
         mixBlendMode: "screen",
         filter: "blur(0.5px) grayscale(20%)",
       }}
     />

   </div>

 );

}