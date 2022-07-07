import React from 'react'
import { BrowserRouter  } from "react-router-dom";
import Navbar from './components/Navbar.js'
import AppRouter from './components/AppRouter';
import Footer from './components/Footer.js';

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