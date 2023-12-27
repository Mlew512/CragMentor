import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
const libraries = ['places', 'drawing'];
const RoutesMapPage = () => {


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
    const [center, setCenter] = useState(defaultCenter);

    const containerStyle = {
        width: '100%',
        height: '80svh',
    }

 
   


    const onLoadMap = (map) => {
        mapRef.current = map;
    }

    const onClickMarker = (marker, index) => {
        setCenter({"lat":crags[index]['metadata']['lat'],"lng":crags[index]['metadata']['lng']})
        setSelectedMarker({marker:marker, data:crags[index]})
    }
    const onLoadMarker = (marker, index) => {
        console.log(crags[index])
    }


    return (
        isLoaded
            ?
            <div className='map-container' style={{ position: 'relative' }}>
                <GoogleMap
                    zoom={5}
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
                        crags.map((crag, index) =>(
                            <Marker 
                                key={index}
                                onLoad={(event) => onLoadMarker(event, index)} 
                                onClick={(event) => onClickMarker(event,index)} 
                                position={{"lat":crag.metadata.lat,"lng":crag.metadata.lng}} 
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