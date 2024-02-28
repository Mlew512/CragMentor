import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  Form,
  Modal,
  Card,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import { FaRegCheckCircle, FaRegCircle, FaRegHeart } from "react-icons/fa";
import { postAPI, deleteAPI, endpoints } from "../utilities/api";



const TickButton = ({ data, topRight = false }) => {
  const { tickedRoutes, setTickedRoutes, user } = useOutletContext();
  
  const [climbStyle, setClimbStyle]= useState("Redpoint")
  const [isTick, setIsTick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTickModal, setNewTickModal]= useState(false);
  const [tickDate, setTickDate]=useState("");
  const [tickNotes, setTickNotes]= useState("")
  const [showEditModal, setShowEditModal] = useState(false);

  // const [selectedTick, setSelectedTick]= useState({})

  useEffect(() => {
    if (data) {
      let isTrue = false;
      for (let x = 0; x < tickedRoutes.length; x++) {
        if (tickedRoutes[x]["uuid"] === data["uuid"]) {
          setIsTick(true);
          isTrue = true;
          break;
        }
      }
      if (!isTrue) {
        setIsTick(false);
      }
    }
  }, [tickedRoutes, data]);

  const handleEditClick = (tickId) => {
    setSelectedTick(tickId);
    setShowEditModal(true);
};

  const deleteTick = async (tickId) => {
    try {
      const response = await deleteAPI(`${endpoints.tick}/${tickId}`);
      if (response.status) {
        setTickedRoutes(tickedRoutes.filter((tick) => tick.id !== tickId));
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
      console.log("Error");
    }
  };

  const postTick = async (style, date) => {
    try {
       const cleanData={
        name: data["name"],
        uuid: data["uuid"],
        grade: data["grades"]["yds"] ? data["grades"]["yds"] : data["grades"]["vscale"],
        style: climbStyle,
        date_ticked: tickDate,
        areaName: data["parent"]["area_name"],
        lat: data["metadata"]["lat"],
        long: data["metadata"]["lng"],
        mountain_id: data["metadata"]["mp_id"],
        type: data["type"]["sport"] ? "sport" : "bouldering",
        notes: tickNotes,
      }  
      // Make API call to add a new tick
      const response = await postAPI(endpoints.tick, null, cleanData);
      if (response.status) {
        setTickedRoutes([...tickedRoutes , cleanData])
        setNewTickModal(false); // Close the modal after adding the tick
        
      } else {
        console.log("Error adding tick");
      }
    } catch (error) {
      console.error("Error adding tick:", error);
    }
  };
  

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (user == null) {
      // Handle scenario where user is not logged in
    } else {
        setShowModal(true);
      }
    }

  return (
    <>
      <Button
        variant="transparent"
        className={"tick-button " + (topRight ? "top-right" : "")}
        onClick={(e) => handleClick(e)}
      >
        {isTick ? <FaRegCheckCircle size={27} /> : <FaRegCircle size={27} />}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>My Ticks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <CardHeader className="text-center">
              <h4>Ticks</h4>
            </CardHeader>
            <CardBody>
              <Table striped>
                <thead>
                  <tr className="text-center">
                    <th>Style</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tickedRoutes.map((tick, index) => {
                    if (tick.uuid === data.uuid) {
                      return (
                        <tr key={index} className="text-center">
                          <td>{tick.style}</td>
                          <td>
                            {new Date(tick.date_ticked).toLocaleDateString()}
                          </td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => handleEditClick(tick)}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => deleteTick(tick.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setNewTickModal(true)}>
            Add New Tick
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={newTickModal} onHide={() => setNewTickModal(false)}>
      <Modal.Header closeButton>
          <Modal.Title>Add Tick</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="styleSelect">
              <Form.Label>Style:</Form.Label>
              <Form.Control 
                as="select" 
                value={climbStyle} 
                onChange={(e) => setClimbStyle(e.target.value)}
              >
                <option value="Redpoint">Redpoint</option>
                <option value="Pinkpoint">Pinkpoint</option>
                <option value="Fell/Hung">Fell/Hung</option>
                <option value="Onsight">Onsight</option>
                <option value="Flash">Flash</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="datePicker">
              <Form.Label>Date:</Form.Label>
              <Form.Control 
                type="date" 
                value={tickDate} 
                onChange={(e) => setTickDate(e.target.value)} 
              />
            </Form.Group>

          <Form.Group controlId="textfield">
            <Form.Label>Notes</Form.Label>
            <Form.Control
            type="textarea"
            value={tickNotes}
            onChange={(e) => setTickNotes(e.target.value)}>

            </Form.Control>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNewTickModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={postTick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TickButton;
