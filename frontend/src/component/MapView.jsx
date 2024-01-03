import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
import { useNavigate,Link, useOutletContext,useParams } from 'react-router-dom'
import SearchBox from '../component/SearchBox'
import { endpoints, getAPI, postAPI } from '../utilities/api';
import LoadingSpinner from '../component/LoadingSpinner'
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
        boundsChangedCallback()
    }
  
    const onZoomChanged = () => {
        boundsChanged()
    }
    const onDragEnd = () => {
        boundsChanged()
    }

    const onLoadMap = (map) => {
        mapRef.current = map;
        if(setMap){
            setMap(mapRef.current)
        }
    }
    const onTilesLoaded =() =>{
        setCenter(null)
        boundsChanged()
    }

    const onClickMarker = (marker, index) => {
        setCenter({"lat":data[index]['metadata']['lat'],"lng":data[index]['metadata']['lng']})
        setSelectedMarker({marker:marker, data:data[index]})
    }
    const onLoadMarker = (marker, index) => {
        setMarkers(markers=>[...markers, marker])
    }


    const [place, setPlace] = useState(null)
    useEffect(()=>{
      if(place){
        console.log(place)
        setCenter({"lat":place['lat'],"lng":place['lng']})
        mapRef.current.fitBounds(place.bounds);
      }
    },[place])
    useEffect(()=>{
        if(mapRef.current && (centerOnAll || centerOnFirst)){
            if(centerOnFirst && data){
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(data[0]['metadata']);
                
                mapRef.current.fitBounds(bounds);
            }
            else if(centerOnAll && data && markers.length == data.length){
                console.log(markers)
                console.log(mapRef.current)
                console.log(data)
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < markers.length; i++) {
                    bounds.extend(markers[i].position);
                }
                
                mapRef.current.fitBounds(bounds);
            }
            else{
                setCenter(defaultCenter)
            }
        }
      },[mapRef.current, centerOnFirst,data, centerOnAll, markers])

    

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
                    onTilesLoaded={onTilesLoaded}
                    onDragEnd={onDragEnd}
                    onZoomChanged={onZoomChanged}
                >
                    {
                        data &&
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
                    {
                        showSearch && 
                        <div className='text-center'>
                        <SearchBox address={"New York, NY"} setPlace={setPlace}/>
                        </div>
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