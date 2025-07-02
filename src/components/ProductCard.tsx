import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in the following product:\n` +
      `*Product:* ${product.title}\n` +
      `*Category:* ${product.category}\n` +
      `*Price:* ₹${product.price}\n` +
      `*Product Image:* ${product.image}\n`;
    // Send to specific number
    const whatsappUrl = `https://wa.me/918980241857?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openFullScreen = () => {
    setIsFullScreen(true);
    setTimeout(() => setShowModal(true), 10); // trigger animation
  };

  const closeFullScreen = () => {
    setShowModal(false);
    setTimeout(() => setIsFullScreen(false), 300); // match animation duration
  };

  // Full screen modal for mobile
  const ProductFullScreenMobile = ({ product, handleWhatsAppClick, closeFullScreen, showModal }) => (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'rgba(245, 245, 220, 0.55)' }}
      onClick={closeFullScreen}
    >
      <div
        className={`relative flex items-center justify-center w-full h-full transition-transform duration-300 ${showModal ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={closeFullScreen}
          className="absolute top-2 right-2 sm:top-6 sm:right-6 text-white hover:text-gray-300 bg-gray-800 bg-opacity-80 rounded-full p-2 shadow-lg focus:outline-none z-10"
          aria-label="Close full screen"
        >
          <X size={28} className="w-7 h-7" />
        </button>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-black rounded-lg sm:p-8 shadow-2xl w-full max-w-2xl mx-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full sm:w-auto sm:max-w-[40vw] sm:max-h-[70vh] object-contain rounded-t-lg shadow-lg mx-auto mb-4 sm:mb-0"
          />
          <div className="text-white w-full sm:max-w-md flex flex-col items-center sm:items-start"
            style={{ paddingLeft: "20px", paddingRight: "20px", marginBottom: "20px" }}
          >
            <p className="text-xs sm:text-sm text-gray-300 uppercase tracking-wide mb-2">{product.category}</p>
            <h3 className="text-xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-center sm:text-left">{product.title}</h3>
            <div className="text-lg sm:text-xl font-medium mb-4">₹{product.price}</div>
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto text-sm mb-2"
            >
              <MessageCircle size={16} className="sm:w-5 sm:h-5 " />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>);

  // Full screen modal for desktop/tablet
  const ProductFullScreenDesktop = ({ product, handleWhatsAppClick, closeFullScreen, showModal }) => (
    <div
      className={`fixed inset-0 z-50 hidden sm:flex items-center justify-center p-4 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'rgba(245, 245, 220, 0.55)' }}
      onClick={closeFullScreen}
    >
      <div
        className={`relative flex items-center justify-center w-full h-full transition-transform duration-300 ${showModal ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeFullScreen}
          className="absolute top-6 right-6 text-white hover:text-gray-300 bg-gray-800 bg-opacity-80 rounded-full p-2 shadow-lg focus:outline-none z-10"
          aria-label="Close full screen"
        >
          <X size={28} className="w-7 h-7" />
        </button>
        <div className="flex flex-row items-center bg-black rounded-lg shadow-2xl w-full max-w-2xl mx-2">
          <img
            src={product.image}
            alt={product.title}
            className="sm:w-auto sm:max-w-[40vw] sm:max-h-[60vh] object-contain rounded-l-lg shadow-lg mx-auto mb-0"
          />
          <div className="text-white sm:max-w-md flex flex-col items-start px-6">
            <p className="text-sm text-gray-300 uppercase tracking-wide mb-2">{product.category}</p>
            <h3 className="text-3xl font-semibold mb-4 text-left">{product.title}</h3>
            <div className="text-xl font-medium mb-4">₹{product.price}</div>
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 flex items-center justify-center gap-2 sm:w-auto text-sm mb-2 mt-4"
            >
              <MessageCircle size={16} />
              WhatsApp
            </Button>
          </div> 
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="group cursor-pointer">
        <div
          className="relative overflow-hidden rounded-lg bg-gray-900 mb-3 sm:mb-4"
          onClick={openFullScreen}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 sm:group-hover:opacity-20 transition-opacity duration-300" />
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">{product.category}</p>
          <h3 className="text-base sm:text-lg font-light group-hover:text-gray-300 transition-colors leading-tight">
            {product.title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
            <span className="text-lg sm:text-xl font-medium">₹{product.price}</span>
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto text-sm"
            >
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && (
        <>
          <ProductFullScreenMobile
            product={product}
            handleWhatsAppClick={handleWhatsAppClick}
            closeFullScreen={closeFullScreen}
            showModal={showModal}
          />
          <ProductFullScreenDesktop
            product={product}
            handleWhatsAppClick={handleWhatsAppClick}
            closeFullScreen={closeFullScreen}
            showModal={showModal}
          />
        </>
      )}
    </>
  );
};

export default ProductCard;
