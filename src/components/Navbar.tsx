
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
} from '@/components/ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserData(parsedUserData);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    toast.success('Successfully logged out');
  };

  const getUserInitials = () => {
    if (userData && userData.firstName && userData.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    } else if (userData && userData.email) {
      return userData.email[0].toUpperCase();
    }
    return 'U';
  };

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
                    <span className="relative overflow-hidden inline-block">
                      <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">Home</span>
                      <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">Home</span>
                    </span>
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
                    <span className="relative overflow-hidden inline-block">
                      <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">Products</span>
                      <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">Products</span>
                    </span>
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
                    <span className="relative overflow-hidden inline-block">
                      <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">Contact</span>
                      <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">Contact</span>
                    </span>
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
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative group">
                    <Avatar className="h-8 w-8 border-2 border-violet-200 group-hover:border-violet-500 transition-colors">
                      <AvatarFallback className="bg-violet-100 text-violet-800 group-hover:bg-violet-200 transition-colors">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {userData?.firstName && userData?.lastName
                          ? `${userData.firstName} ${userData.lastName}`
                          : userData?.email || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/account">
                    <DropdownMenuItem className="cursor-pointer relative group">
                      <User className="mr-2 h-4 w-4" />
                      <span className="relative overflow-hidden inline-block">
                        <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">
                          My Account
                        </span>
                        <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                          View Profile
                        </span>
                      </span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer relative group">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="relative overflow-hidden inline-block">
                      <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">
                        Sign Out
                      </span>
                      <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                        Log Out
                      </span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to="/auth">
                    <Button variant="ghost" className="text-violet-600 hover:text-violet-900 relative group">
                      <span className="relative overflow-hidden inline-block">
                        <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">Login</span>
                        <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">Login</span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Button>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="bg-violet-50 border-violet-200">
                  <p className="text-sm text-violet-700">Login or sign up</p>
                </HoverCardContent>
              </HoverCard>
            )}
            
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
            {isLoggedIn ? (
              <>
                <Link
                  to="/account"
                  className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 text-base font-medium text-violet-600 hover:text-violet-900 hover:bg-violet-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
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
