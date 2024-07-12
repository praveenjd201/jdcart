import { countries } from "countries-list";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { toast } from "react-toastify";

export function validateShipping(shippingInfo, navigate) {
  if (
    !shippingInfo.address &&
    !shippingInfo.city &&
    !shippingInfo.phoneNo &&
    !shippingInfo.postalCode &&
    !shippingInfo.country &&
    !shippingInfo.state
  ) {
    toast.error("please fill the shipping information", {
      position: "bottom-center",
    });
    navigate("/shipping");
  }
}

function Shipping() {
  const { shippingInfo } = useSelector((store) => store.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shipInfo, setShipInfo] = useState({
    address: shippingInfo.address,
    city: shippingInfo.city,
    phoneNo: shippingInfo.phoneNo,
    postalCode: shippingInfo.postalCode,
    country: shippingInfo.country,
    state: shippingInfo.state,
  });
  const coutrylist = Object.values(countries);

  function handleChange(e) {
    setShipInfo({ ...shipInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(saveShippingInfo(shipInfo));
    navigate("/order/confirm");
  }

  return (
    <Fragment>
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={shipInfo.address}
                name="address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={shipInfo.city}
                name="city"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={shipInfo.phoneNo}
                name="phoneNo"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={shipInfo.postalCode}
                name="postalCode"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={shipInfo.country}
                name="country"
                onChange={handleChange}
                required
              >
                <option value={""}>select Country</option>
                {coutrylist.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="state_field">State</label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                value={shipInfo.state}
                name="state"
                onChange={handleChange}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
