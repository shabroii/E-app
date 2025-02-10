import React from 'react'
import Slider from 'react-slick';

export default function MainSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='w-1/3'></div>
        <div className='w-2/3'> </div>
    
    </div>
    </div>
  )
}
