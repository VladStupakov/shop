import React from 'react'
import { BrowserRouter  } from "react-router-dom";
import Navbar from './components/Layout/Navbar'
import AppRouter from './components/AppRouter';
import Footer from './components/Layout/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>

  )
}

export default App