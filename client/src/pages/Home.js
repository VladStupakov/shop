import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import AdvertismentSlider from '../components/AdvertismentSlider'
import MainPageCategories from '../components/MainPageCategories.js'

const Container = styled.div`

`

const Home = () => {
  return (
    <Container>
      <Navbar />
      <AdvertismentSlider />
      <MainPageCategories />
    </Container>
  )
}

export default Home