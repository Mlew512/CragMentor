import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {postAPI,deleteAPI, endpoints} from '../../utilities/api'
import {ConvertDictToURLParams} from "../../utilities/converters"
const FavButton = ({data}) => {
    const { favorites, setFavorites, user } = useOutletContext();


    const [showAuthModal, setShowAuthModal] = useState(false)



    const [isFav, setIsFav] = useState(false);
    useEffect(()=>{
        if(favorites.includes(data.id)){
            setIsFav(true)
        }else{
            setIsFav(false)
        }
      },[favorites])


      const deleteFavorite = async (id) => {
        try {
            const response = await deleteAPI(`${endpoints.user_fav}${id}`);
            if (response.status){
                console.log("Fav")
            }else{
                console.log("Error")
            }
        } catch (error) {
            console.log("Error")
        }
    };

    const postFavorite = async (id) => {
        try {
    
            let data = {
                "data_id":id,
                "data_type":"Area",
                "name":data['name']
            }
            let params = ConvertDictToURLParams(data)
            const response = await postAPI(`${endpoints.user_fav}${id}`,params);
            console.log(response)
            if (response.status){
                console.log("Fav")
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
            setShowAuthModal(true)
        }else{
            // if(isFav==false){
            //     setFavorites([...favorites, property.listingId])
            //     postFavorite(property.listingId)
            // }else{
            //     setFavorites(favorites.filter(fav => fav !== property.listingId))
            //     deleteFavorite(property.listingId)
            // }
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