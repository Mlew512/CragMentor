import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
import {endpoints, api} from '../utilities/api'
import { useNavigate,Link, useOutletContext,useParams } from 'react-router-dom'

const libraries = ['places', 'drawing'];
const RoutesMapPage = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams();
  const navigate = useNavigate();

    useEffect(()=>{
      setIsLoading(true)
      getData()
    },[params])


  const getData = async () => {
      if(params.pyramid){

      }
      if(params.area){

      }
      if(params.climb){

      }
      const response = await getAPI(endpoints.pyramid)
      console.log(response)
      if(response.status){
          setData(response.data.results)
          setIsLoading(false)
          setMessage('')
      }else{
          setMessage('Something went wrong!')
          setPosts([])
          setIsLoading(false)
      }
    }







    const areas=[
      {
        "id": "63689fc7e80bff5a9951d7f6",
        "areaName": "\"Big\" Wall Crag",
        "area_name": "\"Big\" Wall Crag",
        "density": 1.8,
        "gradeContext": "US",
        "totalClimbs": 9,
        "metadata": {
          "lng": -86.61699999999999,
          "lat": 37.090109999999996
        }
      },
      {
        "id": "6368a60be80bff5a995c51a8",
        "areaName": "(1) Cable Sign Zone",
        "area_name": "(1) Cable Sign Zone",
        "density": 4.2,
        "gradeContext": "US",
        "totalClimbs": 21,
        "metadata": {
          "lng": -121.61990125,
          "lat": 47.429423750000005
        }
      },
    ]
    const crags = [
                {
                  "areaName": "Turtle, The",
                  "totalClimbs": 4,
                  "aggregate": {
                    "byGrade": [
                      {
                        "count": 1,
                        "label": "V1"
                      },
                      {
                        "count": 1,
                        "label": "V7"
                      },
                      {
                        "count": 1,
                        "label": "V0"
                      },
                      {
                        "count": 1,
                        "label": "V1-2"
                      }
                    ]
                  },
                  "metadata": {
                    "areaId": "c602eaad-6c56-5743-9cfc-21a40bb6248a",
                    "lat": 35.01557,
                    "lng": -85.33121
                  }
                },
                {
                  "areaName": "Edge, The",
                  "totalClimbs": 3,
                  "aggregate": {
                    "byGrade": [
                      {
                        "count": 1,
                        "label": "V2"
                      },
                      {
                        "count": 2,
                        "label": "V0"
                      }
                    ]
                  },
                  "metadata": {
                    "areaId": "2d70104f-36b7-584c-9b5d-edd41a6ec4d0",
                    "lat": 35.01557,
                    "lng": -85.33121
                  }
                },
                {
                  "areaName": "Slide, The",
                  "totalClimbs": 8,
                  "aggregate": {
                    "byGrade": [
                      {
                        "count": 1,
                        "label": "V4"
                      },
                      {
                        "count": 1,
                        "label": "V5-6"
                      },
                      {
                        "count": 1,
                        "label": "V2-"
                      },
                      {
                        "count": 1,
                        "label": "V2-3"
                      },
                      {
                        "count": 1,
                        "label": "V0"
                      },
                      {
                        "count": 1,
                        "label": "V0-1"
                      },
                      {
                        "count": 1,
                        "label": "V8"
                      },
                      {
                        "count": 1,
                        "label": "V3"
                      }
                    ]
                  },
                  "metadata": {
                    "areaId": "20033a29-dc8a-5142-94a9-b243ec4200f3",
                    "lat": 35.01556,
                    "lng": -85.33121
                  }
                },
                {
                  "areaName": "Bulge, The",
                  "totalClimbs": 0,
                  "aggregate": {
                    "byGrade": []
                  },
                  "metadata": {
                    "areaId": "5abf2b7c-0596-5a5e-89bd-7a901adaeab4",
                    "lat": 35.01562,
                    "lng": -85.33277
                  }
                },
                {
                  "areaName": "Cliffhanger, The",
                  "totalClimbs": 17,
                  "aggregate": {
                    "byGrade": [
                      {
                        "count": 1,
                        "label": "V4"
                      },
                      {
                        "count": 1,
                        "label": "V0"
                      },
                      {
                        "count": 1,
                        "label": "V2-"
                      },
                      {
                        "count": 3,
                        "label": "V3"
                      },
                      {
                        "count": 1,
                        "label": "V0+"
                      },
                      {
                        "count": 1,
                        "label": "V10-11"
                      },
                      {
                        "count": 1,
                        "label": "V5+"
                      },
                      {
                        "count": 1,
                        "label": "V1"
                      },
                      {
                        "count": 1,
                        "label": "V2+"
                      },
                      {
                        "count": 1,
                        "label": "V5-6"
                      },
                      {
                        "count": 1,
                        "label": "V0-1"
                      },
                      {
                        "count": 1,
                        "label": "V1-2"
                      },
                      {
                        "count": 1,
                        "label": "V4-"
                      },
                      {
                        "count": 1,
                        "label": "V4-5"
                      },
                      {
                        "count": 1,
                        "label": "V6-"
                      }
                    ]
                  },
                  "metadata": {
                    "areaId": "ce8e2080-2f50-5c78-8fdc-bab9d7341544",
                    "lat": 35.01581,
                    "lng": -85.33294
                  }
                },
                {
                  "areaName": "Dino",
                  "totalClimbs": 2,
                  "aggregate": {
                    "byGrade": [
                      {
                        "count": 1,
                        "label": "V2"
                      },
                      {
                        "count": 1,
                        "label": "V4"
                      }
                    ]
                  },
                  "metadata": {
                    "areaId": "c26e9204-1626-58ad-ba0d-18081b8f570e",
                    "lat": 35.01575,
                    "lng": -85.33303
                  }
                }
            ]










    const mapRef = useRef();
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBNqBkhvtTqAS74u3zDYgQ4NNq5aBZsrTs',
        libraries
    });
    const [selectedMarker, setSelectedMarker] = useState(null)

    const defaultCenter = {
        lat: 29.916874,
        lng: -95.569667
    }
    const [data, setData] = useState(areas);
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(8);

    const containerStyle = {
        width: '100%',
        height: '80svh',
    }

 
   


    const onLoadMap = (map) => {
        mapRef.current = map;
    }

    const onClickMarker = (marker, index) => {
        setData(crags)
        setZoom(zoom+2)
        setCenter({"lat":data[index]['metadata']['lat'],"lng":data[index]['metadata']['lng']})
        setSelectedMarker({marker:marker, data:data[index]})
    }
    const onLoadMarker = (marker, index) => {
        console.log(data[index])
    }


    return (
        isLoaded
            ?
            <div className='map-container' style={{ position: 'relative' }}>
                <GoogleMap
                    zoom={zoom}
                    scrollwheel={true}
                    draggable={true}
                    options= {
                        {
                            gestureHandling: 'greedy',
                            rotateControl:false,
                            fullscreenControl:false,
                            mapTypeControl:false,
                            streetViewControl:false,
                            center:center
                        }   
                    }

                    center={center}
                    onLoad={onLoadMap}
                    mapContainerStyle={containerStyle}
                    onTilesLoaded={() => setCenter(null)}
                >
                    {
                        data.map((item, index) =>(
                            <Marker 
                                key={index}
                                onLoad={(event) => onLoadMarker(event, index)} 
                                onClick={(event) => onClickMarker(event,index)} 
                                position={{"lat":item.metadata.lat,"lng":item.metadata.lng}} 
                            />
                        ))
                    }

                    {selectedMarker ? (
                    <InfoWindow
                        visible={true}
                        position={{"lat":selectedMarker['data']['metadata']['lat'],"lng":selectedMarker['data']['metadata']['lng']}}
                        marker={selectedMarker['marker']}
                        onCloseClick={() => {
                            setSelectedMarker(null)
                        }}
                        >
                            <RouteBoxView route={selectedMarker['data']} />
                    </InfoWindow>
                    ) : null}

                </GoogleMap>
            </div>
            :
            null
    );
}

export default RoutesMapPage; 