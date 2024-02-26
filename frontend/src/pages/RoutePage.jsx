import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postAPI, endpoints } from '../utilities/api';
import MapView from '../component/MapView';
import DisplayMessage from '../component/DisplayMessage';
import LoadingSpinner from '../component/LoadingSpinner';
import FavButton from '../component/FavButton';
import {Row, Container,Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './RoutePage.css'; 
import { FaRegCheckCircle, FaRegEye } from 'react-icons/fa';
import TickButton from '../component/TickButton';

function RoutePage() {
  const navigate = useNavigate();
  const [dataID, setDataID] = useState(null);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [climbType, setClimbType]=useState([])

  useEffect(() => {
    let id = null;
    if (params.id) id = params.id;
    if (dataID !== id) {
      setDataID(id);
    }
  }, [params]);

  useEffect(() => {
    setIsLoading(true);
    if(dataID!=null){
      getData();
    }
  }, [dataID]);

  const temp = async () =>{

  }

  const getData = async () => {
    const response = await postAPI(endpoints.route, null, { uuid: dataID });
    // console.log(response);
    if (response.status && response.data.climb_data.climb != null) {
      setData(response.data.climb_data.climb);
      setClimbType(Object.keys(response.data.climb_data.climb.type).filter(key => response.data.climb_data.climb.type[key]));
      setIsLoading(false);
      setMessage('');
    } else {
      // setMessage('Something went wrong!');
      setData(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <DisplayMessage message={message} />
      {isLoading === false && data != null ? (
        <>
          <Container>
            <Row className='justify-content-center'>
              <div className="route-details-container">
                <h2 className='text mb-4'>{data.name} ({data['type']["bouldering"]?(data.grades.vscale): (data.grades.yds)})</h2>
                <div className='d-flex justify-content-between'>
                  <div>
                    <div className='mb-4'> 
                      

                    <div>
                      type: {climbType.join(", ")}
                    </div>
                    <div>
                      View Ticks
                      <TickButton data={data}/>
                      
                    </div>
                    <div>
                      {/* <Link to={`/area/${data.parent.uuid}`}>
                        <button className="btn btn-outline-success me-1">Go to {data.parent.area_name}</button>
                      </Link> */}
                      <Button className="me-1" variant="info" onClick={()=>navigate(`/area/${data.parent.uuid}`)}>Go to {data.parent.area_name} </Button>
                      <FavButton data={data} />
                    </div>
                    <p><strong>Description</strong></p>
                    <p>{data.content.description}</p>
                    <p><strong>Location:</strong> {data.content.location}</p>
                    </div>
                    
                  </div>
                  <div className="left-column p-4">
                    {data.media.length > 0 && (
                      <img className="route-image" src={`https://media.openbeta.io/${data.media[0]['mediaUrl']}`} alt={data.name} />
                    )}
                  </div>
                </div>
              </div>
              <hr/>
              <MapView data={[data]} centerOnFirst={true} showSearch={false} boundsChangedCallback={temp} />
            </Row>
          </Container>
        </>
      ) : (
        <LoadingSpinner isLoading={isLoading} />
      )}
    </>
  );
}

export default RoutePage;
