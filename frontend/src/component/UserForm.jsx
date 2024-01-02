import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from '../utilities';
import SearchBox from "./SearchBox";

const UserForm = ({location, setLocation}) => {
  const navigate = useNavigate();
  const { setMyPyramid } = useOutletContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [goalGrade, setGoalGrade] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  // const [location, setLocation] = useState({"lat": null, "lng": null})

  const handleCreate = async () => {
    console.log(parseInt(goalGrade,10))

    try {
      const parsedGoalGrade = parseInt(goalGrade, 10); // Convert goalGrade to integer
      const travelDistanceMeters = travelDistance * 1609.34;

      const response = await api.post("beta/", {
        goal_grade: parseInt(goalGrade,10),
        location: {
          lat: location.lat,
          lng: location.lng
        },
        maxDistance: travelDistanceMeters,
      });

      if (response.status === 200) {
        console.log(response.data.my_pyramid.pyramid);
        navigate("/pyramid/");
        setMyPyramid(response.data.my_pyramid.pyramid);
        handleClose();
      }

    } catch (error) {
      console.error("Error sending data:", error);
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
            <Form.Group className="mb-3" controlId="goalGrade">
              <Form.Label>Goal Grade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter goal grade"
                autoFocus
                min="1"
                value={goalGrade}
                onChange={(e) => setGoalGrade(e.target.value)}
              />
            </Form.Group>
            {/* Search Box Component */}
            <SearchBox setPlace={setLocation} address={location} />

            <Form.Group className="mb-3" controlId="travelDistance">
              <Form.Label>Travel Distance</Form.Label>
              <Form.Select
                value={travelDistance}
                onChange={(e) => setTravelDistance(e.target.value)}
              >
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
