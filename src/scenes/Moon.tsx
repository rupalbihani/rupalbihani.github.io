import { Canvas, useFrame } from "@react-three/fiber";

import { Stars, Sphere } from "@react-three/drei";

import { useRef } from "react";

import * as THREE from "three";



function MoonMesh({ onClick }: { onClick: () => void }) {

 const ref = useRef<THREE.Mesh>(null!);

 useFrame((_, dt) => {

   ref.current.rotation.y += dt * 0.04;

   // subtle breathing scale

   const t = performance.now() * 0.001;

   const s = 1 + Math.sin(t * 0.6) * 0.008;

   ref.current.scale.set(s, s, s);

 });

 return (

   <Sphere ref={ref} args={[1, 128, 128]} onClick={onClick}>

     <meshStandardMaterial

       color="#E8E8F0"

       roughness={0.95}

       metalness={0.02}

       emissive="#2A2A35"

       emissiveIntensity={0.12}

     />

   </Sphere>

 );

}



function GlowHalo() {

 return (

   <mesh position={[0, 0, -0.5]}>

     <sphereGeometry args={[1.35, 64, 64]} />

     <meshBasicMaterial

       color="#E8E8F0"

       transparent

       opacity={0.05}

       depthWrite={false}

     />

   </mesh>

 );

}



export function MoonScene({ onEnter }: { onEnter: () => void }) {

 return (

   <Canvas

     camera={{ position: [0, 0, 6.5], fov: 35 }}

     style={{ position: "absolute", inset: 0 }}

     gl={{ antialias: true, alpha: true }}

     dpr={[1, 2]}

   >

     <ambientLight intensity={0.08} />

     <directionalLight position={[6, 4, 6]} intensity={1.4} color="#F5F5FA" />

     <pointLight position={[-5, -3, 4]} intensity={0.25} color="#8A8AA5" />

     <Stars radius={100} depth={50} count={4500} factor={2.5} fade speed={0.3} />

     <GlowHalo />

     <MoonMesh onClick={onEnter} />

   </Canvas>

 );

}