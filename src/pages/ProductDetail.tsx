import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ShoppingCart,
  Check,
  Award,
  BarChart,
  Droplet,
} from "lucide-react";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

// Import the Product type
import { Product } from "@/components/ProductCard";

// Mock product data (same as in other components)
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

// Extended product details (would normally come from an API)
const productDetails: Record<number, any> = {
  1: {
    fullDescription:
      "The Smart Soil Moisture Sensor Pro is a cutting-edge solution for modern agriculture. It provides real-time monitoring of soil moisture levels at multiple depths, ensuring optimal water management for your crops. With wireless connectivity and a user-friendly mobile app, you can access data and receive alerts anywhere, anytime. The long-lasting battery and weather-resistant design make it perfect for season-long deployment in any field condition.",
    specifications: [
      { label: "Measurement Range", value: "0-100% volumetric water content" },
      { label: "Accuracy", value: "±2%" },
      { label: "Depth Options", value: "10cm, 20cm, 30cm, 40cm" },
      { label: "Connectivity", value: "4G LTE / WiFi / Bluetooth" },
      { label: "Battery Life", value: "Up to 12 months" },
      { label: "Weather Resistance", value: "IP67 rated" },
      { label: "Data Storage", value: "Cloud-based with offline backup" },
      { label: "Weight", value: "350g" },
      { label: "Dimensions", value: "15cm x 5cm x 3cm" },
    ],
    features: [
      "Real-time soil moisture monitoring",
      "Multiple depth measurements",
      "Wireless connectivity",
      "Mobile app with alerts and notifications",
      "Weather-resistant design",
      "Long battery life",
      "Easy installation",
      "Cloud data storage with analytics",
      "Irrigation automation integration",
    ],
  },
  2: {
    fullDescription:
      "The pH Sensor Pro is an advanced monitoring tool designed for precise measurement of acidity or alkalinity in various environments. Equipped with high-accuracy electrodes, this sensor provides real-time data on pH levels in soil, water, or industrial processes. The system helps users maintain optimal conditions for agriculture, aquaculture, and chemical applications by delivering consistent, reliable pH readings. With its durable construction and easy-to-integrate design, the pH Sensor Pro is ideal for ensuring the health of crops, monitoring water quality, or controlling chemical processes.",
    specifications: [
      { label: "Temperature Range", value: "-40°C to +65°C (±0.3°C accuracy)" },
      { label: "Humidity Range", value: "0-100% RH (±2% accuracy)" },
      {
        label: "Rainfall Measurement",
        value: "0.2mm resolution tipping bucket",
      },
      { label: "Wind Speed", value: "0-200 km/h (±3% accuracy)" },
      { label: "Wind Direction", value: "16-point compass (±3° accuracy)" },
      { label: "Solar Radiation", value: "0-1800 W/m² pyranometer" },
      {
        label: "Barometric Pressure",
        value: "300-1100 hPa (±0.5 hPa accuracy)",
      },
      { label: "Power Source", value: "Solar panel with battery backup" },
      { label: "Data Transmission", value: "4G/WiFi/LoRaWAN" },
    ],
    features: [
      "All-in-one weather monitoring",
      "Solar powered with battery backup",
      "Real-time data transmission",
      "Historical data analysis",
      "Weather forecasting capabilities",
      "Frost and heat alerts",
      "Evapotranspiration calculation",
      "Disease risk modeling",
      "API integration with farm management software",
    ],
  },
  3: {
    fullDescription:
      "The Crop Health Monitor Pro is an advanced monitoring system designed to provide real-time insights into the health and growth of crops. Utilizing a combination of multispectral imaging, environmental sensors, and AI-driven analytics, it detects early signs of stress, nutrient deficiencies, disease, and pest infestations. This powerful tool helps farmers make data-informed decisions to optimize crop yields, reduce input costs, and enhance sustainability. With remote monitoring capabilities and intuitive mobile app integration, the Crop Health Monitor Pro ensures proactive crop management from anywhere, at any time.",

    specifications: [
      { label: "Connectivity", value: "Wireless (4G/WiFi/Bluetooth)" },
      { label: "Power Source", value: "Rechargeable battery/Solar" },
      { label: "Weather Resistance", value: "IP65 or higher" },
      { label: "Data Storage", value: "Cloud-based with local backup" },
      { label: "Warranty", value: "2 years" },
    ],
    features: [
      "Multispectral imaging for crop analysis",
      "Real-time health monitoring",
      "AI-powered diagnostics",
      "Wireless connectivity",
      "Mobile app integration",
      "Weather-resistant design",
      "Long battery life",
      "Cloud data storage",
      "Comprehensive crop health reports",
    ],
  },
  4: {
    fullDescription:
      "The Irrigation Controller Pro is a state-of-the-art system designed to automate and optimize irrigation processes for agricultural, landscaping, and horticultural applications. Equipped with advanced sensors and weather data integration, it adjusts watering schedules based on real-time soil moisture levels, weather conditions, and plant requirements. The system offers customizable settings for efficient water usage, helping to reduce waste while ensuring plants receive the right amount of hydration. With remote access and easy-to-use controls, the Irrigation Controller Pro empowers users to manage their irrigation systems from anywhere, promoting sustainability and improving water conservation.",
    specifications: [
      { label: "Connectivity", value: "Wireless (4G/WiFi/Bluetooth)" },
      { label: "Power Source", value: "Rechargeable battery/Solar" },
      { label: "Weather Resistance", value: "IP65 or higher" },
      { label: "Data Storage", value: "Cloud-based with local backup" },
      { label: "Warranty", value: "2 years" },
    ],
    features: [
      "Real-time monitoring",
      "Wireless connectivity",
      "Mobile app integration",
      "Weather-resistant design",
      "Long battery life",
      "Easy installation",
      "Cloud data storage",
      "Comprehensive analytics",
    ],
  },
  5: {
    fullDescription:
      "The Soil Nutrient Analyzer Pro is a cutting-edge device designed to accurately assess soil fertility and nutrient composition in real time. Ideal for agricultural, horticultural, and research applications, it measures key nutrient levels such as nitrogen (N), phosphorus (P), and potassium (K), along with pH and organic matter content. By delivering instant, actionable insights into soil health, this tool enables farmers and agronomists to make informed decisions on fertilization and crop management. With wireless connectivity and mobile app integration, the Soil Nutrient Analyzer Pro streamlines soil testing, enhances productivity, and supports sustainable farming practices.",

    specifications: [
      { label: "Connectivity", value: "Wireless (4G/WiFi/Bluetooth)" },
      { label: "Power Source", value: "Rechargeable battery/Solar" },
      { label: "Weather Resistance", value: "IP65 or higher" },
      { label: "Data Storage", value: "Cloud-based with local backup" },
      { label: "Warranty", value: "2 years" },
    ],

    features: [
      "Real-time soil nutrient analysis",
      "Measures NPK, pH, and organic matter",
      "Wireless connectivity",
      "Mobile app integration",
      "Weather-resistant design",
      "Long battery life",
      "Easy-to-use interface",
      "Cloud data storage",
      "Actionable soil health reports",
    ],
  },
  6: {
    fullDescription:
      "The Water Flow Meter Pro is a high-precision device engineered to measure and monitor water flow rates in irrigation systems, water supply lines, and agricultural setups. Designed for accuracy and durability, it provides real-time data on water usage, helping users optimize irrigation efficiency, detect leaks, and reduce water waste. With seamless wireless connectivity and cloud-based data logging, the Water Flow Meter Pro supports smarter water management through continuous monitoring and detailed usage analytics. Its rugged, weather-resistant design ensures reliable performance even in harsh field conditions, making it an essential tool for sustainable and data-driven water use.",

    specifications: [
      { label: "Connectivity", value: "Wireless (4G/WiFi/Bluetooth)" },
      { label: "Power Source", value: "Rechargeable battery/Solar" },
      { label: "Weather Resistance", value: "IP66 or higher" },
      { label: "Data Storage", value: "Cloud-based with local backup" },
      { label: "Warranty", value: "2 years" },
    ],

    features: [
      "Accurate water flow measurement",
      "Real-time monitoring and alerts",
      "Wireless connectivity",
      "Mobile and web app integration",
      "Weather-resistant design",
      "Leak detection and diagnostics",
      "Long battery life",
      "Cloud data logging and analytics",
      "Easy installation and maintenance",
    ],
  },
  7: {
    fullDescription:
      "The Drone Field Scanner Pro is a cutting-edge aerial monitoring solution designed to revolutionize crop and field analysis. Equipped with high-resolution RGB and multispectral cameras, it captures detailed imagery and environmental data to assess plant health, detect stress, map variability, and monitor field conditions with unmatched accuracy. Ideal for precision agriculture, this autonomous drone system provides rapid coverage of large areas, generating actionable insights for optimized fertilization, irrigation, and pest control. With real-time data transmission, cloud-based processing, and easy flight planning via a mobile app, the Drone Field Scanner Pro empowers farmers to make smarter, data-driven decisions while saving time and resources.",

    specifications: [
      { label: "Flight Time", value: "Up to 40 minutes per charge" },
      { label: "Camera", value: "High-res RGB + Multispectral imaging" },
      { label: "Connectivity", value: "4G/WiFi/Radio control" },
      { label: "Data Storage", value: "Cloud-based with onboard SD backup" },
      {
        label: "Weather Resistance",
        value: "IP54 (splash and dust resistant)",
      },
      { label: "Warranty", value: "2 years" },
    ],

    features: [
      "Autonomous flight planning",
      "Real-time aerial data capture",
      "Multispectral crop health analysis",
      "Cloud-based image processing",
      "Field variability and stress mapping",
      "Mobile and web dashboard access",
      "Seamless integration with farm management systems",
      "High-resolution visual and thermal imaging",
      "Easy deployment and control via mobile app",
    ],
  },
  8: {
    fullDescription:
      "The Temperature & Humidity Sensor Pro is a precision environmental monitoring device designed for agricultural, greenhouse, and industrial applications. It continuously measures ambient temperature and relative humidity with high accuracy, providing real-time data to support climate control, crop management, and storage optimization. Whether used in open fields, greenhouses, or storage facilities, this sensor helps ensure optimal conditions for plant growth, reduce risks of disease, and maintain product quality. With wireless connectivity, durable weather-resistant housing, and cloud data integration, the Temperature & Humidity Sensor Pro delivers dependable performance and actionable insights for smarter environmental management.",

    specifications: [
      {
        label: "Measurement Range",
        value: "Temperature: -40°C to 85°C, Humidity: 0–100% RH",
      },
      { label: "Connectivity", value: "Wireless (4G/WiFi/Bluetooth)" },
      { label: "Power Source", value: "Rechargeable battery/Solar" },
      { label: "Weather Resistance", value: "IP65 or higher" },
      { label: "Data Storage", value: "Cloud-based with local backup" },
      { label: "Warranty", value: "2 years" },
    ],

    features: [
      "Real-time temperature and humidity monitoring",
      "High-accuracy sensors",
      "Wireless data transmission",
      "Mobile and web app integration",
      "Weather-resistant design",
      "Solar-powered option for remote deployment",
      "Cloud-based data storage and analysis",
      "Custom alerts for threshold breaches",
      "Easy installation and maintenance",
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id || "1");
  const { addToCart } = useCart();

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h1>
        <p className="mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // Get product details or use default if not available
  const details = productDetails[productId];

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/products"
          className="text-violet-600 hover:text-violet-900 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
        </Link>
      </div>

      {/* Product Overview */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `/${product.image}`
              }
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <span className="inline-block bg-violet-100 text-violet-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">5.0 (24 reviews)</span>
            </div>
            <p className="text-gray-600 mb-6">{details.fullDescription}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Key Features
              </h3>
              <ul className="space-y-2">
                {details.features
                  .slice(0, 4)
                  .map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-violet-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                In Stock
              </span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                className="bg-violet-700 hover:bg-violet-800 flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="border-violet-600 text-violet-600 hover:bg-violet-50 flex-1"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.specifications.map((spec: any, index: number) => (
              <div key={index} className="flex items-center">
                <div className="min-w-[180px] font-medium text-gray-700">
                  {spec.label}:
                </div>
                <div className="text-gray-600">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-violet-50 rounded-lg overflow-hidden mb-8 p-6">
        <h2 className="text-2xl font-bold text-violet-900 mb-6">
          Why Choose This Product?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Built with durable materials and components to withstand harsh
              field conditions for years.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Data-Driven Insights
            </h3>
            <p className="text-gray-600">
              Advanced analytics help you make better decisions and optimize
              your agricultural operations.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-4">
              <Droplet className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Resource Efficiency
            </h3>
            <p className="text-gray-600">
              Helps reduce water and resource usage while improving crop yield
              and quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
