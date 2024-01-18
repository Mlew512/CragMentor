import React, { useState } from "react";
import {Button, ButtonGroup, Form, Modal, ToggleButton } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { api } from '../badutilities';
import { api } from "../utilities/api";
import SearchBox from "./SearchBox";
import LoadingSpin from "../component/Spinner";

const BestForm = ({ location, setLocation }) => {
  const navigate = useNavigate();
  const { setMyPyramid, setUserProfile } = useOutletContext();
  const [show, setShow] = useState(false);
  const [goalGrade, setGoalGrade] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  const [loadingData, setIsLoadingData] = useState(false);
  const [climbingType, setClimbingType] = useState("bouldering");

  const handleShow = () => setShow(true);

  const handleCreate = async () => {
    setIsLoadingData(true);

    try {
      // const parsedGoalGrade = parseInt(goalGrade, 10);
      let travelDistanceMeters;

      if (travelDistance < 180) {
        travelDistanceMeters = Math.round(travelDistance * 1609.34);
      } else {
        travelDistanceMeters = 200000;
      }
      // this should be changed to send a post to the users profile
      setUserProfile((userProfile) => ({
        ...userProfile,
        goal: goalGrade,
        dwtt: travelDistance * 1609.34,
      }));

      const response = await api.post("beta/best-crag/", {
        goal_grade: goalGrade,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        maxDistance: travelDistanceMeters,
      });

      if (response.status === 200) {
        setShow(false); // Close the modal
      }
    } catch (error) {
      try {
        // Second attempt with maxDistance set to 300000
        const response = await api.post("beta/best-crag/", {
          goal_grade: goalGrade,
          location: { lat: location.lat, lng: location.lng },
          maxDistance: 300000,
        });

        if (response.status === 200) {
          setShow(false); // Close the modal
        }
      } catch (secondError) {
        console.error("Second attempt failed:", secondError);
        alert("No crags found even with expanded search area");
      } finally {
        setIsLoadingData(false);
      }
    } finally {
      setIsLoadingData(false);
    }
  };
  const handleTypeToggle = (type) => {
    setClimbingType(type)
  }

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
            {/* climbing type toggle button */}
            <ButtonGroup toggle>
              <ToggleButton
                type="radio"
                variant="outline-primary"
                name="climbingType"
                value="bouldering"
                checked={climbingType === "bouldering"}
                onClick={() => handleTypeToggle("bouldering")}
              >
                Bouldering
              </ToggleButton>
              <ToggleButton
                type="radio"
                variant="outline-primary"
                name="climbingType"
                value="sportClimbing"
                checked={climbingType === "sportClimbing"}
                onClick={() => handleTypeToggle("sportClimbing")}
              >
                Sport Climbing
              </ToggleButton>
            </ButtonGroup>
            {/* dropdown for sport */}
            {climbingType === "sportClimbing" && (
              <Form.Group className="mb-3" controlId="sportClimbingGrade">
                <Form.Label>Goal Sport Climbing Grade</Form.Label>
                <Form.Select onChange={(e) => setGoalGrade(e.target.value)}>
                  <option value="5.5">5.5</option>
                  <option value="5.6">5.6</option>
                  <option value="5.7">5.7</option>
                  <option value="5.8">5.8</option>
                  <option value="5.9">5.9</option>
                  <option value="5.10a">5.10a</option>
                  <option value="5.10b">5.10b</option>
                  <option value="5.10c">5.10c</option>
                  <option value="5.10d">5.10d</option>
                  <option value="5.11a">5.11a</option>
                  <option value="5.11b">5.11b</option>
                  <option value="5.11c">5.11c</option>
                  <option value="5.11d">5.11d</option>
                  <option value="5.12a">5.12a</option>
                  <option value="5.12b">5.12b</option>
                  <option value="5.12c">5.12c</option>
                  <option value="5.12d">5.12d</option>
                  <option value="5.13a">5.13a</option>
                  <option value="5.13b">5.13b</option>
                  <option value="5.13c">5.13c</option>
                  <option value="5.13d">5.13d</option>
                  <option value="5.14a">5.14a</option>
                  <option value="5.14b">5.14b</option>
                  <option value="5.14c">5.14c</option>
                  <option value="5.14d">5.14d</option>
                  <option value="5.15a">5.15a</option>
                  <option value="5.15b">5.15b</option>
                  <option value="5.15c">5.15c</option>
                  <option value="5.15d">5.15d</option>
                </Form.Select>
              </Form.Group>
            )}
            {climbingType === "bouldering" && (
              <Form.Group className="mb-3" controlId="BoulderClimbingGrade">
                <Form.Label>Goal Bouldering Grade</Form.Label>
                <Form.Select
                  onChange={(e) => setGoalGrade(parseInt(e.target.value, 10))}
                >
                  <option value={1}>V1</option>
                  <option value={2}>V2</option>
                  <option value={3}>V3</option>
                  <option value={4}>V4</option>
                  <option value={5}>V5</option>
                  <option value={6}>V6</option>
                  <option value={7}>V7</option>
                  <option value={8}>V8</option>
                  <option value={9}>V9</option>
                  <option value={10}>V10</option>
                  <option value={11}>V11</option>
                  <option value={12}>V12</option>
                  <option value={13}>V13</option>
                  <option value={14}>V14</option>
                  <option value={15}>V15</option>
                  <option value={16}>V16</option>
                  <option value={17}>V17</option>
                </Form.Select>
              </Form.Group>
            )}
            {/* Search Box Component */}
            <div className="d-flex flex-column mb-3">
              <p>Location</p>
              <div>
                <SearchBox setPlace={setLocation} address={""} />
              </div>
            </div>

            <Form.Group className="mb-3" controlId="travelDistance">
              <Form.Label>Search area size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max in miles: 125"
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
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={loadingData}
          >
            {loadingData ? <LoadingSpin /> : "Find Best Crags"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BestForm;
