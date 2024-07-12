import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: {},
    userOrders: [],
    adminOrders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false,
  },
  reducers: {
    createOrderRequest(state, action) {
      state.loading = true;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.orderDetails = action.payload.order;
    },
    createOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state, action) {
      state.error = null;
    },
    userOrdersRequest(state, action) {
      state.loading = true;
    },
    userOrdersSuccess(state, action) {
      state.loading = false;
      state.userOrders = action.payload.orders;
    },
    userOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderDetailRequest(state, action) {
      state.loading = true;
    },
    orderDetailSuccess(state, action) {
      state.loading = false;
      state.orderDetails = action.payload.order;
    },
    orderDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    adminOrdersRequest(state, action) {
      state.loading = true;
    },
    adminOrdersSuccess(state, action) {
      state.loading = false;
      state.adminOrders = action.payload.orders;
    },
    adminOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderRequest(state, action) {
      state.loading = true;
    },
    deleteOrderSuccess(state, action) {
      state.loading = false;
      state.isOrderDeleted = true;
    },
    deleteOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderRequest(state, action) {
      state.loading = true;
    },
    updateOrderSuccess(state, action) {
      state.loading = false;
      state.isOrderUpdated = true;
    },
    updateOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearToastAlert(state, action) {
      state.isOrderDeleted = false;
      state.isOrderUpdated = false;
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearError,
  userOrdersRequest,
  userOrdersSuccess,
  usserOrdersFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  adminOrdersFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  clearToastAlert,
} = actions;

export default reducer;
