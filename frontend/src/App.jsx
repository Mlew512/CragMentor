import { useState } from 'react'
import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Footer from './component/Footer';

function App() {
  const [user, setUser] = useState("")
  const [myPyramid, setMyPyramid] = useState(null)
  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Outlet context={{ user, setUser, myPyramid, setMyPyramid }}/>
      <Footer/>
    </>
  );
}

export default App;
