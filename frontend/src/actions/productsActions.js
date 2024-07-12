import axios from "axios";

// productSlice
import {
  createReviewFail,
  createReviewRequest,
  createReviewsuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  productFail,
  productRequest,
  productSuccess,
  reviewsFail,
  reviewsRequest,
  reviewsSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../slice/productSlice";

// productsSlice
import {
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slice/productsSlice";

export const getProducts =
  (keyword, price, category, rating, currentPage) => async (dispatch) => {
    try {
      dispatch(productsRequest());
      let link = `/api/v1/products?page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        link += `&category=${category}`;
      }
      if (rating) {
        link += `&ratings=${rating}`;
      }

      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};

export const createReview = (reviewData) => async (dispatch) => {
  try {
    // console.log(reviewData);
    dispatch(createReviewRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put("/api/v1/review", reviewData, config);
    dispatch(createReviewsuccess(data));
  } catch (error) {
    //handle the error

    dispatch(createReviewFail(error.response.data.message));
  }
};

// get amdin prodcuts

export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};

// To create podcuts by admin
export const createNewProduct = (productDetail) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    let link = "/api/v1/admin/product/new";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(link, productDetail, config);
    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    // console.log("id", id, productData);
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData
    );
    // console.log("data", data);
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch(reviewsRequest());

    const { data } = await axios.get(`/api/v1/admin/reviews`, {
      params: { id },
    });

    dispatch(reviewsSuccess(data));
  } catch (error) {
    dispatch(reviewsFail(error.response.data.message));
  }
};

export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());

    await axios.delete(`/api/v1/admin/reviews`, {
      params: { id, productId },
    });

    dispatch(deleteReviewSuccess());
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};
