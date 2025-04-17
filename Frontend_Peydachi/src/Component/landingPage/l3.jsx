import React, { useState } from 'react';

// Sample data
const categories = [
  {
    name: "Electronics",
    itemCount: "1,245",
    imageUrl: "https://readdy.ai/api/search-image?query=Modern%20electronic%20devices%20including%20smartphones%2C%20laptops%2C%20and%20headphones%20arranged%20neatly%20on%20a%20clean%20white%20surface%20with%20soft%20shadows.%20The%20image%20has%20a%20professional%20product%20photography%20look%20with%20excellent%20lighting%20and%20crisp%20details&width=400&height=300&seq=2&orientation=landscape"
  },
  {
    name: "Fashion",
    itemCount: "2,389",
    imageUrl: "https://readdy.ai/api/search-image?query=Stylish%20fashion%20items%20including%20clothing%2C%20accessories%2C%20and%20shoes%20arranged%20aesthetically%20on%20a%20minimalist%20background.%20The%20image%20has%20professional%20lighting%20with%20soft%20shadows%20highlighting%20the%20textures%20and%20colors%20of%20the%20fashion%20products&width=400&height=300&seq=3&orientation=landscape"
  },
  {
    name: "Home & Garden",
    itemCount: "1,879",
    imageUrl: "https://readdy.ai/api/search-image?query=Beautiful%20home%20decor%20and%20garden%20items%20arranged%20in%20an%20aesthetic%20display%20with%20indoor%20plants%2C%20decorative%20objects%2C%20and%20furniture%20pieces.%20The%20image%20has%20a%20bright%2C%20airy%20feel%20with%20natural%20lighting%20highlighting%20the%20textures%20and%20colors&width=400&height=300&seq=4&orientation=landscape"
  },
  {
    name: "Groceries",
    itemCount: "3,456",
    imageUrl: "https://readdy.ai/api/search-image?query=Fresh%20groceries%20and%20food%20items%20neatly%20arranged%20including%20fruits%2C%20vegetables%2C%20packaged%20goods%2C%20and%20pantry%20staples.%20The%20image%20has%20bright%20natural%20lighting%20on%20a%20clean%20background%20highlighting%20the%20vibrant%20colors%20and%20freshness%20of%20the%20products&width=400&height=300&seq=5&orientation=landscape"
  }
];

const steps = [
  {
    icon: "fas fa-search",
    title: "Search for Products",
    description: "Enter what you're looking for and your location to find stores nearby that have it in stock."
  },
  {
    icon: "fas fa-map-marked-alt",
    title: "Compare Availability",
    description: "View real-time inventory across multiple stores and compare prices to find the best option."
  },
  {
    icon: "fas fa-shopping-bag",
    title: "Shop Confidently",
    description: "Head to the store knowing exactly what's in stock, saving you time and unnecessary trips."
  }
];

const L3 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-semibold text-gray-800">Pidachy</div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md whitespace-nowrap cursor-pointer">
              Sign Up
            </button>
            <button className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors rounded-md whitespace-nowrap cursor-pointer">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20modern%20gradient%20background%20with%20soft%20blue%20tones%20transitioning%20from%20light%20to%20deep%20blue%2C%20creating%20a%20clean%20and%20professional%20atmosphere%20perfect%20for%20a%20product%20search%20website.%20The%20background%20has%20a%20subtle%20pattern%20that%20adds%20depth%20without%20being%20distracting&width=1440&height=800&seq=1&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 py-16 z-10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find Any Product Near You in Seconds
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Discover local stores that have exactly what you're looking for. Save time and shop smarter with real-time product availability.
              </p>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                <div className="mb-4 relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full px-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mb-4 relative">
                  <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium rounded-md whitespace-nowrap cursor-pointer">
                  Search Nearby
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popular Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-40 overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{category.itemCount} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Find products in local stores in just a few simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`${step.icon} text-blue-600 text-xl`}></i>
                </div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Pidachy</h3>
              <p className="text-gray-400">
                Find any product near you in seconds. Save time and shop smarter.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <p className="text-gray-400">
                © 2025 Pidachy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default L3;
