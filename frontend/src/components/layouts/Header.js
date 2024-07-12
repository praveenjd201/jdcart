import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { clearAuthError, logoutUser } from "../../actions/userActions";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthunticated, user, message, error } = useSelector(
    (state) => state.authState
  );
  const { items: cartItem } = useSelector((state) => state.cartState);

  function handleLogout() {
    dispatch(logoutUser);
  }

  useEffect(() => {
    if (error) {
      toast(error, {
        position: "top-right",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }

    if (message) {
      // console.log("header", "logout");
      // dispatch(clearAuthError);
      // toast(message, {
      //   position: "top-right",
      //   type: "error",
      //   onOpen: () => {

      //   },
      // });
      return;
    }
  }, [message]);

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <img width="150px" src="/images/logowhite.png" alt="Logo" />
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthunticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle className="pr-5 text-white" variant="default">
              <figure className="avatar avatar-nav">
                <Image
                  width="1px"
                  src={user.avatar ?? "./images/avatar.webp"}
                  alt="user.name"
                  roundedCircle
                />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.role === "admin" && (
                <Dropdown.Item
                  className="text-dark"
                  onClick={() => navigate("admin/dashboard")}
                >
                  {" "}
                  Dashboard
                </Dropdown.Item>
              )}

              <Dropdown.Item
                className="text-dark"
                onClick={() => navigate("./myprofile")}
              >
                {" "}
                Myprofile
              </Dropdown.Item>
              <Dropdown.Item
                className="text-dark"
                onClick={() => navigate("./orders")}
              >
                Orders
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={handleLogout}>
                {" "}
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}
        <Link to="/cart">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {cartItem.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}
