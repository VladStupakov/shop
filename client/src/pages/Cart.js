import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartProduct from '../components/Products/CartProduct';
import StripeCheckout from 'react-stripe-checkout'
import { createOrder } from '../API/CartApi';

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Cart = () => {

  const cart = useSelector((state) => state.cart)
  const [total, setTotal] = useState()
  const [token, setToken] = useState()


  useEffect(() => {
    const sum = cart?.products?.reduce((total, p) => {
      return total + p.basketQuantity * p.price
    }, 0)
    setTotal(sum)
  }, [cart.products])

  const onToken = (token) => {
    setToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
          const response = createOrder(cart.products, token.id, 500)
          console.log(response)
      } catch{

      }
    };
    token && makeRequest();
  }, [token]);

  return (
    <Container>
      <Title>YOUR CART</Title>
      <Top>
        <Link to='/products'>
          <TopButton to='/products'>CONTINUE SHOPPING</TopButton>
        </Link>
        <TopTexts>
          <TopText>Products({cart.products.length})</TopText>
          <TopText>Your Wishlist (0)</TopText>
        </TopTexts>
      </Top>
      <Bottom>
        <Info>
          {
            cart.products?.map(product => {
              return <CartProduct key={product.id} product={product}></CartProduct>
            })
          }
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>{total} UAH</SummaryItemPrice>
          </SummaryItem>
          <StripeCheckout
            name="MY SHOP"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={`Your total is $${total}`}
            amount={total * 100}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
          >
            <Button>CHECKOUT NOW</Button>
          </StripeCheckout>
        </Summary>
      </Bottom>
    </Container>
  )
}

export default Cart