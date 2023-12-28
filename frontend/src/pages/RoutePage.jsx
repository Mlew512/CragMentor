import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAPI, endpoints } from '../utilities/api';


const route = {
        "name": "Super Mario",
        "boltsCount": -1,
        "gradeContext": null,
        "length": -1,
        "id": "89a929e2-d3d9-5219-baca-1f37855821b0",
        "metadata": {
          "lat": 35.24908,
          "lng": -85.21972,
          "climbId": "89a929e2-d3d9-5219-baca-1f37855821b0"
        },
        "safety": "UNSPECIFIED",
        "uuid": "89a929e2-d3d9-5219-baca-1f37855821b0",
        "ancestors": [
          "1db1e8ba-a40e-587c-88a4-64f5ea814b8e",
          "7aba5e4c-5306-56b7-b589-14753da2205b",
          "58994c28-e56a-5a34-a931-ba2324ea4a91",
          "450f4299-4bdf-561c-90c9-59652b7be93f"
        ],
        "fa": "unknown",
        "content": {
          "description": "\"Knee bar\"  Don't miss the knee bar on this problem or it just might become one or two grades harder.",
          "location": "Just before the Back 9. On the Super Mario boulder.",
          "protection": "Pad & spotter."
        },
        "grades": {
          "vscale": "V4",
          "yds": "V4",
          "uiaa": null,
          "french": null,
          "font": "6B",
          "ewbank": null,
          "brazilianCrux": null
        },
        "pathTokens": [
          "USA",
          "Tennessee",
          "Stone Fort (aka Little Rock City)",
          "Stone Fort Bouldering"
        ],
        "pitches": null,
        "type": {
          "aid": null,
          "alpine": null,
          "bouldering": true,
          "deepwatersolo": null,
          "ice": null,
          "mixed": null,
          "snow": null,
          "sport": null,
          "tr": null,
          "trad": null
        },
        "yds": "V4",
        "media": [
          {
            "mediaUrl": "/u/4d748baa-b0f9-4308-88a9-d574232654c8/CqKnCRhDQg.jpeg",
            "id": "645797db588e85d8f894b742"
          }
        ]
      }






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


    const getData = async () => {
        const response = await getAPI(`${endpoints.route}${dataID}`)
        console.log(response)
        if(response.status){
            setData(response.data.result)
            setIsLoading(false)
            setMessage('')
        }else{
            // setMessage('Something went wrong!')
            // setData(null)
            // setIsLoading(false)

            setData(route)//remove
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

export default RoutePage;