import { useRef, type MouseEvent, type RefObject } from "react";
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

    const {play} = useCarouselContext();

    return <div className="carousel-image">
        <div className="centered-image">
            {src.attribution && <a className="attribution"
            href={src.attribution.authorLink}>
                {src.attribution.authorName}
            </a>}
            <img ref={imgRef}
                src={src.url}
                alt={src.alt}
                onClick={(e) => {
                    if (shouldBoop(e, imgRef, src)) { play(); }
                }}/>
        </div>
        <img aria-hidden className="backdrop" src={src.url}/>
    </div>
}