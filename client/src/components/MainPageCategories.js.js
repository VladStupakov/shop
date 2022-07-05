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

const ItemContainer = styled.div`
  margin: 10px;
  height: 70vh;
  position: relative;
  width: 25vw;
  border: 1px solid black;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  object-fit: cover;
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

const Title = styled.h1`
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
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
                        <ItemContainer>

                            <Image src={process.env.REACT_APP_API_URL + category.img} />
                            <Info>
                                <Title>{category.name}</Title>
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