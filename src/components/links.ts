export type Link = {
    url: string,
    text: string,
    image?: {
        url?: string,
        size?: number
    }
}

export function paginate(links: Link[]) {
    const left: Link[] = [];
    const right: Link[] = [];
    links.forEach((v, i)=> {
        if (i < 6) {
            left.push(v);
        } else {
            right.push(v);
        }
    })
    return {left, right};
}

export const LINKS: Link[] = [
    {
        url: "https://smol.woffo.ovh/thawoofinsta",
        text: "Instagram",
        image: {
            url: "/images/instagram.png"
        }
    },
    {
        url: "https://smol.woffo.ovh/thawoofx",
        text: "Twitter",
        image: {
            url: "/images/twitter.png"
        }
    },
    {
        url: "https://smol.woffo.ovh/thawooffurtrack",
        text: "FurTrack",
        image: {
            url: "/images/furtrack.png"
        }
    },
    {
        url: "https://smol.woffo.ovh/thawooffa",
        text: "FurAffinity",
        image: {
            url: "/images/furaffinity.png"
        }
    }
]