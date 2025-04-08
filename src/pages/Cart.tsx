
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();

  const handleCheckout = () => {
    toast.success('Checkout functionality will be implemented soon!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-violet-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold text-violet-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-violet-600 hover:bg-violet-700">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/products" className="text-violet-600 hover:text-violet-900 flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-violet-900">Shopping Cart ({getTotalItems()} items)</h1>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.product.id} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center">
                <div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-6">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
                <div className="flex-grow sm:mr-6">
                  <Link to={`/products/${item.product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-violet-600">{item.product.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm">{item.product.category}</p>
                  <p className="text-violet-800 font-bold mt-1">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="mx-3 w-8 text-center">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-4 text-gray-400 hover:text-red-600"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-violet-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-violet-700">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-violet-600 hover:bg-violet-700 mt-6"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
