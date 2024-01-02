import React, { useEffect, useState } from "react";
import { api } from "../utilities";
import { Table } from "react-bootstrap";

export const BestCrags = ({userProfile, location}) => {
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    // console.log("userProfile: ",location)
    const getBestCrags = async () => {
      try {
        const response = await api.post("beta/best-crag/", {
          goal_grade: userProfile?.goal,
          location: {
            lat: location.lat,
            lng: location.lng,
          },
          maxDistance: userProfile?.dwtt,
        });
        if (response.status === 200) {
          setAreaList(response.data.normalized_scores);
        }
      } catch (error) {
        console.log("Something went wrong with getting the best-crag details");
        console.error(error.response.data);
      }
    };

    getBestCrags();
  }, []);

  return (
    <Table striped>
      <thead>
        <tr className="text-center">
          <th>Area</th>
          <th>Distance</th>
          <th>Score</th>
          <th>NS</th>
          <th>ND</th>
          <th>Overall Score</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(areaList) && areaList.length > 0 ? (
          areaList.map((area, index) => (
            <tr key={index} className="text-center">
              <td>{area.areaName}</td>
              <td>{area.distance}</td>
              <td>{area.score}</td>
              <td>{area.normalized_score}</td>
              <td>{area.normalized_distance}</td>
              <td>{area.overall_score}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No data available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
