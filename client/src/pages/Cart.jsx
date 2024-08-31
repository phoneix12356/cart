import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchUserCart,
  removeFromCart,
  DeleteItemofUserCart,
} from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Cart() {
  const savedCart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    }
  }, [dispatch]);

  const handleRemove = (productId) => {
    toast.error("item remove successfully");
    if (user) {
      dispatch(DeleteItemofUserCart({ id: productId }));
      dispatch(removeFromCart(productId));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  return (
    <div className="container mt-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {savedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {savedCart.map((item) => (
            <div
              key={item.id}
              className="border p-4 mb-4 rounded flex justify-between items-center"
            >
              <div className="flex flex-col gap-y-2">
                <img
                  className="w-24 h-24 object-contain"
                  src={item.image}
                  alt={item.title}
                />
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p>Quantity: {item.stock}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
          {user ? (
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Checkout
            </button>
          ) : (
            <Link
              to="/signin"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition duration-300"
            >
              Sign In to Checkout
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
