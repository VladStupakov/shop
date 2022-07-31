import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { getUserOrders } from '../../API/CartApi'


const OrdersList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const OrderContainer = styled.div`
    margin: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #fafafa;
    border-radius: 10px;
    padding: 10px;
    max-height: 250px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
`

const NoOrders = styled.div`
    font-size: 30px;
    font-weight: bold;
    justify-content: center;
    display: flex;
`

const OrderNumber = styled.div`
    font-size: 22px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    
`

const OrderProducts = styled.div`
    margin-top: 10px;
`

const ProductItem = styled.div`
    display: flex;
    font-size: 18px;
`

const ProductName = styled.div`
    display: flex;
    flex: 5;
`

const ProductQuantity = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`

const ProductPrice = styled.div`
    display: flex;
    flex: 2;
    justify-content: flex-end;
`

const OrderAddress = styled.div`
    margin-top: 10px;
    font-size: 18px;
`

const TotalPrice = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
`

const OrdersHistory = ({ userId }) => {

    const [orders, setOrders] = useState()

    useEffect(() => {
       
        getUserOrders(userId)
            .then(response => setOrders(response))
    }, [])

    return (
        <OrdersList>
            {
                orders.length > 0 ?
                    orders.map(order => {
                        return (
                            <OrderContainer key={order._id}>
                                <OrderNumber>Order № {order._id}</OrderNumber>
                                <OrderProducts>
                                    {order.products.map(product => {
                                        return (
                                            <ProductItem key={product.id}>
                                                <ProductName>{product.name}</ProductName>
                                                <ProductQuantity>{product.basketQuantity}</ProductQuantity>
                                                <ProductPrice>{product.price} UAH</ProductPrice>
                                            </ProductItem>
                                        )
                                    })}
                                </OrderProducts>   
                                <OrderAddress>Delivery address: {order.address}</OrderAddress>
                                <TotalPrice>Total price: {order.totalPrice}</TotalPrice>                          
                            </OrderContainer>
                        )
                    })
                    :
                    <NoOrders>No orders yet</NoOrders>
            }
        </OrdersList>
    )
}

export default OrdersHistory