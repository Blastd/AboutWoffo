import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

export default function WoffoHead(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => (meshRef.current.rotation.y += delta))
    return <mesh {...props}
        ref={meshRef}
        scale={1}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial flatShading color={'orange'}/>
    </mesh>
        
}