import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../../context/cartContext";
import toast from 'react-hot-toast'


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
    let { AddProductToCart } = useContext(cartContext)
  

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  };

  async function AddProducItem(id) {
    let response = await AddProductToCart(id)
    if (response.data.status === 'success') {
      toast.success(response.data.message, { duration: 4000, position: 'bottom-left' })
    } else {
      toast.error(response.data.message, { duration: 4000, position: 'bottom-left' })
    }
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white wishlist shadow-md rounded-lg p-4 flex flex-col items-center">
              <img className="w-full h-80 object-cover rounded-md mb-2" src={product.imageCover} alt={product.title} />
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-700">{product.title.split(' ').slice(0, 3).join(' ')}</h4>
                <p className="text-green-600 font-medium">{product.price} EGP</p>
                <button 
                  onClick={() => removeFromWishlist(product.id)} 
                  className="mt-2 me-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
                <button onClick={() => { AddProducItem(product.id) }} className='mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition              </div>
'>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
