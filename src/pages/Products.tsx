import React, { useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock product data
const allProducts: Product[] = [
  {
    id: 1,
    name: "Smart Soil Moisture Sensor Pro",
    description:
      "Advanced soil moisture monitoring with wireless connectivity and real-time alerts. Ideal for precision irrigation management.",
    price: 9.99,
    image: "senzor-umiditate.jpg",
    category: "Soil Sensors",
  },
  {
    id: 2,
    name: "PH Sensor",
    description:
      "Complete PH monitoring system used to measure the acidity or alkalinity of a solution, expressed as pH (potential of hydrogen).",
    price: 49.99,
    image: "senzor_PH.jpg",
    category: "Solution Monitoring",
  },
  {
    id: 3,
    name: "Crop Health Monitor",
    description:
      "Multispectral imaging system for early detection of crop stress, disease, and nutrient deficiencies.",
    price: 799.99,
    image: "monitor ferma.jpg",
    category: "Crop Monitoring",
  },
  {
    id: 4,
    name: "Irrigation Controller",
    description:
      "Smart irrigation system with automated scheduling based on soil moisture, weather forecasts, and crop water needs.",
    price: 129.99,
    image: "irrigation-contr.jpg",
    category: "Water Management",
  },
  {
    id: 5,
    name: "Soil Nutrient Analyzer",
    description:
      "Portable device for quick analysis of soil NPK levels, pH, and organic matter content to optimize fertilization.",
    price: 199.99,
    image: "analyzer.jpg",
    category: "Soil Sensors",
  },
  {
    id: 6,
    name: "Water Flow Meter",
    description:
      "Accurate measurement of water usage with leak detection and consumption analytics for irrigation systems.",
    price: 149.99,
    image: "water meter.jpg",
    category: "Water Management",
  },
  {
    id: 7,
    name: "Drone Field Scanner",
    description:
      "Autonomous drone system for aerial field monitoring, with camera and multispectral sensors for comprehensive crop analysis.",
    price: 999.99,
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    category: "Crop Monitoring",
  },
  {
    id: 8,
    name: "Temperature & Humidity Sensor",
    description:
      "Precise monitoring of ambient conditions for greenhouses, storage facilities, and sensitive growing environments.",
    price: 19.99,
    image: "senzor-temperatura.jpg",
    category: "Weather Monitoring",
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-violet-900 mb-4">
          Our Products
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our range of innovative agricultural sensors designed to help
          you monitor, analyze, and optimize your farming practices.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:w-auto w-full">
            <select
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              className="border-violet-600 text-violet-600 hover:bg-violet-50 inline-flex items-center"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setPriceRange([0, 1000]);
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
