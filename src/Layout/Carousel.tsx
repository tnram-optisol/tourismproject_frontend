import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function MyCarousel() {
  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  return (
    <Carousel className="mt-3 mb-3">
      <Carousel.Item>
        <img
          className="d-block w-100" height="400"
          src="https://www.cndenglish.com/sites/default/files/sites/default/files/en/imagenes_noticias/trav2.jpg"
          alt="Travel -1"
        />
        <Carousel.Caption>
          <h3>Time To Travel</h3>
          <p>Ready for a World Tour with Us...</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" height="400"
          src="https://previews.123rf.com/images/mikalaimanyshau/mikalaimanyshau1412/mikalaimanyshau141200015/34925939-travel-banner-flat-vector-illustration-.jpg"
          alt="Travel -2"
        />

        <Carousel.Caption>
          <h3>Time To Travel</h3>
          <p>Ready for a World Tour with Us...</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" height="400"
          src="https://www.blog.traveltoindia.org/wp-content/uploads/2020/10/travel_banner.jpg"
          alt="Travel -3"
        />

        <Carousel.Caption>
          <h3>Time To Travel</h3>
          <p>Ready for a World Tour with Us...</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
