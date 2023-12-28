import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
import {endpoints, api} from '../utilities/api'
import { useNavigate,Link, useOutletContext,useParams } from 'react-router-dom'
import SearchBox from '../component/SearchBox'

const libraries = ['places', 'drawing'];
const MapView = ({data}) => {




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
    const [zoom, setZoom] = useState(8);

    const containerStyle = {
        width: '100%',
        height: '80svh',
    }

 
   


    const onLoadMap = (map) => {
        mapRef.current = map;
    }

    const onClickMarker = (marker, index) => {
        setCenter({"lat":data[index]['metadata']['lat'],"lng":data[index]['metadata']['lng']})
        setSelectedMarker({marker:marker, data:data[index]})
    }
    const onLoadMarker = (marker, index) => {
        console.log(data[index])
    }


    const [place, setPlace] = useState(null)
    useEffect(()=>{
      if(place){
        console.log(place)
        setCenter({"lat":place['lat'],"lng":place['lng']})
        mapRef.current.fitBounds(place.bounds);
      }
    },[place])

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
                    <SearchBox address={"New York"} setPlace={setPlace} />
                </GoogleMap>
                
            </div>
            :
            null
    );
}

export default MapView; 