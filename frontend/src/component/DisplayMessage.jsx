import React, { useState, useEffect } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayMessage = ({message}) => {
    if(message != ""){
        return (
            <>
            <Container>
                <Row>
                    <Col>
                        <p>{message}</p>
                    </Col>    
                </Row>
            </Container>
            </>
          );
    }
  
  
}
export default DisplayMessage