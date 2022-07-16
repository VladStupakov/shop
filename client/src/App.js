import React, { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Layout/Navbar'
import AppRouter from './components/AppRouter';
import Footer from './components/Layout/Footer';
import { check } from './API/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from './API/ProductApi';
import { resetFilterValues } from './store/filtersSlice';
import { fetchCart } from './API/CartApi';

const App = () => {


  const user = useSelector((state) => state.user.currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    check(dispatch)
  }, [])

  useEffect(() => {
    dispatch(resetFilterValues())
    fetchFilters(dispatch)
  }, [])

  useEffect(() => {
    if(user)
      fetchCart(dispatch, user.id)
  }, [user])

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>

  )
}

export default App