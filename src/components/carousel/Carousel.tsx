import CarouselImage from "./CarouselImage"
import {CAROUSEL_IMAGES, CarouselContext} from "./util"
import "./carousel.css";
import { useEffect, useRef, useState } from "react";

export default function Carousel() {

    const [scroll, setScroll] = useState(0);
    const galleryRef = useRef<HTMLDivElement>(null!);
    const audioRef = useRef<HTMLAudioElement>(null!);

    useEffect(()=> {
        const loopHandle = setInterval(() => setScroll(prev => (prev + 1) % CAROUSEL_IMAGES.length), 4000);
        audioRef.current.preservesPitch = false;
        return () => clearInterval(loopHandle);
    }, []);

    useEffect(()=>{
        galleryRef.current.scroll({left: window.innerWidth * scroll, behavior: "smooth"});
    }, [scroll])

    return <div className="carousel" ref={galleryRef}>
        <audio ref={audioRef} src="/squeak.mp3"/>
        <CarouselContext.Provider value={{
            play: () => {
                audioRef.current.pause();
                audioRef.current.playbackRate = 0.5 + Math.random() * 1;
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            }}>
            {CAROUSEL_IMAGES.map ((img, key) => (
                <CarouselImage key={key} src={img}/>
            ))}
        </CarouselContext.Provider>
        
    </div>
}