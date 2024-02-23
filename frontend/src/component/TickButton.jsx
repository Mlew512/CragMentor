import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import "./FavButton.css"
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FaCheckSquare, FaHeart, FaRegCheckCircle, FaRegCircle, FaRegEye, FaRegEyeSlash, FaRegHeart } from "react-icons/fa";
import {postAPI,deleteAPI, endpoints} from '../utilities/api'
import {ConvertDictToURLParams} from "../utilities/converters"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const TickButton = ({data, topRight=false}) => {
    const { tickedRoutes, setTickedRoutes, user } = useOutletContext();

    const [isTick, setIsTick] = useState(false);
    const [show, setShow]=useState(false);
    
    useEffect(()=>{
        if(data){
            let isTrue = false
            for(let x = 0; x < tickedRoutes.length; x ++){
                if(tickedRoutes[x]['uuid'] == data['uuid']){
                    setIsTick(true)
                    isTrue = true
                    break;
                }
            }
            if(isTrue == false){
                setIsTick(false)
            }
        }
      },[tickedRoutes, data])


      const deleteTick = async () => {
        try {
            const response = await deleteAPI(`${endpoints.tick}/${data.id}`);
            if (response.status){

                setTickedRoutes(tickedRoutes.filter(tick => tick.id !== data.id))
            }else{
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
            console.log("Error")
        }
    };

    const postTick = async () => {
        try {
            const response = await postAPI(endpoints.tick,null,data);
            // need to add grade, notes & style
            console.log(response)
            if (response.status){
                setTickedRoutes([...tickedRoutes, data])
            }else{
                console.log("Error")  
            }
        } catch (error) {
            console.log(error)
            console.log("Error")
        }
    };


    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if(user == null){

        }else{
            console.log(isTick)
            if(isTick==false){
                postTick()
            }else{
                // modifyTick()(
                setShow(True)
                // open up another box of ticks
                deleteTick()
            }
        }

      }

      return (
        <>
        

        <Button variant="transparent" className={"tick-button " + (topRight ? 'top-right' : '')} onClick={(e) => handleClick(e)}>{
            isTick?
            (
            <>
                <FaRegEye size={27}/>
                <FaRegEye size={27}/>
            
                {/* <FaRegCheckCircle size={27}/> */}
                </>
            ):
            (
                <FaRegCircle size={27}/>
            )
        }</Button>

        </>
      );
  
  
}
export default TickButton