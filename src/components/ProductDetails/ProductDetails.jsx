 import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import Slider from 'react-slick'
// import Category from '../Category/Category'


export default function ProductDetails() {
  let {AddProductToCart} = useContext(cartContext)
  let {id} =useParams()
  const[ProductDetails, setProduct]=useState([])

  async function AddProducItem(id){

    let response = await AddProductToCart(id)
    // console.log(response)
    toast.success('Product added successfully to your cart.'); 
  }

  
  
  function GetProductDetails(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((data)=>{
      setProduct(data.data.data)
      // console.log(data.data.data)
    })
    .catch((error)=>{

    })
  }

  useEffect(()=>{
    GetProductDetails()
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <div className="container">
    <div className='row my-5 mx-4'>
      <div className='w-1/4'>
      <Slider {...settings} className='mr-5'>
    {
      ProductDetails?.images?.map((img)=>{
        return  <img src={img} alt={ProductDetails?.title} className='w-full ' />

      })
    }
    </Slider>
      </div>
      <div className='w-3/4'>
      <div>
                <h1 className='text-xl font-semibold'>{ProductDetails?.title}</h1>
        <p>{ProductDetails?.description}</p>
      </div>
      <div>
               <p>{ProductDetails?.category?.name}</p>
        <div className='flex justify-between my-3'>
               <span>{ProductDetails?.price}EGP</span>
               <span>{ProductDetails?.ratingsQuantity} <i className='fas fa-star text-yellow-500'></i> </span>
               </div>
      </div>
      <button onClick={()=>{AddProducItem(ProductDetails.id)}} className='btn mt-4'>Add To Cart</button>
      </div>
    </div>
    {/* <Category   categoryName={ProductDetails?.category?.name}/> */}
    </div>
  
    </>
  )
}
