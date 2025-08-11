import CarouselImage from "./CarouselImage"
import {CAROUSEL_IMAGES} from "./util"
import "./carousel.css";

export default function Carousel() {
    return <div className="carousel">
        {CAROUSEL_IMAGES.map ((img, key) => <CarouselImage 
            key={key} src={img}/>)}
    </div>
}