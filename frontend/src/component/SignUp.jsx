import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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
    <Form onSubmit={(e) => signUp(e)}>
      <h4>Sign Up</h4>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Label>Display Name</Form.Label>
        <Form.Control
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="displayname"
        />
      </Form.Group> */}
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUp;
