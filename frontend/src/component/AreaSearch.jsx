import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { postAPI, endpoints } from '../utilities/api';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'
import './AreaSearch.css'
const AreaSearch = ({}) => {
  const [searchTerm, setSearchTerm] = useState("")
  // const [lastSearch, setLastSearch] = useState("")
  // const [searchIDs, setSearchIDs] = useState([])
  const [data, setData] = useState([])
  const [requests, setRequests] = useState([])


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
        let controller = new AbortController();
        setRequests([...requests,controller])
        const response = await postAPI(endpoints.search_areas,null,{"search":searchTerm},{
          signal:controller.signal
        })
        // console.log(response)
        // console.log(lastSearch)
        // console.log(searchIDs)
        // if(searchIDs[searchIDs.length-1] == lastSearch){
          if(response.status && response.data){
            setData(response['data']['areas'].splice(0,5))
          }
        // }
      }
    }
  return (
    <>
    <div className='area-search-input'>
      <input
        type="text"
        placeholder="Enter name, address, city, state..."
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






