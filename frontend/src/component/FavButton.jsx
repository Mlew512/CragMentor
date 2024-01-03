import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {postAPI,deleteAPI, endpoints} from '../utilities/api'
import {ConvertDictToURLParams} from "../utilities/converters"
const FavButton = ({data}) => {
    const { favoriteRoutes, setFavoriteRoutes, user } = useOutletContext();





    const [isFav, setIsFav] = useState(false);
    useEffect(()=>{
        for(let x = 0; x < favoriteRoutes.length; x ++){
            if(favoriteRoutes[x]['uuid'] == data['uuid']){
                setIsFav(true)
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

        <Button variant="outline-primary" className="favorite-button" onClick={(e) => handleClick(e)}>{
            isFav?
            (
                <FaHeart />
            ):
            (
                <FaRegHeart />
            )
        }</Button>

        </>
      );
  
  
}
export default FavButton