import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAPI, endpoints, postAPI } from '../utilities/api';
import MapView from '../component/MapView';
import DisplayMessage from '../component/DisplayMessage'
import LoadingSpinner from '../component/LoadingSpinner'


function RoutePage() {
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

      const temp = async () =>{

      }
    const getData = async () => {
        const response = await postAPI(endpoints.route,null,{uuid:dataID})
        console.log(response)
        if(response.status && response.data.climb_data.climb != null){
            setData(response.data.climb_data.climb)
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
        
        

        <DisplayMessage message={message} />
        {
            isLoading == false && data != null ?
            (
                <>
                <section>  
                    {
                        data.media.length > 0 &&
                        <img style={{width:'100px'}} src={"https://media.openbeta.io/" + data.media[0]['mediaUrl']}/>
                    }
                    {data.name}
                    {data.boltsCount != -1 && <p>boltsCount - {data.boltsCount}</p>}
                    {data.length != -1 && <p>length - {data.length}</p>}
                    {data.gradeContext != null && <p>gradeContext - {data.gradeContext}</p>}         
                    <p>description - {data.content.description}</p>
                    <p>location - {data.content.location}</p>
                    <p>protection - {data.content.protection}</p>
                    <p>safety - {data.safety}</p>
                    <a href={"/area/"+data.parent.uuid}>Go to {data.parent.area_name}</a>

                </section>

                <MapView data={[data]} centerOnFirst={true} showSearch={false} boundsChangedCallback={temp} />
                </>
            ):
            (<LoadingSpinner isLoading={isLoading} />)
        }
        </>
    )


}

export default RoutePage;