import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Shipping information states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    
    // Mock authentication for now
    if (isLogin) {
      // Login logic - store minimal user info
      const userData = { email };
      localStorage.setItem('userData', JSON.stringify(userData));
      toast.success('Successfully logged in!');
      
      // Dispatch custom event to notify other components about authentication change
      window.dispatchEvent(new Event('authChange'));
      
      navigate('/');
    } else {
      // Additional validation for signup
      if (!isLogin) {
        if (!firstName || !lastName) {
          toast.error('Please enter your name');
          return;
        }
        if (!address || !city || !state || !zipCode || !country) {
          toast.error('Please complete all shipping information fields');
          return;
        }
      }
      
      // Signup logic - store all user data
      const userData = {
        email,
        firstName,
        lastName,
        shipping: {
          address,
          city,
          state,
          zipCode,
          country,
          phone
        }
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      toast.success('Account created successfully!');
      
      // Dispatch custom event to notify other components about authentication change
      window.dispatchEvent(new Event('authChange'));
      
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-violet-900">
            <span className="relative group overflow-hidden inline-block">
              <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">
                {isLogin ? 'Sign in to SmartHarvest' : 'Create a SmartHarvest account'}
              </span>
              <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                {isLogin ? 'Welcome back!' : 'Join our community'}
              </span>
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Enter your information to create an account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Shipping Information</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main St"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="New York"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-sm font-medium text-gray-700">
                        State/Province
                      </label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="NY"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="space-y-2">
                      <label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                        Zip/Postal Code
                      </label>
                      <Input
                        id="zipCode"
                        type="text"
                        placeholder="10001"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="United States"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
              {isLogin ? (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            <span className="relative group inline-block overflow-hidden">
              <span className="inline-block transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-full">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>
              <span className="absolute left-0 inline-block transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                {isLogin ? "Sign up now" : "Back to login"}
              </span>
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-1 text-violet-600 hover:text-violet-800 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
