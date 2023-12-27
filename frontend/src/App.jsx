import { useState } from 'react'

import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom';
import Container from "react-bootstrap/Container";

function App() {


  return (
    <>
    <Header/>
    <Container>
      <Outlet/>
    </Container>
    </>
  );
}

export default App
