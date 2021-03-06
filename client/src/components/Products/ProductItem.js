import React from 'react'
import styled from 'styled-components'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../store/cartSlice';
import { useEffect } from 'react';
import { addTocart, removeFromCart } from '../../API/CartApi';

const IconContainer = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: end;
`

const Container = styled(Link)`
margin: 5px;
min-width: 340px;
height: 350px;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
background-color: #f8f8f8;
position: relative;
border: 1px solid black;
transition: box-shadow .3s;
flex-direction: column;
&:hover ${IconContainer}{
    opacity: 1;
    
}
:hover{
    box-shadow: 0 0 5px 5px rgb(136, 136, 136);
  }
text-decoration: none;
&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
color: inherit;
`

const Image = styled.img`
    height: 75%;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid lightgray;
    background-color: white;   
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    &:hover{
        //background-color: rgb(25, 118, 210)
        scale: 1.2;
    }
`

const Info = styled.div`
    display: flex;
    margin-top:5px;
    flex-direction: column;
`

const Price = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-family: cursive;
`

const ProductName = styled.div`   
    display: flex;
    margin-top: 5px;
    max-width: 250px;
    font-weight: 100;
    font-size: 18px;
`



const ProductItem = ({ product }) => {

    const user = useSelector((state) => state.user.currentUser)
    const cartProducts = useSelector((state) => state.cart.products)
    const cartId = useSelector((state) => state.cart.id)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isInCart = cartProducts.findIndex(p => p.id === product._id)

    const handleRemoveFromCart = (event) => {
        event.preventDefault()
        user ?
            removeFromCart(dispatch, cartId, product._id)
            :
            navigate('/login')
    }

    const handleAddToCartClick = (event) => {
        event.preventDefault()
        user ?
            addTocart(dispatch, cartId, product, 1)
            :
            navigate('/login')
    }

    return (
        <Container to={`/product/${product._id}`}>
            <Image src={process.env.REACT_APP_API_URL + product.img} />
            <IconContainer>
                <Icon >
                    <FavoriteBorderIcon />
                </Icon>
                {
                    isInCart === -1 ?
                        <Icon onClick={handleAddToCartClick} >
                            <AddShoppingCartIcon color='success'/>
                        </Icon>
                        :
                        <Icon onClick={handleRemoveFromCart} >
                            <RemoveShoppingCartIcon color='error'/>
                        </Icon>
                }
            </IconContainer>
            <Info>
                <Price>{product.price} UAH</Price>
                <ProductName>{product.name}</ProductName>
            </Info>
        </Container>
    )
}

export default ProductItem