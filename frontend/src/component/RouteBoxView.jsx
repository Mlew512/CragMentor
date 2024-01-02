import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const RouteBoxView = ({route}) => {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  console.log(route)
  return (
    <>
    {
      route.name != null ?
(        <Card style={{ width: '18rem' }}>
        
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{route['name']}</Card.Title>
          <Card.Text>
          Total Climbs - {route['totalClimbs']}
          </Card.Text>
          <Button onClick={() => handleClick(`/route/${route['uuid']}`)} variant="outline-primary">View Route</Button>
        </Card.Body>
      </Card>)
      :
      (        <Card style={{ width: '18rem' }}>
        
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{route['areaName']}</Card.Title>
          <Card.Text>
          Total Climbs - {route['totalClimbs']}
          </Card.Text>
          <Button onClick={() => handleClick(`/route/${route['uuid']}`)} variant="outline-primary">View Route</Button>
        </Card.Body>
      </Card>)
    }
    </>
  );
}
export default RouteBoxView