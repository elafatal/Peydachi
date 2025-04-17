import React, { useState } from 'react';

const L2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white bg-opacity-90 shadow-sm">
        <div className="text-2xl font-semibold text-gray-800">Pidachi</div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer">Login/Register</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md whitespace-nowrap cursor-pointer hover:bg-blue-700 transition-colors">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-76px)] flex items-center justify-center px-8 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://readdy.ai/api/search-image?query=Modern%20elegant%20gradient%20blue%20background%20with%20subtle%20abstract%20patterns%2C%20soft%20light%20effect%20creating%20a%20professional%20and%20clean%20atmosphere%2C%20perfect%20for%20product%20search%20website%20background%2C%20minimalist%20design%20with%20light%20blue%20tones&width=1440&height=800&seq=1&orientation=landscape" 
            alt="Background" 
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full z-10">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">Find Any Product Near You in Seconds</h1>
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              Discover local stores that have exactly what you're looking for. Save time and shop smarter with real-time product availability.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="mb-4 relative">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-12 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <i className="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full px-12 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md whitespace-nowrap cursor-pointer transition-colors">
              Search Nearby
            </button>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <button className="bg-white bg-opacity-80 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-all cursor-pointer">
            <i className="fas fa-chevron-left text-gray-700"></i>
          </button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <button className="bg-white bg-opacity-80 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-all cursor-pointer">
            <i className="fas fa-chevron-right text-gray-700"></i>
          </button>
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-medium text-gray-900 mb-10 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "fas fa-laptop" },
              { name: "Groceries", icon: "fas fa-shopping-basket" },
              { name: "Fashion", icon: "fas fa-tshirt" },
              { name: "Home & Garden", icon: "fas fa-home" }
            ].map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${category.icon} text-blue-600 text-2xl`}></i>
                </div>
                <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-medium text-gray-900 mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Search Products", 
                description: "Enter what you're looking for and your location to find stores nearby.",
                icon: "fas fa-search"
              },
              { 
                title: "Compare Options", 
                description: "View prices, availability, and distance to make the best choice.",
                icon: "fas fa-balance-scale"
              },
              { 
                title: "Shop Locally", 
                description: "Get directions to the store and purchase your item immediately.",
                icon: "fas fa-store"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <i className={`${step.icon} text-white`}></i>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Pidachi</h3>
              <p className="text-gray-400">Find any product near you in seconds with our real-time local inventory search.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
              <p className="text-gray-400">© 2025 Pidachi. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default L2;
