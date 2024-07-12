import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function MyProfile() {
  const { user, isAuthunticated } = useSelector((store) => store.authState);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthunticated && navigate("/myprofile");
  }, [navigate]);
  // to get date from user.date
  // let date = user.createdAT.split("");
  // let date1 = "";
  // for (let i = 0; i < 10; i++) {
  //   date1 += date[i];
  // }

  return (
    <div className="container container-fluid">
      <h2 className="mt-5 ml-5">My Profile</h2>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <Image
              className="rounded-circle img-fluid"
              src={user.avatar ?? "./images/avatar.webp"}
              alt="user.name"
            />
          </figure>
          <Link
            to="/myprofile/update"
            id="edit_profile"
            className="btn btn-primary btn-block my-5"
          >
            Edit Profile
          </Link>
        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user.name}</p>

          <h4>Email Address</h4>
          <p>{user.email}</p>

          <h4>Joined</h4>
          <p>{String(user.createdAT).substring(0, 10)}</p>

          <Link to="/orders" className="btn btn-danger btn-block mt-5">
            My Orders
          </Link>

          <Link
            to="/myprofile/changepassword"
            className="btn btn-primary btn-block mt-3"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
