import { useState } from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";

const Index = () => {
  const allRakhdis = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 299,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center",
      category: "Electronics"
    },
    {
      id: 2,
      title: "Minimalist Watch Collection",
      price: 199,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
      category: "Accessories"
    },
    {
      id: 3,
      title: "Designer Coffee Mug",
      price: 29,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop&crop=center",
      category: "Home"
    },
    {
      id: 4,
      title: "Organic Cotton T-Shirt",
      price: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center",
      category: "Clothing"
    },
    {
      id: 5,
      title: "Leather Backpack",
      price: 149,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center",
      category: "Bags"
    },
    {
      id: 6,
      title: "Smart Water Bottle",
      price: 89,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&crop=center",
      category: "Lifestyle"
    }
  ];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtered products
  const filteredRakhdis = selectedCategory
    ? allRakhdis.filter((r) => r.category === selectedCategory)
    : allRakhdis;

  // Handler for category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Handler to show all products
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        onCategorySelect={handleCategorySelect}
        onShowAllProducts={handleShowAllProducts}
      />

      {/* Products Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
              {selectedCategory ? `${selectedCategory} Products` : "Featured Products"}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Discover our carefully curated collection of premium goods
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredRakhdis.map((rakhdi) => (
              <ProductCard key={rakhdi.id} product={rakhdi} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-light mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Get notified about new products and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
            />
            <Button className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 text-sm sm:text-base">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
