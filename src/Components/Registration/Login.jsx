import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { end_points } from "../api/url/api_url";

const Login = () => {
  let navigate = useNavigate();
  let api = end_points.auth;
  let [dataState,setState]=useState()
 
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
        console.log("response data", res.data);
        setState(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  useEffect(() => {
    getDetails();
  }, [setState, api]);

  let submitHandler = (data) => {
    axiosInstance
      .get(api)
      .then((res) => {
        let user=dataState.find((x)=> x.email==data.email )
        let pass=dataState.find((x)=> x.password==data.password)
       
        if(user && pass){
          swlAlert("Logged in successfully", "success");
          navigate(`/profile/${user.id}`)
         }else{
          swlAlert("Email or password is wrong", "error");
         }
         
        }
      )
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };


  
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: submitHandler,
  });
  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2>Login Form</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          values={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* {formik.touched.email && formik.errors?.email ? (
        <p>{formik.errors.email}</p>):""} */}

        <label>Password</label>
        <input
          type="password"
          name="password"
          values={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* {formik.touched.password && formik.errors?.password ? (
        <p>{formik.errors.password}</p>):""} */}

        <input id="submitbtn" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
