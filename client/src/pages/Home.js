import React from 'react'
import styled from 'styled-components'
import AdvertismentSlider from '../components/AdvertismentSlider'
import MainPageCategories from '../components/MainPageCategories.js'

const Container = styled.div`

`

const Home = () => {
  return (
    <Container>     
      <AdvertismentSlider />
      <MainPageCategories />
    </Container>
  )
}

export default Home