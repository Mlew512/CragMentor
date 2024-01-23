import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import "./FavButton.css"
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {postAPI,deleteAPI, endpoints} from '../utilities/api'
import {ConvertDictToURLParams} from "../utilities/converters"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const FavButton = ({data, topRight=false}) => {
    const { favoriteRoutes, setFavoriteRoutes, user } = useOutletContext();

    const [isFav, setIsFav] = useState(false);
    useEffect(()=>{
        if(data){
            let isTrue = false
            for(let x = 0; x < favoriteRoutes.length; x ++){
                if(favoriteRoutes[x]['uuid'] == data['uuid']){
                    setIsFav(true)
                    isTrue = true
                    break;
                }
            }
            if(isTrue == false){
                setIsFav(false)
            }
        }
      },[favoriteRoutes, data])


      const deleteFavorite = async () => {
        try {
            const response = await deleteAPI(`${endpoints.favorite}/${data.uuid}`);
            if (response.status){

                setFavoriteRoutes(favoriteRoutes.filter(fav => fav.uuid !== data.uuid))
            }else{
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
            console.log("Error")
        }
    };

    const postFavorite = async () => {
        try {
            const response = await postAPI(endpoints.favorite,null,data);
            console.log(response)
            if (response.status){
                setFavoriteRoutes([...favoriteRoutes, data])
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
            console.log(isFav)
            if(isFav==false){
                postFavorite()
            }else{
                deleteFavorite()
            }
        }

      }

      return (
        <>
        {/* <SignupLoginModal show={showAuthModal} setShow={setShowAuthModal} /> */}

        <Button variant="transparent" className={"favorite-button " + (topRight ? 'top-right' : '')} onClick={(e) => handleClick(e)}>{
            isFav?
            (
                <FaStar className='star' size={27}/>
            ):
            (
                <FaRegStar className='star' size={27}/>
            )
        }</Button>

        </>
      );
  
  
}
export default FavButton