import { Fragment, useEffect, useId, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { getUser, updateUserAdmin } from "../../actions/userActions";
import { clearError, clearToastAlerts } from "../../slice/userSlice";

function UpdateUser() {
  const { loading, error, isUserUpdated, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);
  const { id: userId } = useParams();

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Name: ", userData.name);
    console.log("Name: ", userData.email);
    console.log("Name: ", userData.role);
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("role", userData.role);

    dispatch(updateUserAdmin(userId, formData));
  }
  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (isUserUpdated) {
      toast("User Updated succesfully", {
        position: "top-right",
        type: "success",
        onOpen: () => dispatch(clearToastAlerts()),
      });

      return;
    }
    if (error) {
      toast(error, {
        position: "top-right",
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    dispatch(getUser(userId));
  }, [isUserUpdated, error, dispatch]);

  useEffect(() => {
    if (user._id) {
      setUserData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        {/* <h1 className="my-4">Create Product</h1> */}
        <Fragment>
          <div className="wrapper my-5">
            <form
              className="shadow-lg"
              enctype="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={userData.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Email</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={userData.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Role</label>
                <select
                  disabled={user._id === authUser._id}
                  value={userData.role}
                  onChange={handleChange}
                  className="form-control"
                  id="category_field"
                  name="role"
                >
                  <option value="admin"> Admin</option>
                  <option value="user"> User</option>
                </select>
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default UpdateUser;
