import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material/'
import { useLocation } from "react-router-dom";
import { fetchOneProduct } from '../API/ProductApi';
import RatingForm from '../components/RatingForm';
import CommentSection from '../components/CommentSection';

const Container = styled.div`
    
`

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 2;
`;

const Image = styled.img`
  width: 90%;
  height: 90%;
`;

const InfoContainer = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgb(100, 149, 237);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0px 5px;
  &:focus{
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid rgb(100, 149, 237);
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    fetchOneProduct(id)
      .then(product => setProduct(product))
  }, [id])

  const handleQuantityChange = (operation) => {
    if (operation === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantitySet = (event) => {
    setQuantity(Number(event.target.value))
  }

  return (

    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={process.env.REACT_APP_API_URL + product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>{product.price} UAH</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantityChange("dec")} sx={{ cursor: 'pointer' }} />
              <Amount value={quantity} onChange={handleQuantitySet} />
              <Add onClick={() => handleQuantityChange("inc")} sx={{ cursor: 'pointer' }} />
            </AmountContainer>
            <Button >ADD TO CART</Button>
          </AddContainer>
          <RatingForm />
        </InfoContainer>
        <CommentSection comments={product.reviews} />
      </Wrapper>
    </Container>
  );
};

export default Product