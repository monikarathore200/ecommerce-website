import React, { createContext, useState } from 'react'


const CommonContext = createContext();

export default function Context({children}) {


    var cartData = localStorage.getItem('cartItems');
    var cartData = JSON.parse(cartData);

    var wishlistData = localStorage.getItem('wishlistItems');
    var wishlistData = JSON.parse(wishlistData);

    const[cartItems,setCartItems] = useState(cartData?cartData:[] );
    const[wishList,setWishList] = useState( wishlistData??[]);
    
    const userLogin = localStorage.getItem('user_uid');
    const[islogin ,setIsLogin]= useState (userLogin);
    const data = {cartItems,setCartItems ,wishList,setWishList,islogin ,setIsLogin}

  return (
    <>
      <CommonContext.Provider value={data}>
      {children}
      </CommonContext.Provider>
    </>
  )
}
  
export {CommonContext}