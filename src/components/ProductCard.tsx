
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-violet-100 hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-violet-600 bg-violet-100 rounded-full px-3 py-1">
          {product.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-violet-800">${product.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <Link to={`/products/${product.id}`}>
              <Button variant="outline" size="sm" className="text-violet-600 border-violet-600 hover:bg-violet-50">
                Details
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="bg-violet-600 hover:bg-violet-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
