
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
} from '@/components/ui/hover-card';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <HoverCard>
                <HoverCardTrigger>
                  <span className="text-violet-800 text-xl font-bold relative group">
                    SmartHarvest
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="bg-violet-50 border-violet-200">
                  <p className="text-sm text-violet-700">Smart sensors for modern agriculture</p>
                </HoverCardContent>
              </HoverCard>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to="/" className="text-violet-600 hover:text-violet-900 px-3 py-2 font-medium relative group">
                    Home
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="bg-violet-50 border-violet-200">
                  <p className="text-sm text-violet-700">Return to homepage</p>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to="/products" className="text-violet-600 hover:text-violet-900 px-3 py-2 font-medium relative group">
                    Products
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="bg-violet-50 border-violet-200">
                  <p className="text-sm text-violet-700">Browse our sensor collection</p>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to="/contact" className="text-violet-600 hover:text-violet-900 px-3 py-2 font-medium relative group">
                    Contact
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="bg-violet-50 border-violet-200">
                  <p className="text-sm text-violet-700">Get in touch with our team</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link to="/account">
                  <Button variant="ghost" className="text-violet-600 hover:text-violet-900 relative group">
                    <User className="h-5 w-5" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="bg-violet-50 border-violet-200">
                <p className="text-sm text-violet-700">View your account</p>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link to="/auth">
                  <Button variant="ghost" className="text-violet-600 hover:text-violet-900 relative group">
                    Login
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="bg-violet-50 border-violet-200">
                <p className="text-sm text-violet-700">Login or sign up</p>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link to="/cart">
                  <Button variant="ghost" className="text-violet-600 hover:text-violet-900 relative group">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="bg-violet-50 border-violet-200">
                <p className="text-sm text-violet-700">View your cart {cartItemCount > 0 ? `(${cartItemCount} items)` : ''}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-violet-600 hover:text-violet-900 hover:bg-violet-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/account"
              className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/auth"
              className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Sign Up
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
              {cartItemCount > 0 && (
                <span className="ml-2 bg-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
