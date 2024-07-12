import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";
import { Link, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";

function OrderDetails() {
  const { orderDetails, loading } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();
  const {
    shippingInfo = {},
    paymentInfo = {},
    user = {},
    orderItems = [],
    orderStatus = "Processing",
    totalPrice = 0,
  } = orderDetails;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  const { id } = useParams();
  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order # 4543f34f545</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {shippingInfo.address}
                </p>
                <p>
                  <b>Amount:</b> $ {totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>

                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    orderStatus.includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>
                    {orderStatus.includes("Delivered")
                      ? "Delivered"
                      : "Processing"}
                  </b>
                </p>

                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                  {orderItems.map((orderItem) => {
                    return (
                      <div className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={orderItem.image}
                            alt={orderItem.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/product/${orderItem.product}`}>
                            {orderItem.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${orderItem.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{orderItem.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderDetails;
