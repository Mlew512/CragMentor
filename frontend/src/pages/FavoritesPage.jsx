import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../component/LoadingSpinner';
import {endpoints, postAPI}  from "../utilities/api"
function FavoritesPage() {
    const { favorites, setFavorites } = useState([])

    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();
    const navigate = useNavigate();


      useEffect(()=>{
        setIsLoading(true)
        getData()
      },[])


    const getData = async () => {
        
        try {
            const response = await postAPI(endpoints.favorites);
            console.log(response)
            if (response.status){
                setFavorites(response.data.results)
                setIsLoading(false)
                setMessage('')
            }else{
                setFavorites([])
                setIsLoading(false)
                setMessage('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
            setMessage('Something went wrong!')
            setFavorites([])
            setIsLoading(false)

        }
    };

  

    return (
        <>
        <Container fluid className="p-0">
            <Row>
                <Col className='map-view-properties-container'>
                    {message != "" &&
                    <Container>
                        <Row>
                            <Col>
                                <p>{message}</p>
                            </Col>    
                        </Row>
                    </Container>
                    }
                    {
                        isLoading == false ?
                        (
                            <>
                            <Container fluid className="p-0">
                                <Row>

                                    {
                                        favorites.map((fav, index) =>{
                                            <Col xs={12} md={6} key={index}>
                                                
                                            </Col>  
                                        })        
                                    } 
                                </Row>
                            </Container>
                            </>
                        ):
                        (
                            <LoadingSpinner isLoading={isLoading} />
                        )
                    }                            
                </Col>
            </Row>
        </Container>
        </>
    )


}

export default FavoritesPage;