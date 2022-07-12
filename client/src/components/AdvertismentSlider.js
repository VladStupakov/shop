import React from 'react'
import styled from 'styled-components'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  position: relative;
  overflow: hidden;
`

const Arrow = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; 
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${props => props.position === 'left' && '10px'};
  right: ${props => props.position === 'right' && '10px'};
  opacity: 0.65;
  z-index: 2;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: rgb(205, 229, 253);
`;

const ImageContainer = styled.div`
  height: auto;
  flex: 1;
  margin-left: 50px;
  justify-content: center;
  display: flex;
`;

const Image = styled.img`
  display: flex;
`;

const Info = styled.div`
  flex: 2;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;


const AdvertismentSlider = () => {

  const [slideIndex, setSlideindex] = useState(0)

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setSlideindex(slideIndex > 0 ? slideIndex - 1 : slides.length - 1)
    }
    else {
      setSlideindex(slideIndex < slides.length - 1 ? slideIndex + 1 : 0)
    }
  }

  const slides = [
    {
      src: 'https://content.rozetka.com.ua/goods/images/big/263916044.jpg',
      description: {
        title: 'first long advertisment title to test styling',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis repudiandae nulla illum quibusdam officiis quo exercitationem officia incidunt commodi in facilis doloremque eaque magnam reprehenderit excepturi, at obcaecati quia qui!'
      }
    },
    {
      src: 'https://content1.rozetka.com.ua/goods/images/big/194516590.jpg',
      description: {
        title: 'second long advertisment title to test styling',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquid voluptates nam blanditiis accusamus sit nesciunt possimus labore laborum tempore!'
      }
    },
    {
      src: 'https://content2.rozetka.com.ua/goods/images/big/134657269.jpg',
      description: {
        title: 'third long advertisment title to test styling',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at fuga ut ab, sit, id et esse tenetur, quas cumque possimus deleniti porro facere? Fugiat reprehenderit vel voluptatibus mollitia? Doloremque?'
      }
    },
    {
      src: 'https://content1.rozetka.com.ua/goods/images/big/10602007.jpg',
      description: {
        title: 'fourth long advertisment title to test styling',
        info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid rem quo veniam cupiditate, accusamus incidunt adipisci, magnam deleniti perspiciatis dolorum. Facere dolor temporibus dolores est earum libero laboriosam placeat.'
      }
    }
  ]

  return (
    <Container>
      <Arrow position="left" onClick={() => handleArrowClick("left")}>
        <ArrowCircleLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {
          slides.map(slide => {
            return (
              <Slide key={slide.src}>
                <ImageContainer>
                  <Image src={slide.src} />
                </ImageContainer>
                <Info>
                  <Title>{slide.description.title}</Title>
                  <Description>{slide.description.info}</Description>
                </Info>
              </Slide>
            )
          })
        }
      </Wrapper>
      <Arrow position="right"  onClick={() => handleArrowClick("right")}>
        <ArrowCircleRightOutlinedIcon />
      </Arrow>
    </Container>
  )
}

export default AdvertismentSlider