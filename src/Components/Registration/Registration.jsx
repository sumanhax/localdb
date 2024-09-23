import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import "./Registration.css";
import { end_points } from "../api/url/api_url";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Registration = () => {
  
  let api = end_points.auth;
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
   let user=dataState.find((x)=>{
    return x.email==data.email
   })
   if(user){
    swlAlert("Email already registered", "error");
   }else{
    let newData={
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.password,
      profile_img: imgState,
    }

axiosInstance
      .post(api, newData)
      .then((res) => {
        swlAlert("Registered sucessfully", "success");
        navigate("/login");
      })
      .catch((err) => {
        swlAlert("Something wrong", "error");
      });
  
   }
   
  };

  let imgHandler = (file) => {
    // console.log("file",file);

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
      // console.log(imgState);
    });
    fileReader.readAsDataURL(file);
  };

  let formValidator = (data) => {
    let err = {};

    // fname
    if (data.fname.length < 1) {
      err.fname = "Required field";
    } else if (data.fname.length < 3) {
      err.fname = "minimum 2 characters";
    }
    // lname
    if (data.lname.length < 1) {
      err.lname = "Required field";
    } else if (data.lname.length < 3) {
      err.lname = "minimum 2 characters";
    }
    // email
    if (data.email.length < 1) {
      err.email = "Required field";
    } else if (data.email.length < 10) {
      err.email = "minimum 10 characters";
    }
    // password
    if (data.password.length < 1) {
      err.password = "Required field";
    } else if (data.password.length < 8) {
      err.password = "minimum 8 characters";
    }

    return err;
  };

  let formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      profile_img: {},
    },
    validate: formValidator,
    onSubmit: submitHandler,
  });

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2>Registration Form</h2>
        <label>First Name</label>
        <input
          type="text"
          name="fname"
          values={formik.values.fname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.fname && formik.errors?.fname ? (
          <p>{formik.errors.fname}</p>
        ) : (
          ""
        )}

        <label>Last Name</label>
        <input
          type="text"
          name="lname"
          values={formik.values.lname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.lname && formik.errors?.lname ? (
          <p>{formik.errors.lname}</p>
        ) : (
          ""
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          values={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors?.email ? (
          <p>{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label>Password</label>
        <input
          type="password"
          name="password"
          values={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.password && formik.errors?.password ? (
          <p>{formik.errors.password}</p>
        ) : (
          ""
        )}

        <label>Profile Pic</label>
        <input
          type="file"
          name="profile_img"
          values={formik.values.profile_img}
          onChange={(event) => imgHandler(event.target.files[0])}
          // onChange={(event)=>formik.setFieldValue("image",event.target.files[0])}
        />

        <input id="submitbtn" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Registration;
