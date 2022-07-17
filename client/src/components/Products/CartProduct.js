import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeQuantity, removeFromCart } from '../../API/CartApi';
import DeleteIcon from '@mui/icons-material/Delete';

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const CartProduct = ({ product }) => {

    const cart = useSelector((state) => state.cart)
    const [quantity, setQuantity] = useState(product.basketQuantity)
    const dispatch = useDispatch()


    const handleQuantitySet = (event) => {
        setQuantity(Number(event.target.value))       
    }

    useEffect(()=>{
        console.log(quantity)
        setTimeout(() => {
            changeQuantity(dispatch, cart.id, product.id, quantity)
        }, 3000);
    }, [quantity])

    const handleRemoveFromCart = () => {
        removeFromCart(dispatch, cart.id, product.id)
    }

    return (
        <Product>
            <ProductDetail>
                <Image src={process.env.REACT_APP_API_URL + product.img} />
                <Details>
                    <ProductName>
                        {product.name}
                    </ProductName>
                </Details>
            </ProductDetail>
            <PriceDetail>
                <ProductAmountContainer>
                    <Amount value={quantity} onChange={handleQuantitySet} />
                    <IconButton onClick={handleRemoveFromCart}>
                      <DeleteIcon/>
                    </IconButton>
                </ProductAmountContainer>
                <ProductPrice>
                    $ {product.price * quantity}
                </ProductPrice>
            </PriceDetail>
        </Product>
    )
}

export default CartProduct