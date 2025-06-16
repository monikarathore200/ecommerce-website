import React, { use, useEffect, useState } from "react";
import Header from "./common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import PorductCard from "./PorductCard";

export default function Home() {

const [bestSelling,setBestSelling] = useState ([]);
const [topRated,setTopRated] = useState ([]);


useEffect(()=>{
  axios.get('https://wscubetech.co/ecommerce-api/products.php',{
    params : {
      limit : 8,
      categories: 'mens-shirts,mens-shoes'
    }
  })
  .then((result)=>{
  setBestSelling(result.data.data)
  }) 
  .catch(()=>{
    toast.error ('something went wrong');
  })
},[])

useEffect(()=>{
  axios.get('https://wscubetech.co/ecommerce-api/products.php',{
    params : {
      limit : 8,
      categories : 'furniture,home-decoration'
    }
  })
  .then((result)=>{
 setTopRated(result.data.data)
  }) 
  .catch(()=>{
    toast.error ('something went wrong');
  })
},[])

  return (
   
    <>

    {
      bestSelling.length >0
      ?
     <div className="container-fluid">
        <div className="container">
          <div className="row text-center p-3">
            <h1>Best Sellings</h1>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {/* <!-- Product 1 --> */}

            {bestSelling.map((v, i) => {
              return <PorductCard key={i} data={v} />;
            })}
          </div>
        </div>
      </div>
      :
      ''
    }
     

     {
      topRated.length >0
      ?
     <div className="container-fluid">
        <div className="container">
          <div className="row text-center p-3">
            <h1>Top Rated</h1>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {/* <!-- Product 1 --> */}

            {topRated.map((v, i) => {
              return <PorductCard key={i} data={v} />;
            })}
          </div>
        </div>
      </div>
      :
      ''
    }
     
    </>
  );
}
