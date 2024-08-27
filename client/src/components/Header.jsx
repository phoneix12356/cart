const Header = ({ isSignedIn, onSignOut }) => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EcommerceApp</Link>
        <div>
          {isSignedIn ? (
            <>
              <Link to="/cart" className="mr-4">Cart</Link>
              <button onClick={onSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="mr-4">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
