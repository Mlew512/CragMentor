import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from '../utilities';
import SearchBox from "./SearchBox";
import LoadingSpin from "../component/Spinner";

const BestForm = ({ location, setLocation }) => {
  const navigate = useNavigate();
  const { setMyPyramid, setUserProfile } = useOutletContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [goalGrade, setGoalGrade] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  const [loadingData, setIsLoadingData] = useState(false);

  const handleCreate = async () => {
    setIsLoadingData(true);

    try {
      const parsedGoalGrade = parseInt(goalGrade, 10); // Convert goalGrade to integer
      let travelDistanceMeters;

      if (travelDistance < 180) {
        travelDistanceMeters = Math.round(travelDistance * 1609.34);
      } else {
        travelDistanceMeters = 200000;
      }

      setUserProfile(userProfile => ({...userProfile, goal: parsedGoalGrade, dwtt: travelDistance * 1609.34}));

      // Navigate to the dashboard immediately without waiting for the API response
      navigate("/");

      // Make the API request in the background (without awaiting)
      api.post("/best-crag/", {
        goal_grade: parsedGoalGrade,
        location: {
          lat: location.lat,
          lng: location.lng
        },
        maxDistance: travelDistanceMeters,
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.my_pyramid.pyramid);
          setMyPyramid(response.data.my_pyramid.pyramid);
          handleClose();
          setIsLoadingData(false);
        }
      })
      .catch(error => {
        setIsLoadingData(false);
        console.error("Error sending data:", error);
      });
    } catch (error) {
      setIsLoadingData(false);
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
       <Button variant="secondary" onClick={handleShow}>
        Change preferences
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Find best crags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="goalGrade">
              <Form.Label>Goal Bouldering Grade: V scale</Form.Label>
              <Form.Control
                type="number"
                placeholder="1-17"
                autoFocus
                min="1"
                value={goalGrade}
                onChange={(e) => setGoalGrade(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex flex-column mb-3">
              <p>Location</p>
              <div>
              <SearchBox setPlace={setLocation} address={""}/>
              </div>
            </div>
       
    
            <Form.Group className="mb-3" controlId="travelDistance">
              <Form.Label>Search area size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max distance: 125mi"
                autoFocus
                min="1"
                max="125"
                value={travelDistance}
                onChange={(e) => setTravelDistance(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          
          <Button variant="primary" onClick={handleCreate}>
          {loadingData ? <LoadingSpin/> : "Find Best Crags"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BestForm;
