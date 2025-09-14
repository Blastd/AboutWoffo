import { useSpring } from "react-spring";
import { animated } from '@react-spring/three';
import { Image, Text } from '@react-three/drei';
import { useRef, useState, type JSX } from "react";
import * as THREE from 'three'

type FadingTextProps = {
    visible: boolean
    text: string
    position?: [number, number, number],
    rotation?: [number, number, number]
    color?: string,
    fadeSpeed?: number,
    fontSize?: number,
    delay?: number
}

const AnimatedImage = animated(Image)

const SPACING = 0;

export function ThreeDeeText (props: FadingTextProps & { 
    interaction: {
        onClick?: () => void,
        delay?: number
    },
    image?: {
        url?: string,
        size?: number
    }
}) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef<THREE.Group>(null)

    const hasImage = !!props.image?.url;
    const finalImageSize = props.image?.size ?? 3;

    const { opacity, imageSize } = useSpring({
        opacity: props.visible ? 1 : 0,
        imageSize: props.visible ? finalImageSize : 0.01,
        config: { tension: 200, friction: 20 },
        delay: props.delay ?? 0
    })

    const { scale } = useSpring({
        scale: hovered ? 1.1 : 1,
        config: { tension: 200, friction: 20 },
        delay: props.interaction.delay ?? 0
    })

     return (
        <animated.group
            position={props.position}
            rotation={props.rotation}
            ref={meshRef}
            scale={scale}>
            {props.image?.url && <AnimatedImage
                url={props.image.url}
                scale={imageSize}
                transparent
                position={[-finalImageSize / 2 - SPACING, 0, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={props.interaction.onClick}/>}
            <Text fontSize={props.fontSize}
                position={[(hasImage ? finalImageSize : 0) / 2, 0, 0]}
                font={"/fonts/MorrisRomanBlack.ttf"}
                color={props.color}
                anchorX="left"
                anchorY="middle"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={props.interaction.onClick}>
                    {props.text}
                {/* Attach animated material */}
                <animated.meshBasicMaterial
                    attach="material"
                    transparent
                    opacity={opacity}/>
            </Text>
        </animated.group>
    );
}