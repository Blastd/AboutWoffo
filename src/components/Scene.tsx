import { Canvas } from "@react-three/fiber";
import { Tome } from "./Tome";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Color } from "three";

export default function Scene() {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const [shouldOpen, setShouldOpen] = useState(false);
    useEffect(()=> {
        const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        document.addEventListener('scroll', () => {
            const box = canvasRef.current.getBoundingClientRect();
            setShouldOpen(box.top >= 0 && box.bottom <= height)
        })
    }, [])

    return <>
        <Canvas ref={canvasRef} style={{scrollSnapAlign: "start"}}>
            <PerspectiveCamera makeDefault
                position={[0, 95.5, 11.5]}
                rotation={[-4*Math.PI/9, 0, 0]}/>
            <ambientLight intensity={1}
                color={new Color(0xA2DDD6)}/>
            <spotLight position={[0, 70, 0]}
                intensity={2000}
                distance={10000}
                angle={0.96}
                decay={1.5}/>
            <Suspense fallback={null}>
                <Tome castShadow shouldOpen={shouldOpen}/>  
            </Suspense>
        </Canvas>
    </>
}