import { useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { useCarouselContext, type BoopableImage } from "./util";

const shouldBoop = (e: MouseEvent<HTMLImageElement>,
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
                return true;
            }
        }
        return false;
}

export default function CarouselImage({src}: Readonly<{src: BoopableImage}>) {
    const imgRef = useRef<HTMLImageElement>(null!);
    const [clicked, setClicked] = useState(false);
    const {play} = useCarouselContext();

    useEffect(()=>{
        if (!clicked) return;
        const handler = setTimeout(()=>setClicked(false), 240);
        return () => clearTimeout(handler);
    }, [clicked]);

    return <div className="carousel-image">
        <div className={`centered-image ${clicked ? "clicked" : ""}`}>
            <img ref={imgRef}
                src={src.url}
                alt={src.alt}
                onClick={(e) => {
                    if (shouldBoop(e, imgRef, src)) {
                        play();
                        setClicked(true);
                    }
                }}/>
        </div>
        {src.attribution && <a className="attribution"
                target="_blank"
                href={src.attribution.authorLink}>
                    {src.attribution.authorName}
            </a>}
        <img aria-hidden className="backdrop" src={src.url}/>
    </div>
}