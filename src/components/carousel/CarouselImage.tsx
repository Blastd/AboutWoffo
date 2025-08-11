import { useRef, type MouseEvent, type RefObject } from "react";
import type { BoopableImage } from "./util";

let toPlay: HTMLAudioElement | null = null;

const onImageClick = (e: MouseEvent<HTMLImageElement>,
    ref: RefObject<HTMLImageElement>, img: BoopableImage) => {
        const width = ref.current.width;
        const imgScale = img.originalSize[0] / width;
        let [curX, curY] = [e.clientX, e.clientY];
        const box = ref.current.getBoundingClientRect();
        curX -= box.left;
        curY -= box.top;
        for (const interaction of img.interactions) {
            const [centerX, centerY] = interaction.location.map (num => num / imgScale);
            const distance = Math.sqrt(Math.pow(Math.abs(centerX - curX), 2) + Math.pow(Math.abs(centerY - curY), 2));
            if (distance <= Math.max(interaction.radius / imgScale, 20)) {
                if (toPlay == null) toPlay = new Audio("/squeak.mp3");
                toPlay.play();
            }
        }
}

export default function CarouselImage({src}: Readonly<{src: BoopableImage}>) {
    const imgRef = useRef<HTMLImageElement>(null!);

    return <div className="carousel-image">
        <img ref={imgRef}
            src={src.url}
            onClick={(e) => onImageClick(e, imgRef, src)}/>
        <img className="backdrop" src={src.url}/>
    </div>
}