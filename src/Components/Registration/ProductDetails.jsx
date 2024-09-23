import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { end_points } from "../api/url/api_url";
import axiosInstance from "../api/axiosinstance/axiosInstance";
import Swal from "sweetalert2";
import { Card, Row,Col,Container, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  let { id } = useParams();
//   console.log("id", id);

  let [dataState, setState] = useState([]);
  let api = end_points.product;

  let getDetails = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        setState(res.data);
        console.log("data", res.data);
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

  let data = dataState?.find((x) => x?.id == id);

  console.log("data",data);

  return (
    <div>
   <Container>
    <Col className="mt-5">
    {
            <Row >
              <Card style={{ width: '18rem' }} key={data?.id}>
             <Card.Img variant="top" src={data?.product_img} />
             <Card.Body>
               <Card.Title>{data?.brand}</Card.Title>
               
             </Card.Body>
             <ListGroup className="list-group-flush">
               <ListGroup.Item>{data?.product_name}</ListGroup.Item>
               <ListGroup.Item>{data?.price}</ListGroup.Item>
               <ListGroup.Item>{data?.details}</ListGroup.Item>
             </ListGroup>
           </Card>
            </Row>
         
    }
    </Col>
   </Container>
        </div>
  )
};

export default ProductDetails;
