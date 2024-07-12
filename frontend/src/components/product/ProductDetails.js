import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getProduct } from "../../actions/productsActions";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

import { Carousel } from "react-bootstrap";
import { addCartItem } from "../../actions/cartAction";
import { Modal } from "react-bootstrap";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import {
  clearError,
  clearProduct,
  clearToastAlerts,
} from "../../slice/productSlice";
import ProductReview from "./ProductReview";

function ProductDetails() {
  const { loading, product, isReviewSubmitted, error } = useSelector(
    (store) => store.productState
  );
  const { isAuthunticated } = useSelector((store) => store.authState);

  const dispatch = useDispatch();
  const { id } = useParams();

  // adding stocks

  const [quantity, setQuantity] = useState(1);

  function handleIncreaseQuantity() {
    const count = document.querySelector(".count").valueAsNumber;
    if (product.stock === 0 || count >= product.stock) return;

    setQuantity(count + 1);
  }

  function handleDecreaseQuantity() {
    const count = document.querySelector(".count").valueAsNumber;
    if (quantity === 1) return;

    setQuantity(count - 1);
  }

  // modal property
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  function reviewHandler() {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    console.log(rating, comment, id);

    dispatch(createReview(formData));
  }
  console.log(rating, comment, id);

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast("Review Submitted successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearToastAlerts());
        },
      });
    }
    if (error) {
      toast(error, {
        type: "error",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);
  console.log(product.ratings);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => {
                    return (
                      <Carousel.Item key={image._id}>
                        <img
                          src={image.image}
                          alt={product.name}
                          height="500"
                          width="500"
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">{product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span
                  className="btn btn-danger minus"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span
                  className="btn btn-primary plus"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0 ? true : false}
                onClick={() => {
                  dispatch(addCartItem(product._id, quantity)); // have to call by dispatch function cause calling action creator function
                  toast("Cart Item Added!", {
                    position: "bottom-center",
                    type: "success",
                  });
                }}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  style={{ color: `${product.stock > 0 ? "green" : "red"}` }}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              {isAuthunticated ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={handleShow}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">
                  {" "}
                  Login to Post Review{" "}
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  {/* <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit you Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ul className="stars">
                        <StarRating
                          maxRating={5}
                          size={36}
                          color={"orange"}
                          onSetRating={setRating}
                        />
                      </ul>

                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      ></textarea>
                      <button
                        disabled={loading}
                        onClick={reviewHandler}
                        aria-label="Close"
                        className="btn my-3 float-right review-btn px-4 text-white"
                      >
                        Submit
                      </button>
                    </Modal.Body>
                    {/* <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer> */}
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <ProductReview productReviews={product.reviews} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
