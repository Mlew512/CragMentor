import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from '../utilities';
import SearchBox from "./SearchBox";

const UserForm = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {setMyPyramid} = useOutletContext();
  const [location, setLocation] = useState("");
  
  const handleCreate = async () => {
    console.log(location)
    try {
      const currentGrade = document.getElementById('currentGrade').value
      const goalGrade = document.getElementById('goalGrade').value
      // const location = document.getElementById('location').value
      const travelDistanceMiles = document.getElementById('travelDistance').value
      const travelDistanceMeters = travelDistanceMiles * 1609.34;
        
      const response = await api.post("beta/", {
        goal_grade: 7,
        location: {
          lat: location.lat,
          lng: location.lng
        },
        maxDistance: 200000
        // // current_grade: `v${currentGrade}`, // Do these values need to be sent as "v'number'"
        // // goal_grade: `v${goalGrade}`, // Do these values need to be sent as "v'number'"
        // location: location,
        // distance_willing_to_travel: travelDistanceMeters, //are these correct keys for BE?
      }); 
      if (response.status ===200){
        console.log(response.data.my_pyramid.pyramid)
        navigate("/pyramid/") 
        setMyPyramid(response.data.my_pyramid.pyramid)
        handleClose()
      }
    
    } catch (error) {
      console.error("Error sending data:", error)
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Generate Pyramid
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Pyramid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="currentGrade">
              <Form.Label>Current Grade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter current grade"
                autoFocus
                min="1"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="goalGrade">
              <Form.Label>Goal Grade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter goal grade"
                autoFocus
                min="1"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              
            </Form.Group> */}
            <SearchBox setPlace={setLocation} address={location}/>

            {/* <Search location={location}/> */}
            <Form.Group className="mb-3" controlId="travelDistance">
              <Form.Label>Travel Distance</Form.Label>
              <Form.Select defaultValue="">
                <option value="" disabled>
                  Select a distance you are willing to travel
                </option>
                <option value="25">25 miles</option>
                <option value="50">50 miles</option>
                <option value="100">100 miles</option>
                <option value="200">200 miles</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserForm;
