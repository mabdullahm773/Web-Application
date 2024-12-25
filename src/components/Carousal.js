import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../Images/Carousal 1.png";
import image2 from "../Images/Carousal 2.png";
import image3 from "../Images/Carousal 3.png";
import "./Carousal.css";

const ImageCarousel = () => {
  return (
    <Carousel fade interval={2000} className="mt-4">
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={image1}
          alt="First slide"
          style={{ width: "1000px", height: "500px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={image2}
          alt="Second slide"
          style={{ width: "1000px", height: "500px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={image3}
          alt="Third slide"
          style={{ width: "1000px", height: "500px", objectFit: "cover" }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
