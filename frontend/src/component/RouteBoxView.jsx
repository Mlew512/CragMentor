import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const RouteBoxView = ({route}) => {
  
  return (
    <>
    <div>
      
    <h1>{route['areaName']}</h1>
    <p>Total Climbs - {route['totalClimbs']}</p>
    </div>


    </>
  );
}
export default RouteBoxView