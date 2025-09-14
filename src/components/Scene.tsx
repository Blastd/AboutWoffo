import { Canvas } from "@react-three/fiber";
import { Tome } from "./Tome";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Color } from "three";
import { ThreeDeeText } from "./ThreeDeeText";
import { LINKS, paginate } from "./links";

const navigate = (url: string) => { window.open(url, "_blank"); }

const paginated = paginate(LINKS);

export default function Scene() {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const [canvasScale, setCanvasScale] = useState(1);
    const [shouldOpen, setShouldOpen] = useState(false);
    const shouldBookOpen = () => {
        const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const box = canvasRef.current.getBoundingClientRect();
        return box.top >= 0 && box.bottom <= height;
    };

    useEffect(()=> {
        setShouldOpen(shouldBookOpen());
        const shouldOpenAction = ()=>setShouldOpen(shouldBookOpen());
        document.addEventListener('scroll', shouldOpenAction);
        const resizeAction = ()=>{
            setCanvasScale(Math.max(Math.min(window.innerWidth / 1080, 1), 0.5));
        }
        window.onresize = resizeAction;
        resizeAction();
        return () => {
            document.removeEventListener ('scroll', shouldOpenAction);
        }
    }, [])

    return <>
        <Canvas ref={canvasRef} style={{scrollSnapAlign: "start"}}>
            <PerspectiveCamera makeDefault
                position={[0, 95.5, 11.5]}
                rotation={[-4*Math.PI/9, 0, 0]}/>
            <group scale={canvasScale}>
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
                {paginated.left.map ((v, i) =><ThreeDeeText
                    visible={shouldOpen}
                    text={v.text}
                    position={[-30, 15, -18+(8*i)]}
                    rotation={[-4*Math.PI/9, Math.PI/10, Math.PI*-1/70]}
                    fontSize={5}
                    color="black"
                    delay={shouldOpen ? 1300 : 0}
                    interaction={{
                        onClick: () => navigate(v.url)
                    }}
                    image={v.image}/>
                )}
            </group>
        </Canvas>
    </>
}