import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FavButton from './FavButton';
import "./RouteBoxView.css"
const RouteBoxView = ({data}) => {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  console.log(data)
  return (
    <>
       
      <Card>
        {
          data['media'].length > 0 ?
          (<Card.Img variant="top" src={"https://media.openbeta.io/" + data['media'][0]['mediaUrl']} />):
          (<Card.Img variant="top" src={"/landscape-placeholder.svg"} />)
        }
        
        
        <Card.Body>
          {
            data.name != null ?
            (<Card.Title>{data['name']}</Card.Title>):
            (<Card.Title>{data['areaName']}</Card.Title>)
          }
          <Card.Text>
          
          {
            data['totalClimbs'] &&
            <>Total Climbs - {data['totalClimbs']}</>
          }
          {
            data.grades && data.grades.vscale &&
            <><Button variant="outline-info">{data['grades']['vscale']}</Button></>
          }
          {
            data.grades && data.grades.yds && data.grades.vscale == null &&
            <><Button variant="outline-info">{data['grades']['yds']}</Button></>
          }
          </Card.Text>

          {
            data.name != null ?
            (<Button onClick={() => handleClick(`/route/${data['uuid']}`)} variant="outline-primary">View Route</Button>):
            (<Button onClick={() => handleClick(`/area/${data['uuid']}`)} variant="outline-primary">View Area</Button>)
          }
          <FavButton data={data} />
          
        </Card.Body>
      </Card>
    </>
  );
}
export default RouteBoxView