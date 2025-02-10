import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from 'react-slick';


export default function CategorySlider() {

  const [category, setCategory] = useState([])

  function getCategory(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{;
      setCategory(data.data)
      
    })
    .catch((error)=>{
      
    })
    
  }

  useEffect(()=>{
    getCategory()
  },[])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };
  
  return (
    <>
    <div className='mb-5'>
      <h1 className='text-l font-medium my-2 mb-1 px-2 text-slate-700'>Shop Popular Category</h1>
      <Slider {...settings}>
     {category.map((img)=>{
      return <div>
      <img src={img.image} alt={img.name} className='w-[100%] h-[200px]'/>
      <p className='px-3'>{img.name}</p>
      </div>
     })}
    </Slider>
    </div>
    </>
  )
}
