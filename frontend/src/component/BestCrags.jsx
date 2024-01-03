import React, { useEffect, useState } from "react";
import { api } from "../utilities";
import { Table } from "react-bootstrap";
import UserForm from "../component/UserForm";

export const BestCrags = ({userProfile, location, setLocation}) => {
  const [areaList, setAreaList] = useState([]);
  
  useEffect(() => {
    console.log("userProfile: ",location.lat,location.lng, typeof(userProfile.dwtt) )
    const getBestCrags = async () => {
      try {
        const response = await api.post("beta/best-crag/", {
          goal_grade: userProfile?.goal,
          location: {
            lat: location?.lat,
            lng: location?.lng
          },
          maxDistance: userProfile?.dwtt,
        });
        if (response.status === 200) {
          setAreaList(response.data.normalized_scores);
        }
      } catch (error) {
        console.log("Something went wrong with getting the best-crag details");
        // console.error(error.response.data);
        
      }
    };

    getBestCrags();
  }, []);

  return (
    <Table striped>
      <thead>
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
              <td>{area.areaName}</td>
              <td>{area.normalized_score}</td>
              <td>{Math.round(area.distance*0.62)}mi</td>
              <td>{Math.round(area.overall_score)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <UserForm location={location} setLocation={setLocation}/>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
