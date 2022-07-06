import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchCategories } from "../API/ProductApi";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ItemContainer = styled(Link)`
  margin: 10px;
  text-decoration: none;
  height: 70vh;
  position: relative;
  width: 25vw;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow .3s;
  :hover{
    box-shadow: 0 0 10px 11px rgb(205, 229, 253);
  }
  :focus, :hover, :visited, :link, :active {
        text-decoration: none;
    }
    color: black;
`;

const ImageContainer = styled.div`
  justify-content: center;
  display: flex;
  max-height: 80%;
  max-width: 90%;
  width: 90vw;
  height: 90vh;
`;

const Image = styled.img`
    max-width:100%;
    max-height:100%;
    margin: auto;
`;

const Title = styled.h1`
    
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    font-weight: 600;
    display: flex; 
`;

const MainPageCategories = () => {

    const [categories, setCategories] = useState()

    useEffect(() => {
        fetchCategories()
            .then(data => setCategories(data))
    }, [])

    return (
        <Container>
            {categories ?
                categories.map(category => {
                    return (
                        <ItemContainer to="/products">
                            <Title>{category.name}</Title>
                            <ImageContainer>
                                <Image src={process.env.REACT_APP_API_URL + category.img} ></Image>
                            </ImageContainer>
                            <Info>
                                <Button>Get now</Button>
                            </Info>
                        </ItemContainer>
                    )
                })
                : 'loading..'
            }
        </Container>
    );
};

export default MainPageCategories;