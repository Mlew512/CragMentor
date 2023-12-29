
import { Row, Card } from "react-bootstrap";
import photo3 from "../images/FrontPage/photo3.webp"
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"
import "./HomePage.css"
const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
        <img id="home-background-img" src={photo3} alt="Background Image"/>
            <div className="text-center" style={{margin:"250px"}}>
                <img src={Logo} style={{borderRadius:"50%"}}/>
                <h1>Welcome To CragMentor</h1>
                <p>Your trusted climbing buddy, designed to elevate your climbing skills.</p>
                <p style={{textDecoration:"underline"}} onClick={()=>navigate("/register/")}>Start Your Journey!</p>
            </div>
        </>
    );
}

export default HomePage;