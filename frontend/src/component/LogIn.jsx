import {Button, Form, CardBody, Container, Card} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {setAuth, postAPI, endpoints} from '../utilities/api'

const LogIn = ({setExistingUser, existingUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, setUser, setUserId} = useOutletContext()
  const navigate = useNavigate();
  
  const logIn = async (e) => {
    e.preventDefault();
    try {
      console.log("response")
      let response = await postAPI(endpoints.auth_login,null, {
        email: email,
        password: password,
      });
      setUser(response.data.user);
      setUserId(response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.id);
      localStorage.setItem("user", response.data.user)
      setAuth(response.data.token)
      navigate("/pyramid/");
      // window.location.reload();
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
   
  };
  useEffect(() => {
  }, [user]);

  return (
    <>
      <img id="home-background-img"/>
      <Container className="p-0">
        <Card 
        style={{background:"rgb(255, 255, 255, .5)"}}
        
        >
        <CardBody id="sign-forms">
          <Form onSubmit={(e) => logIn(e)}>
            <h4 className="text-center">Log In</h4>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
            <Button type="submit" className="me-2">Log In</Button>
            <Button
              variant="transparent"
              style={{textDecoration:"underline"}}
              onClick={() => setExistingUser(!existingUser)}
              >
              New User?
            </Button>
          </Form>
        </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default LogIn;
