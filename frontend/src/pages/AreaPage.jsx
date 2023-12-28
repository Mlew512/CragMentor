import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAPI, endpoints } from '../utilities/api';


const area ={
    
        "areaName": "Eastern Nevada",
        "area_name": "Eastern Nevada",
        "climbs": [],
        "density": 0.0015347552529185239,
        "content": {
          "description": ""
        },
        "gradeContext": "US",
        "id": "6368a185e80bff5a9954f277",
        "media": [],
        "metadata": {
          "areaId": "67440312-e5d3-5495-a5b9-062f45ef13d3",
          "bbox": [
            -116.03517959588068,
            38.985330339818134,
            -114.15366853896417,
            41.028539660181856
          ],
          "isDestination": false,
          "isBoulder": false,
          "lat": 40.13404568181818,
          "leaf": false,
          "lng": -115.05540809090908
        },
        "pathTokens": [
          "USA",
          "Nevada",
          "Eastern Nevada"
        ],
        "shortCode": "",
        "totalClimbs": 56,
        "uuid": "67440312-e5d3-5495-a5b9-062f45ef13d3",
        "children": [
            {
              "areaName": "Wheeler Peak",
              "id": "6368a185e80bff5a9954f278"
            },
            {
              "areaName": "Hercules Gap",
              "id": "6368a185e80bff5a9954f279"
            },
            {
              "areaName": "Crooked Finger Tower",
              "id": "6368a185e80bff5a9954f27a"
            },
            {
              "areaName": "Cowboy",
              "id": "6368a185e80bff5a9954f27b"
            },
            {
              "areaName": "Angel Lake",
              "id": "6368a185e80bff5a9954f27c"
            },
            {
              "areaName": "Wendover Boulders",
              "id": "6368a185e80bff5a9954f27e"
            },
            {
              "areaName": "Thousand Islands",
              "id": "6368a185e80bff5a9954f280"
            },
            {
              "areaName": "Lamoille Canyon",
              "id": "6368a185e80bff5a9954f283"
            },
            {
              "areaName": "Harrison Pass",
              "id": "6368a185e80bff5a9954f285"
            },
            {
              "areaName": "Cleve Creek Crag",
              "id": "6368a185e80bff5a9954f289"
            },
            {
              "areaName": "Cave Lake State Park",
              "id": "6368a185e80bff5a9954f28b"
            }
          ]
      }
 






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
            // setMessage('Something went wrong!')
            // setData(null)
            // setIsLoading(false)

            setData(area)//remove
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
                    {data.areaName}
                    {data.density}
                    {data.isDestination}
                    {data.isBoulder}
                    {data.totalClimbs}
                    <p>description - {data.content.description}</p>
    

                        {data.children.length > 0 &&
                            <>
                            <p>Areas</p>
                            <ul>
                            {data.children.map((area, index) => {
                                return (
                                    <li key={index}>{area.areaName}</li>
                                );
                                })}
                            </ul>
                            </>
                        }
                           {data.climbs.length > 0 &&
                            <>
                            <p>Climbs</p>
                            <ul>
                            {data.climbs.map((climb, index) => {
                                return (
                                    <li key={index}>{area.name}</li>
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