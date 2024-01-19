import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { postAPI, endpoints } from '../utilities/api';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'
import './AreaSearch.css'
import { IoSearch } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled, { keyframes } from 'styled-components';


const spinAnimation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
const SpinningAiOutlineLoading3Quarters = styled(AiOutlineLoading3Quarters)`
animation: ${spinAnimation} 1s linear infinite;
`;

const AreaSearch = ({}) => {
  const [searchTerm, setSearchTerm] = useState("")
  // const [lastSearch, setLastSearch] = useState("")
  // const [searchIDs, setSearchIDs] = useState([])
  const [data, setData] = useState([])
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading]= useState(false)


  useEffect(()=>{
    // setLastSearch(searchTerm)
    searchChanged()
  },[searchTerm])
  

    const searchChanged = async () => {
      if(searchTerm == ""){
        setData([])
      }else{
        for(let i = 0; i < requests.length; i++){
          requests[i].abort()
        }
        setIsLoading(true)
        let controller = new AbortController();
        setRequests([...requests,controller])
        const response = await postAPI(endpoints.search_areas,null,{"search":searchTerm},{
          signal:controller.signal
        })
          if(response.status && response.data){
            setData(response['data']['areas'].splice(0,5))
            setIsLoading(false)
          }
      }
    }

  return (
    <>
    <div className='area-search-input'>
      { isLoading ?(
      <SpinningAiOutlineLoading3Quarters className='search-icon' size={15}/>)
      :
      (<IoSearch className='search-icon' size={25}/>)
      }
      <input
        className='input-bar'
        type="text"
        placeholder="search by climbing area"
        value={searchTerm} 
        onChange={(e) => { setSearchTerm(e.target.value) }} // update the state when you type something

      />
      <ListGroup className='area-search-input-list'>

      {
            data &&
            data.map((item, index) =>(
              <ListGroup.Item key={index} action href={"/area/"+item.uuid}>
              {item.areaName}
            </ListGroup.Item>
            ))
        }


      </ListGroup>
    </div>
    
      
    </>
  );
}
export default AreaSearch






