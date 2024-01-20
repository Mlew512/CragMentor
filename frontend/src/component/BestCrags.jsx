import { useEffect, useState } from "react";

import { api } from "../utilities/api";
import { Table } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";

import BestForm from "./BestCragForm";

const BestCrags = () => {
  const [areaList, setAreaList] = useState([]);
  const { user } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const getBestCrags = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("beta/best-crag/", {
        goal_grade: user.goal.length < 3 ? parseInt(user.goal) : user.goal,
        location: {
          lat: user.lat,
          lng: user.long,
        },
        maxDistance: Math.round(user.distance_willing_to_travel),
      });

      if (response.status === 200) {
        setAreaList(response.data.normalized_scores);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting best-crag details:", error);
    }
  };

  useEffect(() => {
    if (user.goal != null) {
      getBestCrags();
    }

  }, [user.goal, user.lat, user.long, user.distance_willing_to_travel]);

  return (
    <Table striped>
      <thead>
        <tr>
          <BestForm />
        </tr>
        <tr className="text-center">
          <th>Area</th>
          {/* <th>ClimbScore</th> */}
          <th>Distance</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {!isLoading && Array.isArray(areaList) && areaList.length > 0 ? (
          areaList.map((area, index) => (
            <tr key={index} className="text-center">
              <td>
                <Link to={`../area/${area.uuid}/`}>{area.areaName}</Link>
              </td>
              {/* <td>{Math.round(area.normalized_score)}</td> */}
              <td>{Math.round(area.distance * 0.62)}mi</td>
              <td>{Math.round(area.overall_score)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              {isLoading
                ? "Loading..."
                : "Update preferences to load best crags for you"}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BestCrags;
