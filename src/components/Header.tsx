import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Accept props for category selection and clearing filter
const Header = ({ onCategorySelect, onShowAllProducts, categories }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close mobile dropdown on outside click
  useEffect(() => {
    function handleMobileDropdownClickOutside(event: MouseEvent) {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) {
      document.addEventListener("mousedown", handleMobileDropdownClickOutside);
    } else {
      document.removeEventListener("mousedown", handleMobileDropdownClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleMobileDropdownClickOutside);
    };
  }, [drawerOpen]);

  // List of categories (can be passed as prop if needed)
  // const categories = ["Electronics", "Accessories", "Home", "Clothing", "Bags", "Lifestyle"];

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
            {categories && categories.length > 0 && (
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
            )}
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Contact</a>
          </nav>
          {/* Mobile Navigation - Visible on mobile only */}
          <nav className="flex md:hidden items-center space-x-2 relative">
            <div className="relative">
              <button
                ref={dropdownButtonRef}
                className="text-gray-300 hover:text-white transition-colors text-base focus:outline-none px-3 py-1 rounded-md border border-gray-700 bg-gray-900 flex items-center"
                onClick={() => setDrawerOpen((open) => !open)}
                type="button"
              >
                <Menu className="inline-block mr-2" size={20} /> Menu
              </button>
              {drawerOpen && (
                <div
                  ref={mobileDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-gray-950 border border-gray-800 rounded shadow-2xl z-50 animate-fadeIn"
                >
                  <button
                    className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-t"
                    onClick={() => {
                      setDrawerOpen(false);
                      if (onShowAllProducts) onShowAllProducts();
                    }}
                    type="button"
                  >
                    Products
                  </button>
                  {categories && categories.length > 0 && (
                    <div className="border-t border-gray-800">
                      <div className="text-gray-400 text-xs uppercase px-4 pt-2 pb-1 tracking-wider">Categories</div>
                      {categories.map((cat, idx) => (
                        <button
                          key={cat}
                          className={`block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white ${idx === categories.length - 1 ? 'rounded-b' : ''}`}
                          style={{ marginLeft: "15px" }}
                          onClick={() => {
                            setDrawerOpen(false);
                            if (onCategorySelect) onCategorySelect(cat);
                          }}
                          type="button"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Only show border if categories exist */}
                  <div className={(categories && categories.length > 0) ? "border-t border-gray-800 mt-2 pt-1" : ""}>
                    <a href="#" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white">About</a>
                    <a href="#" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-b">Contact</a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
      {/* Removed Side Drawer for Mobile */}
    </header>
  );
};

export default Header;
