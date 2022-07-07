import React from 'react'
import styled from 'styled-components'
import AdvertismentSlider from '../components/AdvertismentSlider'
import HomePageCategories from '../components/HomePageCategories.js.js'

const Container = styled.div`

`

const Home = () => {
  return (
    <Container>     
      <AdvertismentSlider />
      <HomePageCategories />
    </Container>
  )
}

export default Home