import React, { useEffect } from 'react'
import { BrowserRouter  } from "react-router-dom";
import Navbar from './components/Layout/Navbar'
import AppRouter from './components/AppRouter';
import Footer from './components/Layout/Footer';
import { check } from './API/UserApi';
import { useDispatch } from 'react-redux';
import { fetchFilters } from './API/ProductApi';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() =>{
    check(dispatch)
  }, [])

  useEffect(() => {
    fetchFilters(dispatch)    
  }, [])
  

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>

  )
}

export default App