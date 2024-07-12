import "./App.css";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/product/ProductDetails";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import MyProfile from "./components/user/MyProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import OrderSuccess from "./components/Cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProdcut from "./components/admin/NewProdcut";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";

function App() {
  const [striptApiKey, setStripeApikey] = useState("");

  const { isAuthunticated } = useSelector((state) => state.authState);
  console.log(isAuthunticated);

  useEffect(() => {
    store.dispatch(loadUser);
    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApikey(data.stripApiKey);
    }

    isAuthunticated && getStripApiKey();
  }, [isAuthunticated]);

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />

          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/search/:keyword"
                element={<ProductSearch />}
              ></Route>
              <Route path="/product/:id" element={<ProductDetails />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/myprofile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/myprofile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/myprofile/changepassword"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/forgotpassword"
                element={<ForgotPassword />}
              ></Route>
              <Route path="/reset/:token" element={<ResetPassword />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />{" "}
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              >
                {" "}
              </Route>
              console.log("stripe",striptApiKey)
              {striptApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(striptApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                >
                  payment
                </Route>
              )}
              <Route path="/order/success" element={<OrderSuccess />}></Route>
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
          {/*-------------- AdminRoutes---------------- */}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductList />
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProdcut />
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrderList />
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ReviewList />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
