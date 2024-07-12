import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";

import { clearAuthError } from "../actions/userActions";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, products, productsCount, resPerPage } = useSelector(
    (store) => store.productsState
  );
  const { error, message, user } = useSelector((store) => store.authState);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log("home", user);
  useEffect(() => {
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
    if (message) {
      if (user) {
        console.log("login");
      } else {
        console.log("logout");
      }
      toast(`${user ? `Welcome,${user.name}😀` : message}`, {
        position: "bottom-center",
        type: `${user ? "success" : "errro"}`,
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }

    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage, message]);

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
              {products &&
                products.map((product) => (
                  <Product col={3} product={product} key={product._id} />
                ))}
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
