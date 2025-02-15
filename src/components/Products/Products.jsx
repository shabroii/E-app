import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import CategorySlider from '../../components/categorySlider/categorySlider'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { WishlistContext } from '../../context/wishlistContext'

export default function Products() {
  let { data, error, isError, isLoading, isFetching } = useQuery({ queryKey: 'recentProduct', queryFn: getProducts })
  let { AddProductToCart } = useContext(cartContext)
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  // const [wishlist, setWishlist] = useState([])

  // useEffect(() => {
  //   const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  //   setWishlist(storedWishlist)
  // }, [])

  // function toggleWishlist(product) {
  //   let updatedWishlist = [...wishlist]
  //   if (wishlist.some(item => item.id === product.id)) {
  //     updatedWishlist = wishlist.filter(item => item.id !== product.id)
  //     toast.error("Removed from Wishlist", { duration: 2000, position: 'bottom-left' })
  //   } else {
  //     updatedWishlist.push(product)
  //     toast.success("Added to Wishlist", { duration: 2000, position: 'bottom-left' })
  //   }
  //   setWishlist(updatedWishlist)
  //   localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
  // }

  async function AddProducItem(id) {
    let response = await AddProductToCart(id)
    if (response.data.status === 'success') {
      toast.success(response.data.message, { duration: 4000, position: 'bottom-left' })
    } else {
      toast.error(response.data.message, { duration: 4000, position: 'bottom-left' })
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => data)
      .catch((error) => {})
  }

  if (isLoading) {
    return <Loader />
  } else {
    return (
      <>
        <CategorySlider />
        <div className="container mx-auto">
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
            {data?.data?.map((product) => {
              const isInWishlist = wishlist.some(item => item.id === product.id)
              return (
                <div className='w-full p-4 product' key={product.id}>
                  <div className='bg-slate-200 p-5 relative'>
                    <button onClick={() => toggleWishlist(product)} className='absolute top-2 right-2 text-red-500 text-xl'>
                      {isInWishlist ? '❤️' : '🤍'}
                    </button>
                    <Link to={`/ProductDetails/${product.id}`}>
                      <img className='w-full' src={product.imageCover} />
                      <span className='block font-light text-green-600'>{product.category.name}</span>
                      <span className='font-semibold text-gray-700'>{product.title.split(' ').slice(0, 3).join(' ')}</span>
                      <div className='flex justify-between my-3'>
                        <span>{product.price} EGP</span>
                        <span>{product.ratingsQuantity} <i className='fas fa-star text-yellow-500'></i> </span>
                      </div>
                    </Link>
                    <button onClick={() => { AddProducItem(product.id) }} className='btn'>Add To Cart</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}
