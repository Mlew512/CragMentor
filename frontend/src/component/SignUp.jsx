
import {Button, Form, CardBody, Container, Card} from "react-bootstrap";
import { useState } from "react";
import { api } from "../utilities/api";
import { useNavigate } from "react-router-dom";

const SignUp = ({setUser, setExistingUser, existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("users/signup", {
        email: email,
        password: password
      });
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("user_id", response.data.id);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        navigate("/pyramid/");
      } else {
        alert("Something Went wrong");
      }
    } catch (error) {
      alert(error.response.data)
    }
    
  };

  return (
    <>
      <img id="home-background-img" className="home-background-image"/>
      <Container className="p-0">
        <Card style={{background:"rgb(255, 255, 255, .5)"}}>
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
