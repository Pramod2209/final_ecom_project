import React, { useEffect, useState } from 'react'
import { API } from "../utils/api"; 
import { Link, useParams } from 'react-router-dom';

export default function Product({ cart, setCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);

    const addToCart = () => {
      if (product) {
        setCart([...cart, product]);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    };
    
    useEffect(() => {
      fetch(`${API}/api/getproduct`)
        .then(res => res.json())
        .then(allproducts => {
          const product = allproducts.find((p) => p._id === id);
          setProduct(product);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }, [id]); // Added dependency to prevent infinite re-fetching

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                Products
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
            {/* Product Image */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Image Gallery (if available) */}
              <div className="flex space-x-3 mt-6">
                <div className="w-20 h-20 rounded-lg border-2 border-blue-500 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Add more thumbnail images here if you have them */}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                  <span className="ml-4 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Free Shipping
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Additional Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Product Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Product ID</p>
                      <p className="text-gray-700 font-medium">{product._id?.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-gray-700 font-medium">{product.category || "General"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">In Stock</p>
                      <p className="text-green-600 font-medium">Available</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Warranty</p>
                      <p className="text-gray-700 font-medium">1 Year</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8">
                <Link 
                  to={`/buynow/${product._id}`}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 px-6 rounded-xl text-center transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mb-6"
                >
                  Buy Now
                </Link>
                
                <div className="grid grid-cols-2 gap-5">
                  <button className="border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </button>
                  <button 
                    onClick={addToCart}
                    className={`border-2 ${addedToCart ? 'border-green-500 bg-green-50 text-green-600' : 'border-orange-500 hover:border-orange-600 bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700'} font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    {addedToCart ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Added!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    <span className="inline-flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      30-Day Return Policy • Secure Payment
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* You can add related products here */}
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">More products coming soon!</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-8 pb-4">
          <Link 
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}