import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FavButton from './FavButton';
const RouteBoxView = ({data}) => {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  console.log(data)
  return (
    <>
    {
      data.name != null ?
(        <Card style={{ width: '18rem' }}>
        
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{data['name']}</Card.Title>
          <Card.Text>
          Total Climbs - {data['totalClimbs']}
          </Card.Text>
          <FavButton data={data} />
          <Button onClick={() => handleClick(`/route/${data['uuid']}`)} variant="outline-primary">View Route</Button>
        </Card.Body>
      </Card>)
      :
      (        
      <Card style={{ width: '18rem' }}>
        
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{data['areaName']}</Card.Title>
          <Card.Text>
          <FavButton data={data} />
          Total Climbs - {data['totalClimbs']}
          </Card.Text>
          <Button onClick={() => handleClick(`/area/${data['uuid']}`)} variant="outline-primary">View Area</Button>
        </Card.Body>
      </Card>)
    }
    </>
  );
}
export default RouteBoxView