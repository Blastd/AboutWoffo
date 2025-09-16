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
        originalSize: [2160, 1440],
        alt: "Drew, a Fox Wolf hybrid featuring fur of blue and black shades, and an orange nose, peeking out of the bushes, looking at the camera",
        interactions: [
            {
                location: [1234, 729],
                radius: 80
            }
        ],
        attribution: {
            authorLink: "https://x.com/RevSkulldog",
            authorName: "Rev Skulldog"
        }
    },
    {
        url: "/carousel/PEACE.webp",
        originalSize: [2160, 1440],
        alt: "Drew, a Fox Wolf hybrid featuring fur of blue and black shades, and an orange nose, does the peace gesture in front of the camera.",
        interactions: [
            {
                location: [1091, 672],
                radius: 60
            }
        ],
        attribution: {
            authorLink: "https://x.com/RevSkulldog",
            authorName: "Rev Skulldog"
        }
    },
    {
        url: "/carousel/BLEP.webp",
        originalSize: [2160, 1440],
        alt: "Drew, a Fox Wolf hybrid featuring fur of blue and black shades, and an orange nose, smiling with his tongue out.",
        interactions: [
            {
                location: [1140, 811],
                radius: 80
            }
        ],
        attribution: {
            authorLink: "https://www.instagram.com/montagutiluca/",
            authorName: "Luka Montaguti"
        }
    }
]