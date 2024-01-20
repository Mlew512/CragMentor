import Table from "react-bootstrap/Table";
import { Row, Col, Button } from "react-bootstrap";
import { api } from "../utilities/api";
import { useOutletContext} from "react-router-dom";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function PyramidTable({setPyramid}) {
  const [allPyramid, setAllPyramid] = useState([]);
  const {lastPyramidId, setLastPyramidId}= useOutletContext();

  const handleAPyramid = async (id) => {
    try {
      const response = await api.get(`pyramid/${id}/`);
      if (response.status === 200) {
        setPyramid(response.data.routes);
        setLastPyramidId(response.data.id)
      }
    } catch (error) {
      console.log("pyramid not found", error);
    }
  };

  const getAllPyramid = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await api.get(`/pyramid/user/${user_id}/`);
      if (response.status === 200) {
        setAllPyramid(response.data);
      }
    } catch (error) {
      console.log("cant get all pyramid", error);
    }
  };
  const handleDeletePyramid = async (id) => {
    try {
      const response = await api.delete(`pyramid/${id}/`);

      if (response.status === 204) {
        console.log("deleted");
        getAllPyramid();
      }
    } catch (error) {
      console.log("pyramid not found", error);
    }
  };
  const reversedPyramids = [...allPyramid].reverse();
  
  useEffect(() => {
    getAllPyramid();
  }, []);

  useEffect(() => {
    if(reversedPyramids[0]){
      if(lastPyramidId){
        handleAPyramid(lastPyramidId)
      }else{
        handleAPyramid(reversedPyramids[0].id)
        // console.log("reversed")
      }
    }
  }, [reversedPyramids[0]]);  


  // Reverse the allPyramid array to get the Most Recent


  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col className="p-0"lg={10}>
          <Table striped bordered hover size="sm" className="text-center">
            <thead>
              <tr>
                <th>Goal Grade</th>
                <th>Location</th>
                <th colSpan={2}>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reversedPyramids) &&
              reversedPyramids.length > 0 ? (
                reversedPyramids.map((pyramid, idx) => (
                  <tr key={idx}>
                    <td onClick={() => handleAPyramid(pyramid.id)}>
                      <Button variant="outline-info">{pyramid.goal_grade}</Button>
                    </td>
                    {/* <td>{pyramid.goal_grade}</td> */}
                    <td>{pyramid.location}</td>
                    <td>
                      {new Date(pyramid.date_generated).toLocaleDateString()}
                    </td>
                    <td onClick={() => handleDeletePyramid(pyramid.id)}>
                      <Button variant="transparent">
                        {" "}
                        <RiDeleteBin6Line color="red" />{" "}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Saved Pyramid</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default PyramidTable;
