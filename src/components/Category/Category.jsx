import axios from "axios";
import {useEffect, useState} from "react";
import { BallTriangle } from "react-loader-spinner";
import Loader from "../Loader/Loader";


export default function Categories() {
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function getSubCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
      .then(({ data }) => setSubCategories(data.data))
      .catch((error) => console.log(error));
  }
  return (
    <>
      <div className="cats py-16 mt-10">
        <div className="container mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
          <h1 className="text-center text-green-400 text-3xl font-semibold">
            All Categories
          </h1>
          <br />

          {isLoading ? (
            <Loader/>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full ">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="w-full text-center categoryy relative bg-white border rounded-lg shadow-2xl dark:bg-gray-800 border-green-500 dark:border-green-300"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                  }}
                >
                  <div
                    className="w-44 cat-content  pb-5 absolute"
                    style={{
                      bottom: 40,
                      left: "50%",
                      transform: "translateX(-50%)",

                    }}
                  >
                    <h2 className="text-xl font-semibold rounded-lg  tracking-tight bg-green-500 opacity-75 text-center py-2  text-dark dark:text-white">
                      {category.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}
          <br />
          <br />
          <h1 className="text-center font-bold text-2xl text-green-400 mb-4">Sub Categories</h1>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full mt-4">
            {subCategories.map((subCategory, index) => (
              <div
                className="bg-green-500 opacity-75 sub rounded-4 shadow-xl"
                key={index}
              >
                <h2 className="text-xl  font-semibold tracking-tight  text-center py-2  text-dark dark:text-white">
                  {subCategory.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
