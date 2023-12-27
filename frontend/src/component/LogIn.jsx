import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { api } from "../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, setUser } = useOutletContext()
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    console.log("clicked Logged In")
    try {
      let response = await api.post("users/login", {
        email: email,
        password: password,
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
   
  };
  useEffect(() => {
  }, [user]);

  return (
    <Form onSubmit={(e) => logIn(e)}>
      <h4>Log In</h4>
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
      <Button type="submit">Log In</Button>
    </Form>
  );
};

export default LogIn;
