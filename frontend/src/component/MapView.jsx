import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
import { useNavigate,Link, useOutletContext,useParams } from 'react-router-dom'
import SearchBox from '../component/SearchBox'
import { endpoints, getAPI, postAPI } from '../utilities/api';
import LoadingSpinner from '../component/LoadingSpinner'
import "./MapView.css"
import googleMapsApiKey from "../utilities/api.jsx"
import { Row } from 'react-bootstrap';

const libraries = ['places', 'drawing'];
const MapView = ({data, showSearch=true, centerOnFirst=false, centerOnAll=false, isLoading=false, setMap=null,boundsChangedCallback=null}) => {




    const mapRef = useRef();
    const { isLoaded, loadError } = useJsApiLoader({
        // import google maps api from utilities
        googleMapsApiKey: googleMapsApiKey,
        libraries
    });
    const [selectedMarker, setSelectedMarker] = useState(null)

    const defaultCenter = {
        lat: 39.916874,
        lng: -95.569667
    }
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(4);

    const containerStyle = {
        width: '100%',
        height: '80svh',
    }

  

    const boundsChanged = () => {
        if(mapRef.current){
            setCenter(mapRef.current.getCenter().toJSON())
        }
        
 
        boundsChangedCallback()
    }
  
    const onZoomChanged = () => {
  
        boundsChanged()
    }
    const onDrag = () => {
        // setSelectedMarker(null)
    }
    const onDragEnd = () => {
        boundsChanged()
    }

    const onLoadMap = (map) => {
        console.log("dd")
        mapRef.current = map;
        if(setMap){
            console.log(map)
            console.log("ss")
            setMap(mapRef.current)
        }
    }
    const onTilesLoaded =() =>{
        setCenter(mapRef.current.getCenter().toJSON())
        // setCenter(null)
        // boundsChanged()
    }

    const onClickMarker = (marker, index) => {
        // setCenter({"lat":data[index]['metadata']['lat'],"lng":data[index]['metadata']['lng']})
        setSelectedMarker({marker:marker, data:data[index]})
    }
    const onLoadMarker = (marker, index) => {
        setMarkers(markers=>[...markers, marker])
    }


    const [place, setPlace] = useState(null)
    useEffect(()=>{
      if(place){
        setCenter({"lat":place['lat'],"lng":place['lng']})
        mapRef.current.fitBounds(place.bounds);
      }
    },[place])
    useEffect(()=>{
        console.log("ggdfgfd")
        if(mapRef.current && data && (centerOnAll || centerOnFirst)){
            console.log("sssss")
            if(centerOnFirst && data.length != 1){
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(data[0]['metadata']);
                console.log("sssssssss")
                
                mapRef.current.fitBounds(bounds);
            }
            else if(centerOnAll && markers.length == data.length && data.length != 1){
                console.log(data)
                console.log("ssssssssss")
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < markers.length; i++) {
                    bounds.extend(markers[i].position);
                }
                mapRef.current.fitBounds(bounds,{left:20,right:20,bottom:20,top:20});
            }
            else{
                console.log("CENTER")
                setCenter(defaultCenter)
            }
        }
      },[mapRef.current, centerOnFirst,data, centerOnAll, markers])

    

    return (
        isLoaded
            ?
            <div className='map-container' style={{ position: 'relative' }}>
                
                <GoogleMap
                    zoom={4}
                    scrollwheel={true}
                    draggable={true}
                    options= {
                        {
                            gestureHandling: 'greedy',
                            rotateControl:false,
                            fullscreenControl:true,
                            mapTypeControl:false,
                            streetViewControl:false,
                            center:center,
                            maxZoom:15,
                            minZoom:3,
                            mapTypeId: 'hybrid'
                        }   
                    }
                    onDrag={onDrag}
                    // center={center}
                    onLoad={onLoadMap}
                    mapContainerStyle={containerStyle}
                    onTilesLoaded={onTilesLoaded}
                    onDragEnd={onDragEnd}
                    onZoomChanged={onZoomChanged}
                >
                    {
                        data &&
                        data.map((item, index) =>(
                            <Marker 
                                key={index}
                                icon={"/flag2.png"}
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
                        <RouteBoxView data={selectedMarker['data']} />
                    </InfoWindow>
                    ) : null}
                    {
                        showSearch && 
                        <SearchBox address={""} setPlace={setPlace} isFloating={true}/>
                    }
                    
                </GoogleMap>
                {isLoading &&
                <LoadingSpinner isLoading={isLoading} center={true}/>
                }
            </div>
            :
            null
    );
}

export default MapView; 