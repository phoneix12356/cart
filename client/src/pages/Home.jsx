import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  AddItemToUserCart,
  fetchUserCart,
  addToCart,
} from "../features/cartSlice";

function Home() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const handleDataFetching = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/products");
      setLoading(false);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleDataFetching();
    if (user) dispatch(fetchUserCart());
  }, [user]);

  if (loading) return <div className="w-full min-h-screen flex items-center justify-center "> <AiOutlineLoading3Quarters className="animate-spin w-20 h-20 text-gray-400" /> </div>;

  const handleAddToCart = (product, quantity) => {
    toast.success("Item added successfully");
    if (user) dispatch(AddItemToUserCart({ product, quantity }));
    else {
      dispatch(addToCart({ product, quantity }));
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded flex flex-col items-center justify-center"
          >
            <img
              src={product.image}
              className="w-48 h-48 object-contain"
              alt={product.name}
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="mt-2">${product.price.toFixed(2)}</p>
            <label className="border-gray-400">Quantity</label>
            <input
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={1}
              className="border border-black/50 border-solid w-28 rounded-lg pl-2"
            />
            <button
              onClick={() => handleAddToCart(product, quantity)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
