
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Benefits from '@/components/Benefits';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Benefits />
      
      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-violet-800 to-violet-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Farming Practices?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-violet-100">
            Join thousands of farmers who are using our sensors to increase yields, reduce resource usage, and make data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button className="bg-white text-violet-900 hover:bg-violet-100 font-bold px-8 py-3">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="text-white border-white hover:bg-violet-700 font-bold px-8 py-3">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-violet-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violet-900">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "These sensors have helped me reduce water usage by 25% while improving my crop yield. The ROI was achieved in just one growing season.",
                author: "Michael Thompson",
                role: "Vineyard Owner"
              },
              {
                quote: "The weather station and soil sensors work together seamlessly. The data insights have transformed how I make decisions for my farm.",
                author: "Sarah Johnson",
                role: "Organic Farmer"
              },
              {
                quote: "Customer support is exceptional. They helped me set up my entire sensor network and the mobile app is incredibly user-friendly.",
                author: "Robert Garcia",
                role: "Large-scale Corn Producer"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4 text-violet-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
