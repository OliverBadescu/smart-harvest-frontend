
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-violet-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">SmartHarvest</h3>
            <p className="text-violet-200 mb-4">
              Revolutionizing agriculture with smart sensing technology. Monitor your crops efficiently and sustainably.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-violet-200 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-violet-200 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-violet-200 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-violet-200 hover:text-white">Soil Moisture Sensors</Link>
              </li>
              <li>
                <Link to="/products" className="text-violet-200 hover:text-white">Weather Stations</Link>
              </li>
              <li>
                <Link to="/products" className="text-violet-200 hover:text-white">Crop Monitoring Systems</Link>
              </li>
              <li>
                <Link to="/products" className="text-violet-200 hover:text-white">Water Management Solutions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-violet-200 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-violet-200 hover:text-white">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-violet-200 hover:text-white">Contact</Link>
              </li>
              <li>
                <a href="#" className="text-violet-200 hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-violet-200">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-violet-200">
                <Mail size={16} className="mr-2" />
                <span>info@violetagrisense.com</span>
              </li>
              <li className="flex items-start text-violet-200">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>Sibiu, Faculty of Science</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-violet-800 mt-8 pt-8 text-center text-violet-300">
          <p>&copy; {new Date().getFullYear()} SmartHarvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
