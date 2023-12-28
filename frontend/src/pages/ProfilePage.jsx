import SearchBox from '../component/SearchBox'
import React, { useEffect, useRef, useState } from 'react';

const ProfilePage = () => {
  const [place, setPlace] = useState(null)
  useEffect(()=>{
    console.log(place)
  },[place])
  return (
      <>
          <h1>Profile Page</h1>
          <SearchBox address={"New York"} setPlace={setPlace} />

      </>
  );
}

export default ProfilePage;

// {
//   "email": "example@ex.com",
//   "current_level": null,
//   "goal": null,
//   "location": null,
//   "distance_willing_to_travel": null
// }