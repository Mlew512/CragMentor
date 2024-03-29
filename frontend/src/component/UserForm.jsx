import React, { useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { Alert, Button, ButtonGroup, Form, Modal, ToggleButton } from "react-bootstrap";
// import { api } from '../badutilities';
import {api} from '../utilities/api'
import SearchBox from "./SearchBox";
import LoadingSpin from "../component/Spinner";
import { TbPyramidPlus } from "react-icons/tb";

const UserForm = ({location, setLocation}) => {
  const navigate = useNavigate();
  const { setMyPyramid, setUserProfile} = useOutletContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [goalGrade, setGoalGrade] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  const [loadingData, setIsLoadingData] = useState(false);
  const [errorMSG, setErrorMSG] = useState(null);
  const [climbingType, setClimbingType] = useState("bouldering");

  const handleCreate = async () => {
    setErrorMSG(null);
    setIsLoadingData(true)
    try {
      // console.log("location: ", location.lat, location.lng)
      // need to implement different parsing for sport climbing
      // const parsedGoalGrade = parseInt(goalGrade, 10); // Convert goalGrade to integer
      let travelDistanceMeters;
      // if(goalGrade.length < 3){
      //   setGoalGrade(parsedGoalGrade)
      //   console.log(goalGrade)

      // }

      if (travelDistance < 180) {
          travelDistanceMeters = Math.round(travelDistance * 1609.34);
      } else {
          travelDistanceMeters = 200000;
      }

      setUserProfile(userProfile => ({...userProfile, goal: parseInt(goalGrade, 10), dwtt: travelDistance* 1609.34}))
      const response = await api.post("/beta/", {
        goal_grade: goalGrade,
        location: {
          lat: location.lat,
          lng: location.lng
        },
        maxDistance: travelDistanceMeters,
      });

      if (response.status === 200) {
        // console.log("myPyramid: ",response.data.my_pyramid.pyramid);
        navigate("/pyramid/");
        setMyPyramid(response.data.my_pyramid.pyramid);
        handleClose();
        setIsLoadingData(false)
      }

    } catch (error) {
      setIsLoadingData(false)
      console.error("Error sending data:", error);
      // alert("no crags found in that area or our servers are down, change location and try again.")
      setErrorMSG(alertError);
    }
  }

  const alertError = (
    <Alert variant="danger">
          no crags found in that area or our servers are down, change location and try again.
        </Alert>
  )
  const handleTypeToggle = (type) => {
    setClimbingType(type)
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className="d-flex justify-content-center">
        <div className="me-2">
          Create 
        </div>
        <TbPyramidPlus size={25}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Pyramid </Modal.Title>
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
              checked={climbingType === 'bouldering'}
              onClick={()=> handleTypeToggle('bouldering')}
              >
                Bouldering
              </ToggleButton>
              <ToggleButton
              type="radio"
              variant="outline-primary"
              name="climbingType"
              value="sportClimbing"
              checked={climbingType === 'sportClimbing'}
              onClick={()=> handleTypeToggle('sportClimbing')}
              >
                Sport Climbing
              </ToggleButton>
            </ButtonGroup>
            {/* dropdown for sport */}
            {climbingType === 'sportClimbing' && (
        <Form.Group className="mb-3" controlId="sportClimbingGrade">
          <Form.Label>Goal Sport Climbing Grade</Form.Label>
          <Form.Select
            onChange={(e) => setGoalGrade(e.target.value)}
          >
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
            {climbingType === 'bouldering' && (
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
              <SearchBox setPlace={setLocation} address={""}/>
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
          {errorMSG? errorMSG : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          
          <Button variant="primary" onClick={handleCreate}>
          {loadingData ? <LoadingSpin/> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserForm;
