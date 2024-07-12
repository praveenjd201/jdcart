import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { login, clearAuthError } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

// toastity to show error on popoup
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, loginError, isAuthunticated } = useSelector(
    (store) => store.authState
  );
  const location = useLocation();

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/"; // if user is not logged in then redirect to login page

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(email, password);
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (isAuthunticated) {
      navigate(redirect);
    }
    if (loginError) {
      toast(loginError, {
        position: "top-right",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
        // theme: "light",
      });
      return;
    }
  }, [isAuthunticated, loginError, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={"login"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/forgotpassword" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
