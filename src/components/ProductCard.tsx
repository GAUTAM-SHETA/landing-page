import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";

interface Product {
  id: number;
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
  const [imgError, setImgError] = useState(false);

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in the following product:\n` +
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

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isFullScreen]);

  // Unified full screen modal for all devices
  const ProductFullScreenModal = ({ product, handleWhatsAppClick, closeFullScreen, showModal }) => (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 bg-white bg-opacity-70`}
      onClick={closeFullScreen}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl flex flex-col items-center pb-4 border-4 border-violet-200 transition-transform duration-300 ${showModal ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeFullScreen}
          className="absolute top-0 right-0 text-violet-700 hover:text-violet-900 bg-white bg-opacity-80 rounded-full p-1 shadow focus:outline-none z-10 border border-violet-200"
          style={{ margin: '-13px' }}
          aria-label="Close full screen"
        >
          <X size={28} className="w-6 h-6" />
        </button>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-center items-center">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.category}
                className="w-full max-w-md max-h-[60vh] object-contain bg-gradient-to-br from-violet-50 to-violet-100"
                style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full max-w-md max-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-200 border-2 border-dashed border-gray-400 py-12"
                style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", "height": "330px", "width": "330px" }}>
                <span className="text-6xl mb-4">🏵️</span>
                <span className="text-2xl font-extrabold text-gray-700 mb-2 tracking-wide drop-shadow-lg">Oops! No Image Found</span>
                <span className="text-base text-gray-500 italic text-center max-w-xs px-2">Please check back later or contact us for details.</span>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col items-center mt-5">
            <div className="w-full flex justify-between items-center px-4 ">
              <span className="text-3xl sm:text-3xl font-bold text-violet-800 drop-shadow">₹{product.price}</span>
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold shadow-md px-6 py-2 rounded-full flex items-center gap-2 text-base transition-all duration-300"
              >
                <MessageCircle size={24} />
                Order Now
              </Button>
            </div>
            <span className="text-sm text-gray-400 mt-3">We respond quickly on WhatsApp!</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="group cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
        style={{ backgroundColor: '#3b3b3b' } /* light beige background */}
      >
        <div
          className="relative overflow-hidden rounded-t-2xl bg-gray-50 shadow-lg mb-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center min-h-64 sm:min-h-72 lg:min-h-80"
          onClick={openFullScreen}
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.category}
              className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-105 rounded-t-2xl"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-64 sm:h-72 lg:h-80 flex flex-col items-center justify-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-200 rounded-t-2xl border-2 border-dashed border-gray-400">
              <span className="text-6xl mb-4">🏵️</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-2 tracking-wide drop-shadow-lg">
                Oops! No Image Not Found
              </span>
              <span className="text-base sm:text-lg text-gray-500 italic text-center max-w-xs px-2">
                Please check back later or contact us for details.
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-3 mb-3 px-4 ">
          <span className="text-2xl sm:text-3xl font-bold text-white-700">
            ₹{product.price}
          </span>
          <Button
            size="sm"
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold shadow-md px-6 py-2 rounded-full flex items-center gap-2 text-base transition-all duration-300"
          >
            <MessageCircle size={18} className="" />
            Order Now
          </Button>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && (
        <ProductFullScreenModal
          product={product}
          handleWhatsAppClick={handleWhatsAppClick}
          closeFullScreen={closeFullScreen}
          showModal={showModal}
        />
      )}
    </>
  );
};

export default ProductCard;
