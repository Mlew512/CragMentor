import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
import { useNavigate,Link, useOutletContext,useParams } from 'react-router-dom'
import SearchBox from '../component/SearchBox'
import { endpoints, getAPI, postAPI } from '../utilities/api';
import LoadingSpinner from '../component/LoadingSpinner'
import "./MapView.css"
import { Row } from 'react-bootstrap';

const libraries = ['places', 'drawing'];
const MapView = ({data, showSearch=true, centerOnFirst=false, centerOnAll=false, isLoading=false, setMap=null,boundsChangedCallback=null}) => {




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
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(8);

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
        console.log(place)
      if(place){
        console.log(place)
        setCenter({"lat":place['lat'],"lng":place['lng']})
        mapRef.current.fitBounds(place.bounds);
      }
    },[place])
    useEffect(()=>{
        if(mapRef.current && (centerOnAll || centerOnFirst)){
            console.log("ddddd")
            if(centerOnFirst && data){
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(data[0]['metadata']);
                
                mapRef.current.fitBounds(bounds);
            }
            else if(centerOnAll && data && markers.length == data.length){
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
                    zoom={8}
                    scrollwheel={true}
                    draggable={true}
                    options= {
                        {
                            gestureHandling: 'greedy',
                            rotateControl:false,
                            fullscreenControl:true,
                            mapTypeControl:false,
                            streetViewControl:false,
                            center:center
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