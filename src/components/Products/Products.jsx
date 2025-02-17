import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import CategorySlider from '../../components/categorySlider/categorySlider'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { WishlistContext } from '../../context/wishlistContext'
import SearchBar from '../Search Bar/Search'

export default function Products() {
  let { data, error, isError, isLoading, isFetching } = useQuery({ queryKey: 'recentProduct', queryFn: getProducts })
  let { AddProductToCart } = useContext(cartContext)
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newReleases, setNewReleases] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; 

  const [selectedCategory, setSelectedCategory] = useState('');

  // حالات لتخزين قيم الفلتر حسب السعر
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); // قيمة مبدئية للحد الأقصى للسعر

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setNewReleases(storedProducts);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  async function AddProducItem(id) {
    let response = await AddProductToCart(id)
    if (response.data.status === 'success') {
      toast.success(response.data.message, { duration: 4000, position: 'bottom-left' }) 
      console.log(response.data)
    } else {
      toast.error(response.data.message, { duration: 4000, position: 'bottom-left' })
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => data)
      .catch((error) => {})
  }

  if (isLoading || isFetching) {
    return <Loader />
  }

  const filteredProducts = data?.data?.filter((product) => {
    const isSearchMatch = product.title.toLowerCase().includes(searchQuery) || product.category.name.toLowerCase().includes(searchQuery);

    const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;

    const isCategoryMatch = selectedCategory ? product.category.name.toLowerCase() === selectedCategory.toLowerCase() : true;

    return isSearchMatch && isPriceMatch && isCategoryMatch;
  });
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <CategorySlider />
      <div className="container mx-auto pt-5">
        
        

        <div className='border border-green-500 p-5 rounded-xl bg-slate-100'>
          <h2 className="text-2xl text-green-500 font-bold my-4">New Releases</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
            {newReleases.length > 0 ? (
              newReleases.map((product, index) => (
                <div className="w-full p-4 product" key={index}>
                  <div className="bg-slate-300 p-5 h-96 relative rounded-lg shadow-md">
                    <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      New
                    </div>

                    <img className="w-full h-auto rounded-md" src={product.image} alt={product.name} />
                    <span className="block font-light text-green-600 mt-2">{product.category}</span>
                    <span className="font-semibold text-gray-700 block">{product.name}</span>
                    <div className="flex justify-between my-3">
                      <span className="font-bold">{product.price} EGP</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>Wait for new releases</p>
            )}
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="flex justify-center align-center my-4">
          <label className="text-lg font-semibold me-2">Category:</label>
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange} 
            className="p-2 border rounded-md w-64"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="Men's Fashion">Men’s Fashion</option>
            <option value="Women's Fashion">Women’s Fashion</option>
          </select>
        </div>

        <div className="flex justify-center align-center my-4">
          <div className='me-5'>
            <label className="text-lg font-semibold me-2">Min Price:</label>
            <input 
              type="number" 
              value={minPrice} 
              onChange={(e) => setMinPrice(e.target.value)} 
              className="p-2 border rounded-md w-32" 
              min="0" 
            />
          </div>
          <div>
            <label className="text-lg font-semibold me-2">Max Price:</label>
            <input 
              type="number" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)} 
              className="p-2 border rounded-md w-32" 
              min="0" 
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
          {currentProducts?.map((product) => {
            const isInWishlist = wishlist.some(item => item.id === product.id)
            return (
              <div className='w-full p-4 product' key={product.id}>
                <div className='bg-slate-200 p-5 relative'>
                  <button onClick={() => toggleWishlist(product)} className='absolute top-5 right-5 text-red-500 text-xl'>
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-5">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            className="px-4 py-2 mx-2 border rounded-md" 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-2">{currentPage} / {totalPages}</span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            className="px-4 py-2 mx-2 border rounded-md" 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
