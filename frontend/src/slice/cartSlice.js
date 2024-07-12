import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [], // getting cart items from local storage if it have any products
    loading: false,
    shippingInfo: localStorage.getItem("shippingDetails")
      ? JSON.parse(localStorage.getItem("shippingDetails"))
      : {},
  },
  reducers: {
    addCartItemRequest(state, action) {
      state.loading = true;
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;
      const isItemExist = state.items.find((i) => i.product === item.product);

      if (isItemExist) {
      } else {
        state.items.push(item);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
      state.loading = false;
    },
    addCartItemFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    increaseCartItemQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity += 1;
        }

        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseCartItemQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity -= 1;
        }

        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeCartItem(state, action) {
      state.items = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    saveShippingInfo(state, action) {
      localStorage.setItem("shippingDetails", JSON.stringify(action.payload));
      state.shippingInfo = action.payload;
    },
    orderCompleted(state, action) {
      localStorage.removeItem("shippingDetails");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");
      return {
        items: [],
        loading: false,
        shippingInfo: {},
      };
      // state.items = [];
      // state.loading = false;
      // state.shippingInfo = {};
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addCartItemRequest,
  addCartItemSuccess,
  increaseCartItemQty,
  decreaseCartItemQty,
  removeCartItem,
  saveShippingInfo,
  orderCompleted,
} = actions;

export default reducer;
