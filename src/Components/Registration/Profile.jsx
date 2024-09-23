import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import Swal from "sweetalert2";
import { end_points } from "../api/url/api_url";
import { useParams } from "react-router-dom";

const Profile = () => {
  let [dataState,setState]=useState()
  let {id}=useParams()
  console.log(id);
  
  let api = `${end_points.auth}/${id}`

  let getDetails=()=>{
    axiosInstance
    .get(api)
    .then((res) => {
      console.log("response data", res);
      setState(res.data)
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
  }

  useEffect(()=>{
getDetails()
  },[setState,api])
// console.log(dataState);

  return (
    <div>
      <div className="form">
        <h2>Profile</h2>
        <img src={dataState?.profile_img} alt="profile pic" height="300px"/>
        <p>First Name: <span>{dataState?.fname}</span></p>
        <p>Last Name: <span>{dataState?.lname}</span></p>
        <p>email: <span>{dataState?.email}</span></p>
        
      </div>
    </div>
  );
};

export default Profile;
