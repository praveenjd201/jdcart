import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productsActions";
import { toast } from "react-toastify";
import { clearError, clearToastAlerts } from "../../slice/productSlice";

function UpdateProduct() {
  const { loading, error, isProductUpdated, product } = useSelector(
    (state) => state.productState
  );
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    seller: "",
    stock: 0,
  });

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);

  const category = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("seller", productData.seller);
    formData.append("stock", productData.stock);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(productId, formData));
  }
  function handleChange(e) {
    if (e.target.name === "product_images") {
      const images = Array.from(e.target.files);

      images.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((oldArray) => [...oldArray, reader.result]);
            setImages((oldArray) => [...oldArray, file]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  }
  function clearImagesHandler() {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  }

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated succesfully", {
        position: "top-right",
        type: "success",
        onOpen: () => dispatch(clearToastAlerts()),
      });
      setImages([]);
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
    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch]);

  useEffect(() => {
    if (product._id) {
      setProductData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        seller: product.seller,
        stock: product.stock,
      });
      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });

      setImagesPreview(images);
    }
  }, [product]);

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
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={productData.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={productData.price}
                  name="price"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  name="description"
                  onChange={handleChange}
                  value={productData.description}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  value={productData.category}
                  onChange={handleChange}
                  className="form-control"
                  id="category_field"
                  name="category"
                >
                  <option value=""> Select Prodcut</option>
                  {category.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={productData.stock}
                  name="stock"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={productData.seller}
                  name="seller"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={handleChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.length > 0 && (
                  <span
                    className="mr-2"
                    onClick={clearImagesHandler}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa fa-trash"></i>
                  </span>
                )}
                {imagesPreview.map((image) => (
                  <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
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

export default UpdateProduct;
