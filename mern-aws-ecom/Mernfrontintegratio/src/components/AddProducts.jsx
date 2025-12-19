import React, { useState } from 'react'
import { API } from "../utils/api"; 

export default function AddProducts() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("electronics")
  const [stock, setStock] = useState("")
  const [brand, setBrand] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) newErrors.name = "Product name is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!price || parseFloat(price) <= 0) newErrors.price = "Valid price is required"
    if (!image.trim()) newErrors.image = "Image URL is required"
    if (!stock || parseInt(stock) < 0) newErrors.stock = "Valid stock quantity is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSuccess(false)
    
    try {
      const res = await fetch(`${API}/api/postProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          image,
          category,
          stock: parseInt(stock),
          brand: brand || undefined
        })
      })
      
      if (res.ok) {
        setSuccess(true)
        setName("")
        setDescription("")
        setPrice("")
        setImage("")
        setCategory("electronics")
        setStock("")
        setBrand("")
        setErrors({})
        
        setTimeout(() => setSuccess(false), 5000)
      } else {
        alert("Failed to add product. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Server error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    "electronics",
    "clothing",
    "home",
    "books",
    "beauty",
    "sports",
    "toys",
    "food",
    "other"
  ]

  const resetForm = () => {
    setName("")
    setDescription("")
    setPrice("")
    setImage("")
    setCategory("electronics")
    setStock("")
    setBrand("")
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-500">Fill in the details to add a product to your store</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-700 font-medium">Product added successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  placeholder="Describe your product..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition ${errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition ${errors.stock ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                </div>
              </div>

              {/* Category and Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Brand (Optional)</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
                    placeholder="Brand name"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition ${errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold rounded-xl transition-all"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live Preview
              </h3>
              
              <div className="border-2 border-gray-100 rounded-xl overflow-hidden">
                {/* Image Preview */}
                {image ? (
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image'
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Product Info */}
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 truncate text-lg">
                    {name || "Product Name"}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {description || "Product description will appear here..."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-orange-500">
                      ₹{price || "0"}
                    </span>
                    <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {stock ? `${stock} in stock` : "Stock: 0"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    {category && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    )}
                    {brand && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {brand}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}