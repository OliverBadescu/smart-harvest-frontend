import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { login, register, getByToken } from '@/services/authService';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  address: string;
  phone: string;
  country: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [fullName, setFullName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      setIsLoading(true);

      if (isLogin) {
        const loginRequest: LoginRequest = { email, password };
        const loginResponse = await login(loginRequest);

        console.log(loginResponse);

        if (loginResponse.success && loginResponse.body) {

          const tokenResponse = await getByToken(loginResponse.body.jwtToken);
          
          localStorage.setItem('user', JSON.stringify(tokenResponse.body));


          console.log(localStorage.getItem('user'));

          toast.success('Successfully logged in!');
        } else {
          toast.error(loginResponse.message || 'Login failed');
          setIsLoading(false);
          return;
        }
      } else {
        if (!fullName) {
          toast.error('Please enter your name');
          setIsLoading(false);
          return;
        }
        if (!address || !country) {
          toast.error('Please complete all shipping information fields');
          setIsLoading(false);
          return;
        }

        const registerData: RegisterRequest = {
          email,
          password,
          fullName,
          address,
          phone,
          country
        };

        const registerResponse = await register(registerData);

        if (registerResponse.success && registerResponse.body) {
        
          const tokenResponse = await getByToken(registerResponse.body.jwtToken);
          
          localStorage.setItem('user', JSON.stringify(tokenResponse.body));

          toast.success('Account created successfully!');
        } else {
          toast.error(registerResponse.message || 'Registration failed');
          setIsLoading(false);
          return;
        }
      }


      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    } catch (error: any) {
      console.error('Authentication error:', error);
      const errorMessage =
        error.response?.data?.message ||
        (isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
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
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Shipping Information</h3>

                  <div className="space-y-2 mt-3">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
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
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2 mt-3">
                    <label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Your country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      disabled={isLoading}
                    />
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
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full bg-violet-600 hover:bg-violet-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : isLogin ? (
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
              disabled={isLoading}
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
