import React from "react";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredProducts: Product[] = [
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
    category: "Weather Monitoring",
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
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-violet-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-violet-900">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular agricultural sensing solutions that help
            farmers maximize yield while minimizing resource use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products">
            <Button className="bg-violet-700 hover:bg-violet-800">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
