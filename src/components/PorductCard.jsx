import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CommonContext } from "../ContextApi/Context";
import { toast } from "react-toastify";
import { IoMdHeart } from "react-icons/io";

export default function PorductCard({ data }) {
  const [rating, setRating] = useState([]);

  var discount_price = (data.price * data.discount_percentage) / 100;
  var discount_price = data.price - discount_price;

  useEffect(() => {
    let rating = [];
    for (let i = 1; i <= data.rating; i++) {
      rating.push(i);
    }
    setRating(rating);
  }, []);

  let { cartItems, setCartItems , wishList, setWishList } = useContext(CommonContext);

  const addToCart = (productInfo) => {
    const checkProduct = cartItems.filter((v) => {
      if (productInfo.id == v.id) {
        return v;
      }
    });

    if (checkProduct.length > 0) {
      const cartData = cartItems.map((v) => {
        if (productInfo.id == v.id) {
          if (v.quantity < 3) {
            v.quantity++;
            toast.success("cart update sucesfully");
            return v;
          } else {
            toast.error("Maximum value reached");
            return v;
          }
        } else {
          return v;
        }
      });

      const finalData = [...cartItems];
      setCartItems(finalData);
      localStorage.setItem("cartItems", JSON.stringify(finalData));
    } else {
      const info = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.image,
        category_name: productInfo.category_name,
        description: productInfo.description,
        quantity: 1,
      };

      const finalData = [info, ...cartItems];
      setCartItems(finalData);
      localStorage.setItem("cartItems", JSON.stringify(finalData));
      toast.success("Add to cart succesfully");

      console.log(info);
    }
  };

  const wishlistProduct = (productInfo) => {
    const checkWish = wishList.filter((v) => productInfo.id === v.id);

    if (checkWish.length > 0) {
      const updatedWishList = wishList.map((data) => {
        if (productInfo.id === data.id) {
          toast.warn("Oops! This item is already in your wishlist.");
          return data; // do not add again
        } else {
          return data;
        }
      });

      setWishList(updatedWishList);
      localStorage.setItem("wishitem", JSON.stringify(updatedWishList));
    } else {
      const info = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.image,
        category_name: productInfo.category_name,
        description: productInfo.description,
        brand_name: productInfo.brand_name,
        rating: productInfo.rating,
        quantity: 1,
      };

      const finalData = [info, ...wishList];
      setWishList(finalData);
      localStorage.setItem("wishitem", JSON.stringify(finalData));
      toast.success("Added to wishlist ❤");
    }
  };
  return (
    <>
      <div className="col">
        <div className="card h-100 product-card">
          <div className="position-relative">
            <img
              src={data.image}
              className="card-img-top"
              alt="Ultra HD 4K Smart TV"
            />
            {data.brand_name ? (
              <span className="position-absolute top-0 start-0 badge bg-danger m-2">
                {data.brand_name}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="card-body">
            <Link to={`/product-details/${data.id}`}>
              <h5 className="card-title">{data.name}</h5>
            </Link>

            <p className="card-text text-muted small mb-0">
              {data.category_name}
            </p>
            <div className="d-flex align-items-center mb-2">
              <div className="text-warning me-1">
                {rating.map((v, i) => {
                  return <i className="fa fa-star" key={i}></i>;
                })}
              </div>
              <span className="text-muted small">4.5</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {data.discount_percentage > 0 ? (
                  <>
                    <span className="fs-5 fw-bold">
                      {" "}
                      Rs.{discount_price.toFixed(2)}
                    </span>
                    <span className="text-decoration-line-through text-muted ms-2">
                      Rs. {data.price}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="fs-5 fw-bold">Rs. {data.price}</span>
                  </>
                )}
              </div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => addToCart(data)}
              >
                <i className="fa fa-shopping-cart"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => wishlistProduct(data)}
              >
                <IoMdHeart />
                       
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
