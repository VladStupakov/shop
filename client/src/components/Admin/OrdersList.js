import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getOrders } from '../../API/CartApi'
import { useObserver } from '../../hooks/UseObserver'

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;  
`

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #fafafa;
    border-radius: 10px;
    padding: 10px;
    max-height: 250px;
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

const OrdersList = () => {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const lastElement = useRef()
    
    useObserver(page < totalPages, lastElement, orders.length === 0, () =>{
        setPage(page +1)
    })

    

    useEffect(() => {      
        getOrders(page)
            .then(response => {
                setOrders([...orders, ...response.orders])
                setTotalPages(response.totalPages)
            })
    }, [page])



    return (
        <ListContainer>
            {
                orders?.length > 0 ?
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
            {orders.length === 0 ? null : <div ref={lastElement} style={{ height: '10px', backgroundColor: 'red' }}></div>}
        </ListContainer>
    )
}

export default OrdersList