import React from 'react'
import styled from 'styled-components'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

const Container = styled.div`
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
cursor: pointer;
flex-direction: column;
&:hover ${IconContainer}{
    opacity: 1;
    
}
:hover{
    box-shadow: 0 0 5px 5px rgb(136, 136, 136);
  }
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
        transform: scale(1.1);
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

    return (
        <Container>
            <Image src={process.env.REACT_APP_API_URL + product.img} />
            <IconContainer>
                <Icon>
                    <FavoriteBorderIcon />
                </Icon>
                <Icon>
                    <AddShoppingCartIcon />
                </Icon>
            </IconContainer>
            <Info>
                <Price>{product.price} UAH</Price>
                <ProductName>{product.name}</ProductName>
            </Info>
        </Container>
    )
}

export default ProductItem