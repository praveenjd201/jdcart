import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/userActions";
import { toast } from "react-toastify";
import { authClearError } from "../../slice/authSlice";

function UpdatePassword() {
  const { isUpdated, error } = useSelector((store) => store.authState);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  function handleChange(e) {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("currentPassword", passwordData.currentPassword);
    formData.append("newPassword", passwordData.newPassword);
    formData.append("confirmPassword", passwordData.confirmPassword);
    dispatch(changePassword(formData));
  }
  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        position: "top-right",
        type: "success",
        onload: () => {
          dispatch(authClearError);
        },
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    }
    if (error) {
      toast(error, {
        position: "top-right",
        type: "error",
        onload: () => {
          dispatch(authClearError);
        },
      });
      return;
    }
  }, [isUpdated, dispatch]);

  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="new_password_field">Confirm Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
