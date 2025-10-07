import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-primary-50 text-secondary-900 py-4 fixed w-full z-50 border-b border-secondary-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wider text-secondary-900">
            MODERNSTORE
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              to="/products" 
              className="text-sm font-medium uppercase tracking-wider hover:text-accent-800 transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/new" 
              className="text-sm font-medium uppercase tracking-wider hover:text-accent-800 transition-colors"
            >
              New Arrivals
            </Link>
            <Link 
              to="/sale" 
              className="text-sm font-medium uppercase tracking-wider hover:text-accent-800 transition-colors"
            >
              Sale
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-8">
            {/* Search */}
            <button className="hover:text-accent-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-accent-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            <SignedIn>
              <div className="flex items-center space-x-6">
                <Link 
                  to="/orders" 
                  className="text-sm font-medium uppercase tracking-wider hover:text-accent-800 transition-colors"
                >
                  Orders
                </Link>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full border-2 border-secondary-200"
                    }
                  }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium uppercase tracking-wider hover:text-accent-800 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;