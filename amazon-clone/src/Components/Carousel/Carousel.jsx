// import React from 'react';
// import {Carousel}
//  from "react-responsive-carousel";
// import {img} from "./images-and-data-source-content-1747788329838/img/data"
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import classes from "./Carousel.module.css"
// function CarouselEffect() {
//   return (
//     <div>
//         <carousel
//         autoPlay={true}
//         infinteLoop={true}
//         showIndicators={false}
//         showThumbs={false}
//         >
//             {
//                 img.map((imageItemlink)=>{
//                     return <img src={imageItemlink}  />
//                 })
//             }

//         </carousel>
//         <div className={classes.hero_img}></div>
//     </div>
//   )
// }

// export default CarouselEffect;
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./images-and-data-source-content-1747788329838/img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
	return (
		<div>
			<Carousel
			className={classes.carousel}
				autoPlay={true}
				infiniteLoop={true}
				showIndicators={false}
				showThumbs={false}
			>
				{img.map((imageItemlink, index) => (
					<div key={index}>
						<img src={imageItemlink} alt={`carousel-slide-${index}`} />
					</div>
				))}
			</Carousel>
			<div className={classes.hero_img}></div>
		</div>
	);
}

export default CarouselEffect;
