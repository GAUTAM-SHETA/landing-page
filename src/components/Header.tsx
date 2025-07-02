import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

// Accept props for category selection and clearing filter
const Header = ({ onCategorySelect, onShowAllProducts }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // List of categories (can be passed as prop if needed)
  const categories = ["Electronics", "Accessories", "Home", "Clothing", "Bags", "Lifestyle"];

  return (
    <header className="border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl font-light tracking-wide">RAKHDI</h1>
          </div>
          
          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <button
              className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base focus:outline-none bg-transparent border-none"
              onClick={() => {
                if (onShowAllProducts) onShowAllProducts();
              }}
              type="button"
            >
              Products
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                type="button"
              >
                Categories
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded shadow-lg z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => {
                        setDropdownOpen(false);
                        if (onCategorySelect) onCategorySelect(cat);
                      }}
                      type="button"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Contact</a>
          </nav>
          
          {/* Right side */}
          {/* <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white h-8 w-8 sm:h-10 sm:w-10">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white relative h-8 w-8 sm:h-10 sm:w-10">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white h-8 w-8 sm:h-10 sm:w-10">
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
