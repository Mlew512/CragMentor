import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom'
import {endpoints, postAPI } from '../utilities/api';
import { Container, Row, Col } from "react-bootstrap";
import MapView from '../component/MapView';
import DisplayMessage from '../component/DisplayMessage'
import LoadingSpinner from '../component/LoadingSpinner'
import FavButton from '../component/FavButton'
import RouteBoxView from '../component/RouteBoxView';



function AreaPage() {
    const [dataID, setDataID] = useState(null)
    const [data, setData] = useState(null)
    const [loadMoreAreasNum, setLoadMoreAreasNum] = useState(1)
    const [loadMoreClimbsNum, setLoadMoreClimbsNum] = useState(1)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();

    useEffect(()=>{
        let id = null
        if(params.id)id = params.id
        if(dataID != id){
            setDataID(id)
        }
      },[params])

      useEffect(()=>{
        setIsLoading(true)
        if(dataID){
            getData()
        }
      },[dataID])


    const getData = async () => {
        const response = await postAPI(endpoints.area,null,{uuid:dataID})
        // console.log(response)
        if(response.status){
            setData(response.data.area)
            setIsLoading(false)
            setMessage('')
        }else{
            setMessage('Something went wrong!')
            setData(null)
            setIsLoading(false)

        }



    };
    const loadMoreAreas = async () =>{
        setLoadMoreAreasNum(loadMoreAreasNum + 1)
    }
    const loadMoreClimbs = async () =>{
        setLoadMoreClimbsNum(loadMoreClimbsNum + 1)
    }
    const temp = async () =>{

    }
    console.log(data)
    return (
        <>
        
        {
            isLoading == false &&
                <DisplayMessage message={message} />
        }
        {
            isLoading == false && data != null ?
            (
                <>
                <Container> 
                    <Row>

                    
                    {
                        data.media &&
                        <img style={{width:'100px'}} src={"https://media.openbeta.io/" + data.media[0]['mediaUrl']}/>
                    }
                    <FavButton data={data} />
                    <h1>{data.areaName}</h1>
                    <p>{data.content?.description}</p>
                    <a href={"/area/"+data.ancestors[data.ancestors.length-2]}>Go to {data.parent}</a>

        
    

                        {
                            data.children && data.children.length > 0 &&
                            <Container className="d-flex flex-column">
                                <Row className="text-center">
                                    <h3>Areas({data.children.length})</h3>
                                </Row>
                                <Row >
                                    {data.children.map((area, index) => {
                                        // console.log(index)
                                        if (index < (loadMoreAreasNum * 10)){
                                            return (
                                                <Col sm={4} lg={3} key={index}>
                                                    <RouteBoxView data={area} />
                                                </Col>
                                            );
                                        }
                                    })}
                                    {
                                        loadMoreAreasNum * 10 < data.children.length && 
                                        <button onClick={loadMoreAreas}>Load More</button>    
                                    }
                                </Row>
                            </Container>
                        }   
                        {data.climbs && data.climbs.length > 0 &&
                        <Container className="d-flex flex-column">
                            <Row className="text-center">
                                <h3>Routes({data.totalClimbs})</h3>
                            </Row>
                            <Row >
                                {data.climbs.map((climb, index) => {
                                    if (index < (loadMoreClimbsNum * 10)){
                                        return (
                                            <Col sm={4} lg={3} key={index}>
                                                <RouteBoxView data={climb} />
                                            </Col>                                        
                                            );
                                        }
                                    })}

                                {
                                    loadMoreClimbsNum * 10 < data.climbs.length && 
                                    <button onClick={loadMoreClimbs}>Load More</button>    
                                }
                            </Row>
                        </Container>
                        }
                    <MapView data={[...data.climbs,...data.children]} centerOnAll={true} showSearch={false} boundsChangedCallback={temp} />
                    </Row>
                </Container>
                </>
            ):
            (<LoadingSpinner isLoading={isLoading} />)

        }
        </>
    )


}

export default AreaPage;