import axios from 'axios';
import { useFormik } from 'formik'
import React, {useContext, useState} from 'react'
import { useParams } from 'react-router-dom';



export default function Checkout() {

let {cartId}=useParams()
 

  function handleRegister(formsData){
    console.log(formsData)
  
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
    {'shippingAddress':formsData},
    {
      headers:{
        token:localStorage.getItem('userToken')
      },
      params:{
        url:'https://shopo-market.netlify.app/'
      }
    }
  )
  .then((response)=>{
    console.log('checkout',response)
  location.href=response.data.session.url
  })
  .catch((error)=>{
  
  })
  
  }
  
 
  let formik =useFormik({
  initialValues:{
  details:'',
  phone:'',
  city:'',
  },
 
  onSubmit:handleRegister
  })


return (
  <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
      <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
             Pay now 
          </h2>
         
          
          <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">

              <div>
                  <label htmlFor="ur-details" className="block text-sm font-medium text-gray-700">Details</label>
                  <div className="mt-1">
                      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='ur-details' value={formik.values.details} name='details' type="text"  
                          className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                   
                  </div>
              </div>

              <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <div className="mt-1">
                      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='phone' value={formik.values.phone}  name='phone' type="tel" 
                          className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
            
                  </div>
              </div>

              <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <div className="mt-1">
                      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='city' value={formik.values.city}  name='city' type="text" 
                          className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
            
                  </div>
              </div>

              <div>
                  <button type="submit"  
                      className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">     
                     Pay now
                      </button>
              </div>
          </form>
      </div>
  </div>
</div>
  </>
)
}
