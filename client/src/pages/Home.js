import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import AvertismentSlider from '../components/AvertismentSlider'

const Container = styled.div`

`

const Home = () => {
  return (
    <Container>
      <Navbar />
      <AvertismentSlider />
    </Container>
  )
}

export default Home