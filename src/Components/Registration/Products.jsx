import { useFormik } from "formik";
import React, { useState } from "react";
import "./Registration.css";
import { end_points } from "../api/url/api_url";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  let api = end_points.product;
  let navigate = useNavigate();
  let [imgState, setImage] = useState();

  let submitHandler = (data) => {
    let newData = {
      brand: data.brand,
      product_name: data.product_name,
      price: data.price,
      details: data.details,
      product_img:imgState
    };
    axiosInstance
      .post(api, newData)
      .then((res) => {
        // console.log("success", res);
        Swal.fire({
          title: "Success!",
          text: "Addition successful",
          icon: "success",
        });
        navigate("/productsfetch");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    console.log(data);
  };

  let formValidator = (data) => {
    let err = {};

    // brand
    if (data.brand.length < 1) {
      err.brand = "Required field";
    }
    // product_name
    if (data.product_name.length < 1) {
      err.product_name = "Required field";
    }
    // price
    if (data.price.length < 1) {
      err.price = "Required field";
    }
    // details
    if (data.details.length < 1) {
      err.details = "Required field";
    }

    return err;
  };

  let imgHnadler = (img) => {
    let fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
    });
    fileReader.readAsDataURL(img);
  };

  let formik = useFormik({
    initialValues: { brand: "", product_name: "", price: "", details: "" },
    validate: formValidator,
    onSubmit: submitHandler,
  });

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2>Product Add</h2>
        <label>Brand</label>
        <input
          type="text"
          name="brand"
          values={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.brand && formik.errors?.brand ? (
          <p>{formik.errors.brand}</p>
        ) : (
          ""
        )}

        <label>Product Name</label>
        <input
          type="text"
          name="product_name"
          values={formik.values.product_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.product_name && formik.errors?.product_name ? (
          <p>{formik.errors.product_name}</p>
        ) : (
          ""
        )}

        <label>Price</label>
        <input
          type="price"
          name="price"
          values={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.price && formik.errors?.price ? (
          <p>{formik.errors.price}</p>
        ) : (
          ""
        )}

        <label>Details</label>
        <input
          type="details"
          name="details"
          values={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.details && formik.errors?.details ? (
          <p>{formik.errors.details}</p>
        ) : (
          ""
        )}
        <label>Product Image</label>
        <input
          type="file"
          name="product_img"
          value={formik.values.product_img}
          onChange={(event) => imgHnadler(event.target.files[0])}
        />
        <input id="submitbtn" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default Products;
