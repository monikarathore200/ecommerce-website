import React from 'react';


export default function Banner() {
  return (
    <div className="banner d-flex align-items-center justify-content-center text-center text-white">
      <div className="container">
        <h1 className="fw-bold display-4 mb-3">Discover Quality Products</h1>
        <p className="lead mb-4">Find everything you need at unbeatable prices</p>
        <button className="btn btn-light btn-lg fw-semibold">Shop Now</button>
      </div>
    </div>
  );
}
