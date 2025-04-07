
import React from 'react';
import { Droplet, Thermometer, LineChart, BarChart, CloudRain, PieChart } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="w-16 h-16 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-violet-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: <Droplet size={32} />,
      title: "Water Conservation",
      description: "Optimize irrigation with precise soil moisture data, reducing water usage by up to 30%."
    },
    {
      icon: <Thermometer size={32} />,
      title: "Climate Monitoring",
      description: "Track temperature, humidity, and other climate factors to protect crops from extreme conditions."
    },
    {
      icon: <CloudRain size={32} />,
      title: "Weather Prediction",
      description: "Get accurate local weather forecasts to plan farming activities and protect your crops."
    },
    {
      icon: <LineChart size={32} />,
      title: "Yield Improvement",
      description: "Increase crop yields by 15-25% with data-driven decisions and timely interventions."
    },
    {
      icon: <BarChart size={32} />,
      title: "Resource Optimization",
      description: "Reduce fertilizer and pesticide use through targeted application based on real data."
    },
    {
      icon: <PieChart size={32} />,
      title: "Data Analysis",
      description: "Gain valuable insights from easy-to-understand analytics and reporting tools."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-violet-900">Why Choose Our Sensors?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our agricultural sensing technology provides multiple benefits that help you farm smarter, not harder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
