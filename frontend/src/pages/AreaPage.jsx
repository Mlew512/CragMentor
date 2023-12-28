import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAPI, endpoints } from '../utilities/api';
function AreaPage() {
    const [dataID, setDataID] = useState(null)
    const [data, setData] = useState(null)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        let id = null
        if(params.id)id = params.id
        if(dataID != id){
            setDataID(id)
        }
      },[params])

      useEffect(()=>{
        setIsLoading(true)
        getData()
      },[dataID])


    const getData = async () => {
        const response = await getAPI(`${endpoints.area}${dataID}`)
        console.log(response)
        if(response.status){
            setData(response.data.result)
            setIsLoading(false)
            setMessage('')
        }else{
            setMessage('Something went wrong!')
            setData(null)
            setIsLoading(false)
        }
    };
   

    return (
        <>
        
        

        {message != "" &&
        <p>{message}</p>
        }
        {
            isLoading == false && post != null ?
            (
                <>
                <section>  
                    {data.areaname}


                </section>


                </>
            ):
            (
                <p>Loading</p>
            )
        }
        </>
    )


}

export default AreaPage;