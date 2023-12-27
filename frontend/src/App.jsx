import { useState } from 'react'

import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom';
import Container from "react-bootstrap/Container";


function App() {
  const [user, setUser] = useState("")

  return (
    <>
    <Header user={user}/>
    <Container>
      <Outlet context={{ user, setUser }}/>
    </Container>
    </>
  );
}

export default App
