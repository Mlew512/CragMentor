import Table from 'react-bootstrap/Table';
import { Row } from 'react-bootstrap';
import { api } from '../utilities';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PyramidTable({userId}) {
  
  const [allPyramid, setAllPyramid] = useState([])
  useEffect(()=>{

    const getAllPyramid =async()=>{
      try{
        const response = await api.get(`/pyramid/user/${userId}/`)
        if (response.status === 200){
          console.log(response.data)
          setAllPyramid(response.data)
        }
      }catch(error){
        console.log("cant get all pyramid", error)
      }
    }
    getAllPyramid();
  },[])

  return (
    <>
    <Row className='mt-5'>
    <Table striped bordered hover size="sm"  className='text-center'>
      <thead>
        <tr>
          <th>Grade</th>
          <th>Location</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(allPyramid) && allPyramid.length >0 ? (
          allPyramid.map((pyramid, idx)=>(
            <tr key={idx}>
              <td>V5</td>
              <td><Link>Super Mario</Link></td>
              <td>12/24/25 Ex</td>
            </tr>
            ))
        ):(
          <td>No Saved Pyramid</td>
        )}
        
      </tbody>
    </Table>
    </Row>
    </>
  );
}

export default PyramidTable;