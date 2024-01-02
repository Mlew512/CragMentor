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
  const [map, setMap] = useState(null)
  const [data, setData] = useState([])
  const [countries, setCountries] = useState(null)
  const params = useParams();
  const navigate = useNavigate();

  

    const getData = async () =>{
      if(map){
        setIsLoading(true)
        let zoom = map.getZoom()
        let response = null;
        console.log(zoom)
        if(zoom < 5){
          if(countries == null){
            response = await postAPI(endpoints.countries)
          }
          else{
            response = {status:true,data:countries}
          }
          
        }else{
          let mapBounds = map.getBounds()
          if(mapBounds){
            let northEast = mapBounds.getNorthEast()
            let southWest = mapBounds.getSouthWest()
  
            response = await postAPI(endpoints.climb_bounds,null,
                {
                    zoom:zoom,topLeftLat:northEast.lat(),topLeftLng:northEast.lng(),bottomRightLat:southWest.lat(),bottomRightLng:southWest.lng()
                })            
          }else{
            response = {status:false}
          }

        }
        console.log(response)
        if(response.status){
            if(response.data.crags.cragsWithin){
              if(zoom < 8){
                setData(response.data.crags.cragsWithin)
              }else{
                let newData = [];
                for(let i = 0; i < response.data.crags.cragsWithin.length; i++){
                  newData = [...newData,...response.data.crags.cragsWithin[i].children,...response.data.crags.cragsWithin[i].climbs]
                }
                if(newData.length > 0){
                  setData(newData)
                }
                
              }
              
            }else if(response.data.crags.countries){
                setData(response.data.crags.countries)
                if(countries == null){
                  setCountries(response.data)
                }
              
            }
            
            setIsLoading(false)
            setMessage('')
        }else{
            setMessage('Something went wrong!')
            setIsLoading(false)
        }
      }
      
  }

    return (
      <>
      <MapView setMap={setMap} data={data} isLoading={isLoading} boundsChangedCallback={getData}/>
      </>
    );
}

export default MapPage; 