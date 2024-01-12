import React from 'react';
import { Container, Nav, Navbar, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
// import { api } from '../badutilities';
import {api} from '../utilities/api'
import { MdOutlineContactSupport } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

// Navbar Pages Icons
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { TbHexagonalPyramidPlus } from "react-icons/tb"; //pyramid icon
import { FiMapPin } from "react-icons/fi"; //
import { AiOutlineProfile } from "react-icons/ai";
import AreaSearch from "./AreaSearch"
import "./Header.css";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // not working
    try {
      const authToken = localStorage.getItem("token");
      if (authToken) {
        api.defaults.headers.common["Authorization"] = `Token ${authToken}`;
      }
      const response = await api.post("users/logout");
      if (response.status === 204) {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user")
        delete api.defaults.headers.common["Authorization"];
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Navbar data-bs-theme="light">
      <Container>
        {user ? (
          <>
            <Navbar.Brand as={Link} to="/contact/" className='d-flex align-items-center'>
              <img src={Logo} style={{ width: "50px", height: "50px", borderRadius: "50px" }} alt="Logo" />
              <h3 className="cragmentor-title">CragMentor</h3>
            </Navbar.Brand>
            <Nav className="links" variant="underline">
              <Nav.Link as={Link} to="/pyramid/" title="Make a Pyramid"><TbHexagonalPyramidPlus size={30}/></Nav.Link>
              <Nav.Link as={Link} to="/mypyramids/" title="My Pyramids"><AiOutlineProfile size={30}/></Nav.Link>
              <Nav.Link as={Link} to="/dashboard/" title="Dashboard"><MdOutlineFavoriteBorder size={30}/></Nav.Link>
              <Nav.Link as={Link} to="/map/" title="Map"><FiMapPin size={30}/></Nav.Link>
              <AreaSearch />
            </Nav>
            <div className="user-dropdown">
              <DropdownButton 
                as={ButtonGroup}
                key="start"
                className={"custom-dropdown"}
                drop="start"
                variant="transparent"
                style={{ borderRadius: "50px" }}
                title={
                  <span>
                    <FaRegUserCircle size={30} className="d-md-none" />
                    <span className="d-none d-md-inline"><strong>{user.email}</strong></span> {/* Hide on small screens */}
                  </span>
                }
              >
                <Dropdown.Item as={Link} to="/dashboard/" className="d-flex flex-row align-items-center" class="dropitems">
                  <div className="px-1"><MdOutlineFavoriteBorder size={20}/> Dashboard </div>
                </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pyramid/" className="d-flex flex-row align-items-center" class="dropitems"><TbHexagonalPyramidPlus size={20}/>Generate</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mypyramids/" className="d-flex flex-row align-items-center" class="dropitems"><AiOutlineProfile size={20}/>MyPyramids</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/map/" className="d-flex flex-row align-items-center" class="dropitems"><FiMapPin size={20}/>Map</Dropdown.Item>
                  <Dropdown.Item className='dropitems'>
                  </Dropdown.Item>
                <Dropdown.Item as={Link} to="/contact/" className="d-flex flex-row align-items-center">
                  <MdOutlineContactSupport size={20} /><div className="px-1">Contact Us</div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} style={{ color: "red" }}>Log out</Dropdown.Item>
              </DropdownButton>
            </div>
          </>
        ) : (
          <div 
          style={{width:"100%"}}
          className='d-flex justify-content-end'>
            <Nav.Link as={Link} to="/register/" style={{marginRight:"17%"}}>Login</Nav.Link>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
