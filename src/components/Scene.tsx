import { Canvas } from "@react-three/fiber";
import WoffoHead from "./WoffoHead";

export default function Scene() {
    return <>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]}/>
            <WoffoHead/>
        </Canvas>
    </>
}