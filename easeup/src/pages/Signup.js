import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../styles/signup.css";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { useToast } from "@chakra-ui/react";
import Navigation from "../components/Navigation";

// import {useSignupUserMutation} from '../services/appApi'

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [nameOfUser, setName] = React.useState("");
  // const [pic, setPic] = React.useState("pic-here");
  const [loading, setLoading] = React.useState(false);
  const [showpopup, setShowpopup] = React.useState(true);
  const [phone, setPhone] = React.useState("");

  console.log({ email });
  console.log({ password });
  console.log({ phone });
  console.log({ nameOfUser });
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const toast = useToast();

  //     e.preventDefault();
  //     signupUser({email,password}).then(({data})=>{
  //       if(data){
  //         console.log(data);
  //         Navigate("/chat")
  //       }
  //     })}

  //   const postDetails=(pics)=>{
  //     setLoading(true);

  //     if(pics===undefined){
  //       <Alert showpopup={showpopup} variant="warning">

  //       <p>
  //        Please insert an Image
  //       </p>
  //       <hr />
  //       <div className="d-flex justify-content-end">
  //         <Button onClick={() => setShowpopup(false)} variant="outline-success">
  //           Close me y'all!
  //         </Button>
  //       </div>
  //     </Alert>

  //     // {!show && <Button onClick={() => setShowpopup(false)}>Show Alert</Button>}
  // return;
  //     }
  //     if(pics.type==='image/jpeg'|| pics.type==="image/png"){
  //       const data=new FormData();
  //       data.append("file",pics);
  //       data.append("upload_preset","sopify_chat_app");
  //       data.append("cloud_name","dunfbyufv");
  //       fetch('https://api.cloudinary.com/v1_1/dunfbyufv/image/upload',{
  //         method:"post",
  //         body:data,
  //     }).then((res)=>res.json())
  //     .then(data=>{
  //       setPic(data.url.toString());
  //       console.log(data.url.toString());
  //       setLoading(false);
  //     })
  //       .catch((err)=>{
  //         console.log(err);
  //         setLoading(false);
  //       })
  //     }
  //     else{
  //       <Alert showpopup={showpopup} variant="warning">

  //       <p>
  //        Please insert an Image
  //       </p>
  //       <hr />
  //       <div className="d-flex justify-content-end">
  //         <Button onClick={() => setShowpopup(false)} variant="outline-success">
  //           Close
  //         </Button>
  //       </div>
  //     </Alert>
  //     }

  //   };

  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!nameOfUser || !email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    console.log({ nameOfUser, email, password });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name: nameOfUser,
          email,
          password,
          phone,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      history("/chat");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      {" "}
      <Navigation />
      <Container>
        <Row>
          <Col md={5} className="signup__bg" />
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            {/* </Col> */}
            <Form style={{ width: "80%", maxWidth: 500 }}>
              <br />
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter your Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  value={nameOfUser}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter your Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  required
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />{" "}
                <button
                  style={{
                    height: "27px",
                    background: "#efefef",
                    border: "transparent",
                  }}
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Enter your Phone</Form.Label>
                <Form.Control
                  required
                  type="phone"
                  placeholder="Enter phone "
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={submitHandler}>
                {/* Signup<Spinner animation="border" /> */}
                Sign Up
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Already have an account ?{" "}
                  <Link to="/login">
                    <u style={{ color: "blue" }}> Login</u>
                  </Link>
                </p>
              </div>
            </Form>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
