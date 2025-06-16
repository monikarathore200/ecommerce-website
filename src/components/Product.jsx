import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Brodcum from "./common/Brodcum";
import Footer from "./common/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import PorductCard from "./PorductCard";
import Pagination from "react-bootstrap/Pagination";
import ResponsivePagination from "react-responsive-pagination";
import { useParams } from "react-router-dom";


export default function Product() {
  

 
 const params = useParams();
 const [filterAllCategories, setFilterAllCategories] = useState([]);

   useEffect(() => {
        
        if(params.slug){
            
            setFilterAllCategories([params.slug]);
        }
  },[params.slug]);
    // },[params]);


  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sorting, setsorting] = useState("");
  const [filterAllcategories, setfilterAllCategories] = useState([]);
  const [productName, setproductName] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setpriceTo] = useState("");
  const [totalPages, setToTalPages] = useState("");
  const [allPages, setAllPages] = useState([]);
 




  
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((result) => {
        setCategories(result.data.data);
        // console.log ("hello");
      })

      .catch(() => {
        toast.error("something went wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/brands.php")
      .then((result) => {
        setBrands(result.data.data);
        // console.log ("hello");
      })

      .catch(() => {
        toast.error("something went wrong");
      });
  }, []);

  // useEffect (()=>{
  //  axios.get(`https://wscubetech.co/ecommerce-api/products.php?limit=18&page=${currentPage}`)
  //.then((result)=>{
  //setProducts(result.data.data)
  // })

  // .catch(()=>{
  //  toast.error('something went wrong');
  // })
  //  },[currentPage]);

  useEffect(() => {

    // if(filterAllcategories.length >0){
    //   var filterCat = filterAllcategories.toString();
    // } else{
    //   var filterCat = params.slug;
    // }


    axios
      .get(`https://wscubetech.co/ecommerce-api/products.php?`, {
        params: {
          page: currentPage,
          limit: 15,
          sorting: sorting,
          name: productName,
          price_from: priceFrom,
          price_to: priceTo,
          discount_from: "",
          discount_to: "",
          rating: "",
          brands: "",
          categories: filterAllcategories.toString(),
        },
      })
      .then((result) => {
        setProducts(result.data.data);
        setTotalRecords(result.data.total_records);
        setToTalPages(result.data.total_pages)
      })

      .catch(() => {
        toast.error("something went wrong");
      });
  }, [
    params.slug,
    currentPage,
    sorting,
    filterAllcategories,
    priceFrom,
    priceTo,
    productName,
  ]);

  // pagination
  useEffect (()=>{
    let  allPages = [];
    for (let i = 1; i <= totalPages; i++){
      allPages.push(i);
    }
    setAllPages(allPages);

  },[totalPages]);

  // second method
  // useEffect(() => {               
  //   if (totalRecords) {
  //     setToTalPages(Math.ceil(totalRecords / 15));
  //   }
  // }, [totalRecords]);

  

  const filterProducts = (event) => {
    setsorting(event.target.value);
  };

  const filtercategorydata = (slug) => {
    setCurrentPage(1)

    if (filterAllcategories.includes(slug)) {
      var data = filterAllcategories.filter((v) => {
        if (slug != v) {
          return v;
        }
      });

      var data = [...data];
      setfilterAllCategories(data);
      console.log(data);
    } else {
      const data = [...filterAllcategories, slug];
      setfilterAllCategories(data);
      console.log(data);
    }
  };

  const clearAll = () => {
    setfilterAllCategories([]);
    setPriceFrom("");
    setpriceTo("");
  };

  const filterprice = (event) => {
    setpriceTo(event.target.value);
  };

  const filterPriceFrom = (event) => {
    setPriceFrom(event.target.value);
  };

  const filterPriceTo = (event) => {
    setpriceTo(event.target.value);
  };

  const filterProductName = (event) => {
    setproductName(event.target.value);
  };

  const firstPage = () => {
    setCurrentPage(1);
    console.log("first");
  };

  const PrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    console.log("prev");
  };

  const LastPage = () => {
    setCurrentPage(totalPages);
    console.log("last page");
  };

  const NextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    console.log("next");
  };

  return (
    <>
      
      <Brodcum />

      <div className="container py-5">
        <div className="row">
          {/* <!-- Filter Button (Mobile) --> */}
          <div className="col-12 d-lg-none mb-3">
            <button
              className="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar"
            >
              <i className="fa fa-filter"></i> Filter Products
            </button>
          </div>

          {/* <!-- Sidebar Filters --> */}
          <div className="col-lg-3">
            {/* <!-- Desktop Filters --> */}
            <div className="card shadow-sm d-none d-lg-block">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Filters</h5>
                  <button
                    onClick={clearAll}
                    className="btn btn-sm btn-link text-decoration-none p-0"
                  >
                    Clear All
                  </button>
                </div>

                {/* <!-- Categories Filter --> */}
                <div className="mb-4  section-filter ">
                  <h6 className="fw-bold mb-3">Categories</h6>
                  {categories.map((v, i) => {
                    return (
                      <Filtercategories
                        key={i}
                        data={v}
                        filtercategory={filtercategorydata}
                        filterAllcategories={filterAllcategories}
                      />
                    );
                  })}

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="category2"
                    />
                    <label className="form-check-label" for="category2">
                      Audio
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="category3"
                    />
                    <label className="form-check-label" for="category3">
                      Home Appliances
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="category4"
                    />
                    <label className="form-check-label" for="category4">
                      Kitchen
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="category5"
                    />
                    <label className="form-check-label" for="category5">
                      Wearables
                    </label>
                  </div>
                </div>

                {/* <!-- Brands Filter --> */}
                <div className="mb-4 section-filter ">
                  <h6 className="fw-bold mb-3">Brands</h6>
                  {brands.map((v, i) => {
                    return <Filterbrands key={i} data={v} />;
                  })}
                </div>

                {/* <!-- Price Range Filter --> */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-3">Price Range</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>$0</span>
                    <span>{priceTo != "" ? priceTo : "1500"}</span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1500"
                    step="10"
                    id="priceRange"
                    onChange={filterprice}
                  />
                  <div className="row g-2 mt-2">
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          onKeyUp={filterPriceFrom}
                          placeholder="Min"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          onKeyUp={filterPriceTo}
                          placeholder="max"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Mobile Filters (Offcanvas) --> */}
            <div
              className="offcanvas offcanvas-start"
              tabindex="-1"
              id="filterSidebar"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">Filters</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                {/* <!-- Categories Filter --> */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Categories</h6>
                  {categories.map((v, i) => {
                    return (
                      <Filtercategories
                        key={i}
                        data={v}
                        filtercategory={filtercategorydata}
                        filterAllcategories={filterAllcategories}
                      />
                    );
                  })}

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mCategory2"
                    />
                    <label className="form-check-label" for="mCategory2">
                      Audio
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mCategory3"
                    />
                    <label className="form-check-label" for="mCategory3">
                      Home Appliances
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mCategory4"
                    />
                    <label className="form-check-label" for="mCategory4">
                      Kitchen
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mCategory5"
                    />
                    <label className="form-check-label" for="mCategory5">
                      Wearables
                    </label>
                  </div>
                </div>

                {/* <!-- Brands Filter --> */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Brands</h6>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mBrand1"
                    />
                    <label className="form-check-label" for="mBrand1">
                      Samsung
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mBrand2"
                    />
                    <label className="form-check-label" for="mBrand2">
                      Apple
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mBrand3"
                    />
                    <label className="form-check-label" for="mBrand3">
                      Sony
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mBrand4"
                    />
                    <label className="form-check-label" for="mBrand4">
                      Dell
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mBrand5"
                    />
                    <label className="form-check-label" for="mBrand5">
                      Dyson
                    </label>
                  </div>
                </div>

                {/* <!-- Price Range Filter --> */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Price Range</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>$0</span>
                    <span>$1500</span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1500"
                    step="10"
                    id="mobilePriceRange"
                    onChange={filterprice}
                  />
                  <div className="row g-2 mt-2">
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          onKeyUp={filterPriceFrom}
                          placeholder="Min"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          onKeyUp={filterPriceTo}
                          placeholder="Max"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary w-100">Apply Filters</button>
              </div>
            </div>
          </div>

          {/* <!-- Main Product Content --> */}
          <div className="col-lg-9">
            {/* <!-- Top bar with results count and sorting --> */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="col-md-5 col-12 order-md-1 order-3 mt-2 mt-md-0">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="fa fa-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      onKeyUp={filterProductName}
                      className="form-control border-start-0"
                      placeholder="Search products..."
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <h6 className="mb-0"> {totalRecords}</h6>
                    <small className="text-muted">Filtered results</small>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-md-end">
                      <i className="fa fa-sort text-muted me-2"></i>
                      <span className="text-nowrap me-2 d-none d-sm-inline">
                        Sort by:
                      </span>
                      <select
                        className="form-select form-select-sm w-auto "
                        onClick={filterProducts}
                      >
                        <option value="">Sort by -</option>
                        <option value="1">Name : A TO Z </option>
                        <option value="2">Name : Z TO 1 </option>
                        <option value="3">Price: Low to High</option>
                        <option value="4">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Product Grid --> */}

            {
              products.length >0

              ?
                <>
                 <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
              {/* <!-- Product 1 --> */}

              {products.map((v, i) => {
                return <PorductCard key={i} data={v} />;
              })}
            </div>

            <div className="row">
              <Pagination>
                <Pagination.First onClick={firstPage} />
                <Pagination.Prev onClick={PrevPage} />

                {allPages.map((v, i) => {
                  return (
                    <Pagination.Item
                      key={i}
                      onClick={() => {
                        setCurrentPage(v);
                      }}
                      active={currentPage === v}
                    >
                      {v}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next onClick={NextPage} />
                <Pagination.Last onClick={LastPage} />
              </Pagination>

              <div>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
                </>
              :

              'No Record Found'
            }
          
          </div>
        </div>
      </div>

      
    </>
  );
}

const Filtercategories = ({ data, filtercategory, filterAllcategories }) => {
  return (
    <div className="form-check mb-2">
      <input
        className="form-check-input"
        onClick={() => filtercategory(data.slug)}
        type="checkbox"
        checked={filterAllcategories.includes(data.slug) ? "che" : ""}
        id={data.slug}
      />
      <label className="form-check-label" for={data.slug}>
        {data.name}
      </label>
    </div>
  );
};

const Filterbrands = ({ data }) => {
  return (
    <div className="form-check mb-2">
      <input className="form-check-input" type="checkbox" id={data.slug} />
      <label className="form-check-label" for={data.slug}>
        {data.name}
      </label>
    </div>
  );
};
