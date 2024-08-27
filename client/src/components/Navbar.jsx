import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/userSlice';
import { clearCart } from '../features/cartSlice';

function Navbar() {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.list);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    dispatch(clearUser());
    dispatch(clearCart());
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <Link to="/" className="text-white text-2xl font-bold">E-commerce</Link>
        <div>
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user.name}</span>
              <button onClick={handleSignOut} className="text-white">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-white mr-4">Sign In</Link>
              <Link to="/signup" className="text-white">Sign Up</Link>
            </>
          )}
          <Link to="/cart" className="text-white ml-4">Cart ({cart?.reduce((total, item) => total + Number(item.stock), 0)})</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;