import Table from 'react-bootstrap/Table';
import { Row, Col, Button} from 'react-bootstrap';
import { api } from '../utilities';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";


function PyramidTable({userId,setPyramid}) {
  
  const [allPyramid, setAllPyramid] = useState([])

  const handleAPyramid =async(id)=>{
    try{
      const response = await api.get(`pyramid/${id}/`)
      if(response.status ===200){
        setPyramid(response.data.routes)
      }
    }catch(error){
      console.log("pyramid not found", error)
    }

  }

  const handleDeletePyramid = async(id)=>{
    try{
      const response = await api.delete(`pyramid/${id}/`)

      if(response.status ===204){
        console.log("deleted")
      }
    }catch(error){
      console.log("pyramid not found", error)
    }
  }

  useEffect(()=>{
    const getAllPyramid =async()=>{
      try{
        const response = await api.get(`/pyramid/user/${userId}/`)
        if (response.status === 200){
          setAllPyramid(response.data)
        }
      }catch(error){
        console.log("cant get all pyramid", error)
      }
    }
    getAllPyramid();
  },[allPyramid])

   // Reverse the allPyramid array to get the Most Recent
   const reversedPyramids = [...allPyramid].reverse();

   return (
     <>
       <Row className='justify-content-center mt-5'>
        <Col lg={8} >
         <Table striped bordered hover size="sm" className='text-center'>
           <thead>
             <tr>
               <th>Grade</th>
               <th>Location</th>
               <th>Date Created</th>
               <th></th>
             </tr>
           </thead>
           <tbody>
             {Array.isArray(reversedPyramids) && reversedPyramids.length > 0 ? (
               reversedPyramids.map((pyramid, idx) => (
                 <tr key={idx}>
                   <td>V{pyramid.goal_grade}</td>
                   <td onClick={()=>handleAPyramid(pyramid.id)}>
                    <Button variant="outline-info">{pyramid.id}</Button>
                    </td>
                   <td>{pyramid.date_generated}</td>
                   <td onClick={()=>handleDeletePyramid(pyramid.id)}>
                    <Button variant="transparent"> <RiDeleteBin6Line color='red'/> </Button>
                    </td>
                 </tr>
               ))
             ) : (
               <tr>
                 <td colSpan="3">No Saved Pyramid</td>
               </tr>
             )}
           </tbody>
         </Table>
        </Col>
       </Row>
     </>
   );
}

export default PyramidTable;