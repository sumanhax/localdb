import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import { end_points } from "../api/url/api_url";
import {Card,Row,Button,Col,Container} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const ProductsFetch = () => {
  let [dataState, setState] = useState([]);
  let api = end_points.product;

  let getDetails = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        //   console.log("response data", res);
        setState(res.data);
        // console.log("data", dataState);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  let deleteHndler=(id)=>{
// console.log(id);
// let link=api+`/${id}`
axiosInstance.delete(`${api}/${id}`).then((res)=>{
console.log(res);
alert("Deleted successfully")
getDetails();
}).catch((err)=>{
console.log(err);
})
  }
  useEffect(() => {
    getDetails();
  }, [setState, api]);
  return (
    <div>
     <Container>
      <Col className="mt-5">
      <Row>
      <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Product Name</th>
          <th>Brand</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          dataState.map((x)=>(
            <tr key={x.id}>
          <td>{x.product_name}</td>
          <td>{x.brand}</td>
          <td><Button as={Link} to={`productdetails/${x.id}`} className="me-3">Details</Button><Button variant="warning" as={Link} to={`productedit/${x.id}`} className="me-3">Edit</Button><Button variant="danger" onClick={()=>{deleteHndler(x.id)}}>Delete</Button></td>
          
        </tr>
          ))
        }
        
      </tbody>
    </Table>
      </Row>
      </Col>
     </Container>
    </div>
  );
};

export default ProductsFetch;
