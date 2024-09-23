import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { end_points } from "../api/url/api_url";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const ProductEdit = () => {
  let { id } = useParams();
  // console.log("ID:",id);
  let api = end_points.product + "/" + id;
  // console.log("api",api);
  let navigate = useNavigate();
  let [imgState, setImage] = useState();
  let [dataState, setState] = useState();

  let swlAlert = (x, y) => {
    Swal.fire({
      title: y,
      text: x,
      icon: y,
    });
  };

  let getDetails = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        // console.log("Recieved data",res);
        setState(res.data);
      })
      .catch((err) => {
        //   console.log("errors", err);
      });
  };

  useEffect(() => {
    getDetails();
  }, [setState, api]);

  let imgHnadler=(img)=>{
    let fileReader=new FileReader()
    fileReader.addEventListener('load',()=>{
      setImage(fileReader.result)
      console.log("filereader",fileReader.result);
      
    })
    fileReader.readAsDataURL(img)
  }

  let submitHandler = (data) => {
    
    let newData = {
      brand: data.brand,
      product_name: data.product_name,
      price: data.price,
      details: data.details,
      product_img:imgState
    };

    axiosInstance
      .put(api, newData)
      .then((res) => {
        console.log("recieved after edit", res);
        swlAlert("Updated sucessfully", "success");
        navigate("/productsfetch");
      })
      .catch((err) => {
        swlAlert("Ops something went wrong", "error");
      });
    console.log(data);
  };

  // let formValidator = (data) => {
  //   let err = {};

  //   // brand
  //   if (data.brand.length < 1) {
  //     err.brand = "Required field";
  //   }
  //   // product_name
  //   if (data.product_name.length < 1) {
  //     err.product_name = "Required field";
  //   }
  //   // price
  //   if (data.price.length < 1) {
  //     err.price = "Required field";
  //   }
  //   // details
  //   if (data.details.length < 1) {
  //     err.details = "Required field";
  //   }

  //   return err;
  // };

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand: dataState?.brand,
      product_name: dataState?.product_name,
      price: dataState?.price,
      details: dataState?.details,
    },
    // validate: formValidator,
    onSubmit: submitHandler,
  });
  // console.log(dataState);

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2>Product Add</h2>
        <label>Brand</label>
        <input
          type="text"
          name="brand"
          // value={dataState?.brand}
          value={formik.values?.brand}
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
          value={formik.values.product_name}
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
          value={formik.values.price}
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
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.details && formik.errors?.details ? (
          <p>{formik.errors.details}</p>
        ) : (
          ""
        )}
         <label>Current Product Image</label>
        <div className="my-2 border">
          <img src={dataState?.product_img} height="100px" />
        </div>

         <label>Product Image</label>
        <input
          type="file"
          name="product_img"
          value={formik.values.product_img}
          onChange={(event) => imgHnadler(event.target.files[0])}
        />
        <input id="submitbtn" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default ProductEdit;
