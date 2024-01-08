import React, { useEffect, useState } from "react";
// import { api } from "../badutilities";
import {api} from '../utilities/api'
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserForm from "../component/UserForm";
import BestForm from "./BestCragForm";

const BestCrags = ({ userProfile, location, setLocation }) => {
  const [areaList, setAreaList] = useState([]);

  const getBestCrags = async () => {
    try {
      const response = await api.post("beta/best-crag/", {
        goal_grade: userProfile?.goal,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        maxDistance: Math.round(userProfile.dwtt),
      });

      if (response.status === 200) {
        setAreaList(response.data.normalized_scores);
      }
    } catch (error) {
      console.error("Error getting best-crag details:", error);
    }
  };

  useEffect(() => {
    console.log("userProfile: ", location.lat, location.lng, typeof userProfile.dwtt);
    getBestCrags();
  }, [userProfile, location.lat, location.lng, userProfile.dwtt]);

  const renderBestForm = () => (
    <tr>
      <BestForm location={location} setLocation={setLocation} />
    </tr>
  );

  return (
    <Table striped>
      <thead>
      <tr>
      <BestForm location={location} setLocation={setLocation} />
    </tr>
        <tr className="text-center">
          <th>Area</th>
          <th>ClimbScore</th>
          <th>Distance</th>
          <th>Overall Score</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(areaList) && areaList.length > 0 ? (
          areaList.map((area, index) => (
            <tr key={index} className="text-center">
              <td><Link to={`../area/${area.uuid}/`}>{area.areaName}</Link></td>
              <td>{area.normalized_score}</td>
              <td>{Math.round(area.distance * 0.62)}mi</td>
              <td>{Math.round(area.overall_score)}</td>
            </tr>
          ))
        ):<tr><td colSpan={4} className="text-center">update preferences for recommended crags</td></tr> }
      </tbody>
    </Table>
  );
};

export default BestCrags;
