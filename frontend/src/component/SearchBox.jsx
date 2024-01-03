import React, { useEffect, useRef, useState } from 'react';
import { StandaloneSearchBox,useJsApiLoader } from '@react-google-maps/api';
import { Form, Button } from 'react-bootstrap';
import "./SearchBox.css"

const libraries = ['places','drawing'];

const SearchBox = ({address, setPlace}) => {
  const [placeAddress, setPlaceAddress] = useState(address)
  const autocompleteRef = useRef();
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBNqBkhvtTqAS74u3zDYgQ4NNq5aBZsrTs',
        libraries
    });
    const onLoadAutocomplete = (autocomplete) => {
        autocompleteRef.current = autocomplete;
        console.log(autocompleteRef.current)
    }
    const onPlacesChanged = () => {
        let places = autocompleteRef.current.getPlaces();
        if(places.length > 0){
            console.log(places[0].geometry.viewport)

            // map.fitBounds(autocomplete.getPlace().geometry.viewport);

            setPlaceAddress(places[0]['formatted_address'])
            setPlace({
                "name":places[0]['formatted_address'],
                "lat":places[0]['geometry']['location'].lat(),
                "lng":places[0]['geometry']['location'].lng(),
                "bounds":places[0]['geometry']['viewport'],
        
        })
        }
    }
  return (
    <>
    {isLoaded &&
    <StandaloneSearchBox
    onLoad={onLoadAutocomplete}
    onPlacesChanged={
      onPlacesChanged
    }
  >
    <input
      type="text"
      placeholder="Customized your placeholder"
      value={placeAddress} 
      onChange={(e) => { setPlaceAddress(e.target.value) }} // update the state when you type something
      className='search-input'
      // style={{
      // boxSizing: `border-box`,
      // border: `1px solid transparent`,
      //   width: `300px`,
      //   height: `40px`,
      //   padding: `10px`,
      //   borderRadius: `10px`,
      //   boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
      //   fontSize: `14px`,
      // outline: `none`,
      //   textOverflow: `ellipses`,
      //   position: "relative",
      // left: "50%",
      // marginLeft: "-120px"
      // }}
    />
    
      
    </StandaloneSearchBox>

    }
    </>
  );
}
export default SearchBox






