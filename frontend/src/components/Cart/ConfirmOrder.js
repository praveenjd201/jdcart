import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import { Link } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const tax_percentage = 0.05;

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, items: cartItem } = useSelector(
    (store) => store.cartState
  );
  const { user } = useSelector((store) => store.authState);
  console.log(user);

  // order calculations
  const itemPrice = Number(
    cartItem
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2)
  );
  const shippingPrice = itemPrice > 200 ? 0 : 25;
  const taxPrice = Number((tax_percentage * itemPrice).toFixed(2));
  const totalPrice = Number((itemPrice + shippingPrice + taxPrice).toFixed(2));

  function processPayment() {
    const data = {
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);
  return (
    <Fragment>
      <MetaData title="confirmOrder" />
      <CheckoutSteps confirmOrder />
      <div className="container container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b>
              {shippingInfo.phoneNO}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            <hr />
            {cartItem.map((item) => {
              return (
                <Fragment>
                  <div className="cart-item my-1">
                    <div className="row">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-6">
                        <Link to={`/product/${item.product}`}>
                          OPPO F21s Pro 5G (Dawnlight Gold, 8GB RAM, 128
                          Storage) with No Cost EMI/Additional Exchange Offers
                        </Link>
                      </div>

                      <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                        <p>
                          {item.quantity} x ${item.price} ={" "}
                          <b>${item.quantity * item.price}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              );
            })}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                SubtotalPrice:{" "}
                <span className="order-summary-values">${itemPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
                taxPrice:{" "}
                <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                totalPrice:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmOrder;
