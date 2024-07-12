import { Fragment, useEffect, useState } from "react";

// toastity to show error on popoup
import { toast } from "react-toastify";

//slider
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//ToolTip

import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

import Pagination from "react-js-pagination";

import MetaData from ".././layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { useParams } from "react-router-dom";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (store) => store.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([1, 1000]);
  const [priceChange, setPriceChange] = useState(price);
  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "books",
    "Clothes/Shoes",
    "beauty/Health",
    "Sports",
    "Outdoors",
    "Home",
  ];
  const [category, setCatgory] = useState(null);
  const [rating, setRating] = useState(null);
  // console.log(keyword);
  // console.log(currentPage);
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }

    dispatch(getProducts(keyword, priceChange, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, priceChange, category, rating]);

  function currentPageNo(pageNo) {
    setCurrentPage(pageNo);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Prodcts"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-1 col-md-3 mb-5 mt-5">
                {/* price filter */}
                <div className="px-5" onMouseUp={() => setPriceChange(price)}>
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      1000: "$1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => setPrice(price)} // it deprricated so we can use onMouseup event
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`$${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* category filter */}
                <div className="mt-5">
                  <h3 className="mb-3">Category</h3>
                  <ul className="pl-0">
                    {categories.map((category) => {
                      return (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={category}
                          onClick={() => setCatgory(category)}
                        >
                          {category}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* rating filter */}
                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => {
                      return (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={category}
                          onClick={() => setRating(star)}
                        >
                          <div className="rating-outer">
                            <div
                              style={{ width: `${(star / 5) * 100}%` }}
                              className="rating-inner"
                            ></div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9 ">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} product={product} key={product._id} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          {productsCount && productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={currentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                // prevPageText={"Previous"}
                // pageRangeDisplayed={5}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
