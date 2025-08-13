import { createContext, useContext } from "react";

export type Interaction = {
    location: number[];
    radius: number;
}

export type Attribution = {
    authorName: string;
    authorLink: string;
}

export type BoopableImage = {
    interactions: Interaction[];
    originalSize: number[];
    url: string;
    attribution?: Attribution;
    alt?: string;
}

export type CarouselData = {
    play: () => void
}

export const CarouselContext = createContext<CarouselData | undefined>(undefined);

export const useCarouselContext: () => CarouselData = () => {
    const context = useContext(CarouselContext);
    if (!context) throw "Carousel context missing";
    return context;
}

export const CAROUSEL_IMAGES: BoopableImage[] = [
    {
        url: "/carousel/BUSHES.webp",
        originalSize: [1200, 800],
        alt: "Drew, a Folf with shades of blue and black, peeking out of the bushes, looking at the camera",
        interactions: [
            {
                location: [684, 405],
                radius: 40
            }
        ],
        attribution: {
            authorLink: "https://x.com/RevSkulldog",
            authorName: "Rev Skulldog"
        }
    },
    {
        url: "/carousel/PEACE.webp",
        originalSize: [1200, 800],
        alt: "Drew, a Fox-wolf hybrid with shades of blue and black, alongside some orange highlights, waves the peace gesture in front of the camera.",
        interactions: [
            {
                location: [600, 375],
                radius: 30
            }
        ]
    }
]