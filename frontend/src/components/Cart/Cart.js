import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseCartItemQty,
  decreaseCartItemQty,
  removeCartItem,
} from "../../slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { items: cartItem } = useSelector((store) => store.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //order summary calculation
  const itemQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  const total = Number(
    cartItem
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2)
  );

  function increaseQty(item) {
    if (item.stock === 0 || item.quantity >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  }
  function decreaseQty(item) {
    if (item.quantity === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  }

  function handleCheckout() {
    navigate("/login?redirect=shipping");
  }

  return (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart:{" "}
          <b style={{ color: `${cartItem.length > 0 ? "" : "red"}` }}>{`${
            cartItem.length > 0 ? `${cartItem.length} item` : "Empty"
          }`}</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            <hr />
            {cartItem.length > 0
              ? cartItem.map((item) => (
                  <Fragment key={item.product}>
                    <div className="cart-item">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            <img
                              src={item.image}
                              alt="Laptop"
                              height="90"
                              width="115"
                            />
                          </Link>
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() => {
                                decreaseQty(item);
                              }}
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() => increaseQty(item)}
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() => {
                              dispatch(removeCartItem(item.product));
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))
              : "No items in cart"}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">
                  {itemQuantity} (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">$ {total}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={() => handleCheckout()}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
