import { Fragment } from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      <Link to="/shipping">
        {shipping ? (
          <Fragment>
            <div className="triangle2-active"></div>
            <div className="step active-step">Shipping Info</div>
            <div className="triangle-active"></div>
          </Fragment>
        ) : (
          <Fragment>
            {" "}
            <div className="triangle2 -incomplete"></div>
            <div className="step incomplete">Shipping Info</div>
            <div className="triangle-incomplete"></div>
          </Fragment>
        )}
        <Link to="/order/confirm">
          {confirmOrder ? (
            <Fragment>
              <div className="triangle2-active"></div>
              <div className="step active-step">Confirm Order</div>
              <div className="triangle-active"></div>
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <div className="triangle2-incomplete"></div>
              <div className="step incomplete">Confirm Order</div>
              <div className="triangle-incomplete"></div>
            </Fragment>
          )}
        </Link>
      </Link>
      <Link to="/payment">
        {payment ? (
          <Fragment>
            <div className="triangle2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
          </Fragment>
        ) : (
          <Fragment>
            {" "}
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete"></div>
          </Fragment>
        )}
      </Link>
    </div>
  );
}

export default CheckoutSteps;
