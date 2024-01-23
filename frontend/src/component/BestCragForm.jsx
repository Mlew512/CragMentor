import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  Modal,
  ToggleButton,
} from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { api } from "../utilities/api";
import SearchBox from "./SearchBox";
import LoadingSpin from "../component/Spinner";

const BestForm = () => {
  const { setUser, user } = useOutletContext();
  const [location, setLocation] = useState({});
  const [show, setShow] = useState(false);
  const [goalGrade, setGoalGrade] = useState("");
  const [travelDistance, setTravelDistance] = useState("");
  const [loadingData, setIsLoadingData] = useState(false);
  const [climbingType, setClimbingType] = useState("bouldering");
  // const [newGoal, setNewGoal]= useState(null)

  const handleShow = () => setShow(true);

  const handleTypeToggle = (type) => {
    setClimbingType(type);
  };

  const handleUpdateUser = async () => {
    setIsLoadingData(true);

    try {
      let travelDistanceMeters;
      
        if (travelDistance < 1) {
          travelDistanceMeters = user.distance_willing_to_travel;
        } else if (travelDistance < 180) {
          travelDistanceMeters = Math.round(travelDistance * 1609.34);
        } else {
          travelDistanceMeters = 200000;
        }

      const response = await api.post(`users/info/${user.id}/`, {
        goal: goalGrade,
        lat: location.lat,
        long: location.lng,
        distance_willing_to_travel: travelDistanceMeters,
      });

      if (response.status === 200) {
        setUser(response.data);
        setShow(false); // Close the modal
        console.log("User profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle the error as needed
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
            {/* Climbing type toggle buttons */}
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

            {/* Dropdown for sport climbing grade */}
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
                  <option value="5.12c">5.12c</option>10000
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

            {/* Dropdown for bouldering grade */}
            {climbingType === "bouldering" && (
              <Form.Group className="mb-3" controlId="BoulderClimbingGrade">
                <Form.Label>Goal Bouldering Grade</Form.Label>
                <Form.Select
                  onChange={(e) => setGoalGrade(parseInt(e.target.value, 10))}
                >
                  {/* Add options dynamically based on bouldering grades */}
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((grade) => (
                    <option key={grade} value={grade}>
                      V{grade}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            {/* Search Box Component */}
            <div className="d-flex flex-column mb-3">
              <p>Location</p>
              <div>
                <SearchBox setPlace={setLocation} address="" />
              </div>
            </div>

            {/* Input for travel distance */}
            <Form.Group className="mb-3" controlId="travelDistance">
              <Form.Label>Search area size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max in miles: 125"
                autoFocus
                min="1"
                max="125"
                defaultValue={30}
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
            onClick={handleUpdateUser} // Use onClick instead of onSubmit
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
