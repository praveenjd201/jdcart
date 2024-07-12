import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { clearAuthError, forgotPassword } from "../../actions/userActions";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((store) => store.authState);
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }

  useEffect(() => {
    if (message) {
      toast(message, {
        position: "top-right",
        type: "success",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      setEmail("");
      return;
    }
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
  }, [error, message, dispatch]);

  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
