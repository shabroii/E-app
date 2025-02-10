import axios from "axios";
import React ,{ useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import Loader from "../Loader/Loader";


export default function Brands() {
  let [brand, getBrand] = useState ([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBrands()
  },[]);


  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then(({data}) => {
      getBrand(data.data);
      console.log(data.data);
      setIsLoading(false); 
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="brands py-16 mt-6">
      <div className="container  mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <h1 className="text-center text-green-400 text-4xl font-semibold">
          Our Brands
        </h1>
        <br />
        {isLoading ? (
              <Loader/>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
              {brand.map((brand, index) => (
                <div
                  key={index}
                  className="w-full text-center categoryy position-relative bg-white border rounded-lg shadow-2xl  dark:border-green-500"
                  style={{
                    backgroundImage: `url(${brand.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                 
                    height: "250px"
                  }}
                >
           
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
 categories
}

