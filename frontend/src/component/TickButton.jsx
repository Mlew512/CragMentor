/* eslint-disable react/prop-types */
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
import { putAPI, postAPI, deleteAPI, endpoints } from "../utilities/api";

const TickButton = ({ data, topRight = false }) => {
  const { tickedRoutes, setTickedRoutes, user } = useOutletContext();

  const [climbStyle, setClimbStyle] = useState("Redpoint");
  const [isTick, setIsTick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTickModal, setNewTickModal] = useState(false);
  const [tickDate, setTickDate] = useState("");
  const [tickNotes, setTickNotes] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTick, setSelectedTick] = useState({});
  const [tickCounter, setTickCounter] = useState(0)

  useEffect(() => {
    if (data) {
      const tickedStyles = new Set(['Redpoint', 'Onsight', 'Flash', 'Pinkpoint']);
      const count = tickedRoutes.reduce((acc, tick) => {
        acc[tick.uuid] = acc[tick.uuid] ? acc[tick.uuid] + 1 : 1;
        return acc;
      }, {});
      setTickCounter(count);

      setIsTick(tickedRoutes.some(tick => tick.uuid === data.uuid && tickedStyles.has(tick.style)));
    }
  }, [tickedRoutes, data]);

  const handleEditClick = (tick) => {
    setSelectedTick({
      ...tick,
      date_ticked: new Date(tick.date_ticked).toISOString().split("T")[0], // Convert date to ISO format
    });
    setShowEditModal(true);
  };

  const handleStyleChange = (e) => {
    setSelectedTick({
      ...selectedTick,
      style: e.target.value,
    });
  };

  const handleNotesChange = (e) => {
    setSelectedTick({
      ...selectedTick,
      notes: e.target.value,
    });
    console.log(selectedTick.notes)
  };

  const putTick = async () => {
    try {
      const response = await putAPI(`${endpoints.tick}/${selectedTick.id}`, null, selectedTick);
      if (response.status) {
        const updatedTickedRoutes = tickedRoutes.map(tick =>
          tick.id === selectedTick.id ? selectedTick : tick
        );
        setTickedRoutes(updatedTickedRoutes);
        setShowEditModal(false);
        setShowModal(true);
      } else {
        console.log("Error editing tick");
      }
    } catch (error) {
      console.error("Error editing tick:", error);
    }
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

  const postTick = async () => {
    try {
      console.log(data.lng)
      const cleanData = {
        name: data.name,
        uuid: data.uuid,
        grade: data.grades? (data.grades.yds ? data.grades.yds : data.grades.vscale) : data.grade,
        style: climbStyle,
        date_ticked: tickDate,
        areaName: data.area ? data.area : data.parent.area_name, 
        lat: data.metadata ? data.metadata.lat : data.lat,
        long: data.metadata ? data.metadata.lng : data.lng ,
        mountain_id: data.metadata ? data.metadata.mp_id : data. mountain_id,
        type: data.type? (data.type.sport ? "Sport" : "Bouldering") : (data.grade[0]=="V" ? "Bouldering" : "Sport"),
        notes: tickNotes,
      };
      // Make API call to add a new tick
      const response = await postAPI(endpoints.tick, null, cleanData);
      if (response.status) {
        setTickedRoutes([...tickedRoutes, cleanData]);
        setNewTickModal(false); // Close the modal after adding the tick
        setShowModal(true); //reopen ticks
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
        {isTick ?
        <span>
      <FaRegCheckCircle size={27} />
      <span className="tick-counter">{tickCounter[data.uuid]}</span>
    </span>: 
    <span>
      <FaRegCircle size={27} /><span className="tick-counter">{tickCounter[data.uuid]}</span>
      </span>}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{data.name}({data.grades? (data.grades.yds ? data.grades.yds : data.grades.vscale) : data.grade})</Modal.Title>
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
                    <th>Notes</th>
                    <th>
                      Edit <br />
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickedRoutes
                  .sort((b,a)=> new Date(a.date_ticked)-new Date(b.date_ticked))
                  .map((tick, index) => {
                    if (tick.uuid === data.uuid) {
                      return (
                        <tr key={index} className="text-center">
                          <td>{tick.style}</td>
                          <td>
                            {new Date(tick.date_ticked).toLocaleDateString()}
                          </td>
                          <td>{tick.notes?.slice(0, 25)}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => handleEditClick(tick)}
                            >
                              Edit
                            </Button>
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
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              setNewTickModal(true);
            }}
          >
            Add New Tick
          </Button> 
        </Modal.Footer>
      </Modal>
      <Modal show={newTickModal} onHide={() => setNewTickModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tick {data.name}({data.grades? (data.grades.yds ? data.grades.yds : data.grades.vscale) : data.grade})</Modal.Title>
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
                max={new Date().toISOString().split('T')[0]} 
                onChange={(e) => setTickDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="textfield">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="textarea"
                maxLength={100}
                value={tickNotes}
                onChange={(e) => setTickNotes(e.target.value)}
              ></Form.Control>
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tick</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="styleSelect">
              <Form.Label>Style:</Form.Label>
              <Form.Control
                as="select"
                value={selectedTick.style}
                onChange={(e) => handleStyleChange(e)}
              >
                <option value="Redpoint">Redpoint</option>
                <option value="Pinkpoint">Pinkpoint</option>
                <option value="Fell/Hung">Fell/Hung</option>
                <option value="Onsight">Onsight</option>
                <option value="Flash">Flash</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="textfield">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={100}
                value={selectedTick.notes}
                onChange={(e) => handleNotesChange(e)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={putTick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TickButton;
