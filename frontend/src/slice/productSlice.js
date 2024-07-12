import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
    reviews: [],
  },
  reducers: {
    productRequest(state, action) {
      state.loading = true;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createReviewRequest(state, action) {
      state.loading = true;
    },
    createReviewsuccess(state, action) {
      state.loading = false;
      state.isReviewSubmitted = true;
    },
    createReviewFail(state, action) {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    },
    clearToastAlerts(state, action) {
      state.isReviewSubmitted = false;
      state.isProductCreated = false;
      state.isProductDeleted = false;
      state.isProductUpdated = false;
      state.isReviewDeleted = false;
    },
    clearError(state, action) {
      state.error = null;
    },
    clearProduct(state, action) {
      state.product = {};
    },
    //-------------- to create product by admin
    newProductRequest(state, action) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
      state.isProductCreated = true;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    //-------------- to delete product by admin
    deleteProductRequest(state, action) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.isProductDeleted = true;
    },
    deleteProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductRequest(state, action) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
      state.isProductUpdated = true;
    },
    updateProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    reviewsRequest(state, action) {
      state.loading = true;
    },
    reviewsSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    reviewsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewRequest(state, action) {
      state.loading = true;
    },
    deleteReviewSuccess(state, action) {
      state.loading = false;
      state.isReviewDeleted = true;
    },
    deleteReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  createReviewRequest,
  createReviewsuccess,
  createReviewFail,
  clearError,
  // clearReviewSubmitted,
  clearToastAlerts,
  clearProduct,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} = actions;
export default reducer;
