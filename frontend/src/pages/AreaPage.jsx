import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAPI, endpoints, postAPI } from '../utilities/api';






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
        const response = await postAPI(`${endpoints.area}`,null,{uuid:dataID})
        console.log(response)
        if(response.status){
            setData(response.data.area)
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
            isLoading == false && data != null ?
            (
                <>
                <section>  
                    {/* {
                        data.media.length > 0 &&
                        <img style={{width:'100px'}} src={"https://media.openbeta.io/" + data.media[0]['mediaUrl']}/>
                    } */}
                    {data.areaName}
                    {data.density}
                    {data.isDestination}
                    {data.isBoulder}
                    {data.totalClimbs}
                    {/* <a href={"/area/"+data.parent.uuid}>Go to {data.parent.areaName}</a> */}

                    {/* <p>description - {data.content.description}</p> */}
    

                        {data.children &&
                            <>
                            <p>Areas</p>
                            <ul>
                            {data.children.map((area, index) => {
                                return (
                                  <li key={index}><a href={"/area/"+area.uuid}>{area.areaName}</a></li>
                                  );
                                })}
                            </ul>
                            </>
                        }
                           {data.climbs &&
                            <>
                            <p>Climbs</p>
                            <ul>
                            {data.climbs.map((climb, index) => {
                                return (
                                    <li key={index}><a href={"/route/"+climb.uuid}>{climb.name}</a></li>
                                );
                                })}
                            </ul>
                            </>
                        }
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