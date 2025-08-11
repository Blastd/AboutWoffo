export type Interaction = {
    location: number[];
    radius: number;
}

export type BoopableImage = {
    interactions: Interaction[];
    originalSize: number[];
    url: string;
}

export const CAROUSEL_IMAGES: BoopableImage[] = [
    {
        url: "/carousel/BUSHES.webp",
        originalSize: [1200, 800],
        interactions: [
            {
                location: [684, 405],
                radius: 40
            }
        ]
        
    },
    {
        url: "/carousel/PEACE.webp",
        originalSize: [1200, 800],
        interactions: [
            {
                location: [600, 375],
                radius: 30
            }
        ]
    }
]