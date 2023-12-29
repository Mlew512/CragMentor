
import {Button, Form, CardBody, Container, Card} from "react-bootstrap";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import photo3 from "../images/FrontPage/photo3.webp";

const SignUp = ({ setUser, setExistingUser, existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    console.log("clicked SignUp")
    try {
      const response = await api.post("users/signup", {
        email: email,
        password: password
      });
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        navigate("/");
      } else {
        alert("Something Went wrong");
      }
    } catch (error) {
      alert(error.response.data)
    }
    
  };

  return (
    <>
      <img id="home-background-img" src={photo3} alt="Background Image"/>
      <Container>
        <Card style={{background:"rgb(255, 255, 255, .15)", top:"200px", left:"100px"}}>
        <CardBody id="sign-forms">
        <Form onSubmit={(e) => signUp(e)}>
          <h4 className="text-center">Register</h4>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              />
          </Form.Group>
          <Button type="submit" className="me-2">Sign Up</Button>
          <Button
              variant="transparent"
              style={{textDecoration:"underline"}}
              onClick={() => setExistingUser(!existingUser)}
              >
              Already have an account?
          </Button>
        </Form>
        </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default SignUp;
