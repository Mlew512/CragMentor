import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { postAPI, endpoints } from '../utilities/api';
import MapView from '../component/MapView';
import DisplayMessage from '../component/DisplayMessage';
import LoadingSpinner from '../component/LoadingSpinner';
import FavButton from '../component/FavButton';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './RoutePage.css'; 

function RoutePage() {
  const [dataID, setDataID] = useState(null);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    let id = null;
    if (params.id) id = params.id;
    if (dataID !== id) {
      setDataID(id);
    }
  }, [params]);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [dataID]);

  const temp = async () =>{

  }

  const getData = async () => {
    const response = await postAPI(endpoints.route, null, { uuid: dataID });
    console.log(response);
    if (response.status && response.data.climb_data.climb != null) {
      setData(response.data.climb_data.climb);
      setIsLoading(false);
      setMessage('');
    } else {
      setMessage('Something went wrong!');
      setData(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      <DisplayMessage message={message} />
      {isLoading === false && data != null ? (
        <>
          <div className="route-details-container">
            <div className="left-column">
              {data.media.length > 0 && (
                <img className="route-image" src={`https://media.openbeta.io/${data.media[0]['mediaUrl']}`} alt={data.name} />
              )}
              <h2>{data.name}</h2>
              <p><strong>Grade:</strong> {data.grades?.vscale}</p>
              <FavButton data={data} />
            </div>
            <div className="right-column">
              <p><strong>Description:</strong> {data.content.description}</p>
              <p><strong>Location:</strong> {data.content.location}</p>
              <Link to={`/area/${data.parent.uuid}`}>
                <button className="btn btn-primary">Go to {data.parent.area_name}</button>
              </Link>
            </div>
          </div>

          <MapView data={[data]} centerOnFirst={true} showSearch={false} boundsChangedCallback={temp} />
        </>
      ) : (
        <LoadingSpinner isLoading={isLoading} />
      )}
    </>
  );
}

export default RoutePage;
