import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { api } from '../badutilities';
import {api} from '../utilities/api'
import SearchBox from "./SearchBox";
import LoadingSpin from "../component/Spinner";

const BestForm = ({ location, setLocation }) => {
  const navigate = useNavigate();
  const { setMyPyramid, setUserProfile } = useOutletContext();
  const [show, setShow] = useState(false);
  const [goalGrade, setGoalGrade] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  const [loadingData, setIsLoadingData] = useState(false);

  const handleShow = () => setShow(true);

  const handleCreate = async () => {
    setIsLoadingData(true);

    try {
      const parsedGoalGrade = parseInt(goalGrade, 10);
      let travelDistanceMeters;

      if (travelDistance < 180) {
        travelDistanceMeters = Math.round(travelDistance * 1609.34);
      } else {
        travelDistanceMeters = 200000;
      }

      setUserProfile(userProfile => ({...userProfile, goal: parsedGoalGrade, dwtt: travelDistance * 1609.34}));

      const response = await api.post("beta/best-crag/", {
        goal_grade: parsedGoalGrade,
        location: {
          lat: location.lat,
          lng: location.lng
        },
        maxDistance: travelDistanceMeters,
      });

      if (response.status === 200) {
        console.log(show)
        setShow(false); // Close the modal
        console.log(show)
        // navigate("./dashboard/");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("no crags found in that area. change location and try again.")
      
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Change preferences
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
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
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate} disabled={loadingData}>
            {loadingData ? <LoadingSpin /> : "Find Best Crags"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BestForm;
