import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";

// toastity to show error on popoup
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.webp");
  const dispatch = useDispatch();
  const { loading, error, isAuthunticated } = useSelector(
    (state) => state.authState
  );
  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.name === "avatar") {
      // console.log(e);
      const reader = new FileReader(); // ----- to store files's data which user choose
      // console.log(reader);
      reader.onload = () => {
        if (reader.readyState === 2) {
          // ----- when status changed to 2 status file read is completed
          setAvatarPreview(reader.result); //-------to show the file
          setAvatar(e.target.files[0]); //---- to store the file
        }
      };
      reader.readAsDataURL(e.target.files[0]); //------ to store as URL of file data. inside the we have binarydata  as base64 encoding.
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    console.log(formData);
    dispatch(register(formData));
  }

  useEffect(() => {
    if (isAuthunticated) {
      navigate("/");
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
  }, [error, isAuthunticated, dispatch]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          onSubmit={submitHandler}
          className="shadow-lg"
          encType="multipart/form-data"
        >
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              value={userData.name}
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={userData.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={userData.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt={avatarPreview}
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
