
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { MailOpen, Phone, MapPin, Clock } from 'lucide-react';

const ContactInfoItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 shrink-0 mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-violet-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about our agricultural sensors? Need help choosing the right product? 
          Our team is ready to assist you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="mb-10 space-y-8">
            <ContactInfoItem icon={<MailOpen size={24} />} title="Email Us">
              <a href="mailto:info@violetagrisense.com" className="hover:text-violet-700">
                info@violetagrisense.com
              </a>
              <p className="mt-1">We'll respond within 24 hours</p>
            </ContactInfoItem>
            
            <ContactInfoItem icon={<Phone size={24} />} title="Call Us">
              <a href="tel:+15551234567" className="hover:text-violet-700">
                +1 (555) 123-4567
              </a>
              <p className="mt-1">Sales & Support</p>
            </ContactInfoItem>
            
            <ContactInfoItem icon={<MapPin size={24} />} title="Visit Us">
              <address className="not-italic">
                123 AgriTech Road<br />
                Farmington, CA 94538<br />
                United States
              </address>
            </ContactInfoItem>
            
            <ContactInfoItem icon={<Clock size={24} />} title="Business Hours">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </ContactInfoItem>
          </div>
          
          <div className="bg-violet-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-violet-900 mb-3">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest agricultural sensing technology, tips, and exclusive offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button className="bg-violet-700 text-white px-4 py-2 rounded-r-md hover:bg-violet-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <ContactForm />
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-violet-900 mb-6 text-center">Find Us</h2>
        <div className="rounded-lg overflow-hidden shadow-md h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968207!2d-122.15000896729893!3d37.44999904941219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb075776f1c3b%3A0xccc17e4da6b38370!2sPalo%20Alto%2C%20CA!5e0!3m2!1sen!2sus!4v1606520282044!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }} 
            allowFullScreen 
            aria-hidden="false" 
            tabIndex={0}
            title="Company Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
