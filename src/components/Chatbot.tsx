import React, { useState, useRef, useEffect } from 'react';


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your AgriAssistant. How can I help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages([...messages, { text: inputMessage, isBot: false }]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('sensor') && (input.includes('price') || input.includes('cost'))) {
      return "Our sensor prices range from $99 for basic soil moisture sensors to $499 for our advanced weather stations. You can view detailed pricing on our Products page.";
    }
    else if (input.includes('shipping') || input.includes('delivery')) {
      return "We offer free shipping on orders over $200. Standard shipping takes 3-5 business days, and express shipping options are available at checkout.";
    }
    else if (input.includes('warranty')) {
      return "All our sensors come with a 2-year manufacturer warranty. Extended warranty options are available for purchase.";
    }
    else if (input.includes('battery') || input.includes('batteries')) {
      return "Most of our sensors use rechargeable batteries that last 6-12 months on a single charge, depending on usage frequency. Some models also support solar charging.";
    }
    else if (input.includes('installation')) {
      return "Our sensors are designed for easy self-installation. Each product comes with detailed instructions, and we have tutorial videos on our website. Our support team is also available if you need assistance.";
    }
    else if (input.includes('data') && input.includes('storage')) {
      return "Our basic plan includes 12 months of data storage at no extra cost. Premium plans offer extended storage and advanced analytics features.";
    }
    else if (input.includes('app') || input.includes('mobile app')) {
      return "Our mobile app is available for free on both iOS and Android. It allows you to monitor all your sensors in real-time and access historical data.";
    }
    else if (input.includes('contact') || input.includes('support') || input.includes('help')) {
      return "You can reach our support team at support@agrisensors.com or call us at 1-800-AGR-SENS during business hours (Mon-Fri, 9AM-5PM EST).";
    }
    else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! How can I help with your agricultural sensing needs today?";
    }
    else if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help with?";
    }
    else if (input.includes('bye') || input.includes('goodbye')) {
      return "Thank you for chatting with us! Feel free to return if you have more questions.";
    }
    else if (input.includes('soil sensor') || input.includes('moisture sensor')) {
      return "Our soil moisture sensors help you optimize irrigation by monitoring moisture levels at different soil depths. They connect wirelessly to our app for real-time monitoring.";
    }
    else if (input.includes('weather') || input.includes('climate')) {
      return "Our weather stations measure temperature, humidity, rainfall, wind speed and direction, and solar radiation. They help you make informed decisions about planting, irrigation, and harvest timing.";
    }
    else {
      return "Thanks for your message! That's a great question about agriculture sensing. Would you like me to connect you with our product specialist for more detailed information? You can also check our FAQ section or call us at 1-800-AGR-SENS.";
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button 
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-violet-600 text-white rounded-full p-4 shadow-lg hover:bg-violet-700 transition-all z-50"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>


      <div className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>

        <div className="bg-violet-700 text-white p-4 flex justify-between items-center">
          <h3 className="font-medium text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            AgriAssistant
          </h3>
          <button onClick={toggleChatbot} className="text-white hover:text-violet-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="h-80 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`p-3 rounded-lg max-w-3/4 ${message.isBot ? 'bg-violet-100 text-gray-800' : 'bg-violet-600 text-white'}`}>
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="p-3 rounded-lg bg-violet-100 text-gray-800">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
          <button 
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded-r-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;