import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAuthError, resetPassword } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((store) => store.authState);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");
    if (password !== confirmPassword) {
      toast("passwrod doesn't match", {
        type: "error",
        position: "bottom-center",
      });
      return;
    } else {
      dispatch(resetPassword(password, confirmPassword, token));
    }
  }
  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
    if (isUpdated) {
      toast("password reset successfully", {
        type: "success",
        position: "bottom-center",
      });
      navigate("/login");
    }
  }, [error, isUpdated, dispatch]);
  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h1 className="mb-3">New Password</h1>

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

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
