import axios from "axios";
import {
  addCartItemRequest,
  addCartItemSuccess,
  decreaseCartItemQty,
  increaseCartItemQty,
} from "../slice/cartSlice";

export const addCartItem = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const link = `/api/v1/product/${id}`;
    const { data } = await axios.get(link);
    console.log(data);
    dispatch(
      addCartItemSuccess({
        product: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        image: data.product.images[0].image,
        stock: data.product.stock,
        quantity,
      })
    );
  } catch (error) {}
};
