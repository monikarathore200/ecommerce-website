import React from 'react'
import Header from './common/Header'

export default function AboutUs() {
  return (
    <>
      
     
    name: 'Smart Wireless Headphones',
    price: 2499,
    image: 'https://cdn.pixabay.com/photo/2016/11/29/05/08/adult-1868750_1280.jpg',
    description:
      'Experience high-quality sound with these smart wireless headphones. Designed for comfort and excellent audio performance.',
    category: 'Electronics',
    brand: 'SoundMax',
  

  const p = product || sampleProduct;

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={p.image}
            alt={p.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px' }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="fw-bold">{p.name}</h2>
          <p className="text-muted mb-2">Category: {p.category}</p>
          <p className="text-muted mb-2">Brand: {p.brand}</p>
          <h3 className="text-danger fw-semibold mb-4">₹{p.price}</h3>
          <p className="mb-4">{p.description}</p>
          <button className="btn btn-primary btn-lg">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );


export default ProductDetail;

    </>
  )
}
