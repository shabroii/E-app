import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Allorders() {
  // const [orders, setOrders] = useState([]);
  // console.log(orders);
  // function getOrders() {
  //   return axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/orders/`)
  //     .then(({ data }) => {
  //       setOrders(data.data);
  //     })
  //     .catch((error) => {});
  // }

  // useEffect(() => {
  //   getOrders();
  // }, []);

  return (
    // <div>
    //   <div className="container mx-auto">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
    //       {orders.map((order) => {
    //         return (
    //           <div className="w-full p-4 " >
    //             <div className="bg-slate-200 p-5 relative">
                 
                 
    //                 <img className="w-full" src={order?.cartItems.product.imageCover} />
    //                 <span className="block font-light text-green-600">
    //                   {order.category}
    //                 </span>
    //                 <span className="font-semibold text-gray-700">
                     
    //                 </span>
    //                 <div className="flex justify-between my-3">
    //                   <span>{order.price} EGP</span>
    //                   <span>
    //                     {order.ratingsQuantity}{" "}
    //                     <i className="fas fa-star text-yellow-500"></i>{" "}
    //                   </span>
    //                 </div>
                
    //               <button
    //                 onClick={() => {
    //                   AddProducItem();
    //                 }}
    //                 className="btn"
    //               >
    //                 Add To Cart
    //               </button>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    <div>
      AllordersHere
    </div>
  );
}
