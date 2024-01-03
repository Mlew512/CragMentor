import { Row, Card } from "react-bootstrap";
import photo3 from "../images/FrontPage/photo3.webp";
import background1 from "../imagesnew/FrontPage/background1.jpg";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import "./HomePage.css";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <img id="home-background-img" src={background1} alt="Background Image" />
      <div className="text-center" style={{ margin: "250px" }}>
        <img src={Logo} style={{ borderRadius: "50%" }} />
        <h1>Explore CragMentor</h1>
        <p>
          Discover prime climbing spots with our advanced algorithms, tailored
          to your location, preferences, and climbing goals.
        </p>
        <p>
          Unlock Tailored Training Plans: Personalized training plans featuring
          actual routes to enhance and elevate your climbing experience.
        </p>

        <p
          style={{ textDecoration: "underline" }}
          onClick={() => navigate("/register/")}
        >
          Start Your Journey!
        </p>
      </div>
    </>
  );
};

export default HomePage;
