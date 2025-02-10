import axios from "axios";
import { createContext, useState } from "react";

let headers = {
    token:localStorage.getItem('userToken')
}

export let cartContext = createContext()

export default function CartContextProvider(props){
   const [cartNumber, setCart] = useState(0)

    function AddProductToCart(productId){

       return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                productId:productId
            },
            {
                headers:headers
            }
        ).then((response)=>{
            setCart(response.data.numOfCartItems)
            return response})
        .catch((error)=>{return error})
    }


    function GetProductToCart(){

       return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          
            {
                headers:headers
            }
        ).then((response)=>{
            setCart(response.data.numOfCartItems)
            return response})
        .catch((error)=>{return error})
    }

    function UpdateProductToCart(productId,count){

       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count:count
        },
          
            {
                headers:headers
            }
        ).then((response)=>{
            setCart(response.data.numOfCartItems)
            return response  })
        .catch((error)=>{return error})
    }

    function DeleteProductToCart(productId){

       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    
            {
                headers:headers
            }
        ).then((response)=>{
            setCart(response.data.numOfCartItems)
            return response  })
        .catch((error)=>{return error})
    }


return <cartContext.Provider value={{AddProductToCart,GetProductToCart,UpdateProductToCart,DeleteProductToCart,cartNumber}}>
    {props.children}
</cartContext.Provider>
}