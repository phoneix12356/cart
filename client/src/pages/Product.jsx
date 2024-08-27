import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function Product({ addToCart }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    //  const data =  api.get(`http://localhost:5000/api/products/${id}`);
    //  console.log(data);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-semibold mb-4">${product.price}</p>
        <p className="mb-4">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
