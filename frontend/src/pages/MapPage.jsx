import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import RouteBoxView from '../component/RouteBoxView'
import {endpoints, postAPI} from '../utilities/api'
import MapView from '../component/MapView'
import { useNavigate,Link, useOutletContext,useParams } from 'react-router-dom'

const libraries = ['places', 'drawing'];
const MapPage = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [mapBounds, setMapBounds] = useState(null)
  const [data, setData] = useState([])
  const params = useParams();
  const navigate = useNavigate();
  
    useEffect(()=>{
      setIsLoading(true)
      getData()
    },[params,mapBounds])

    const getData = async () =>{
  
        let northEast = mapBounds.getNorthEast()
        let southWest = mapBounds.getSouthWest()
        const response = await postAPI(endpoints.climb_bounds,null,
            {
                zoom:1.5,topLeftLat:northEast.lat(),topLeftLng:northEast.lng(),bottomRightLat:southWest.lat(),bottomRightLng:southWest.lng()
            })
        console.log(response.data.crags.cragsWithin)
        if(response.status){
            setData(response.data.crags.cragsWithin)
            setIsLoading(false)
            setMessage('')
        }else{
            setMessage('Something went wrong!')
            setData(null)
            setIsLoading(false)
        }
      
  }

    return (
      <>
      <MapView data={data} setMapBounds={setMapBounds} mapBounds={mapBounds}/>
      </>
    );
}

export default MapPage; 