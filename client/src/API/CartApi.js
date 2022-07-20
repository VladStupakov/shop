import { addProduct, changeProductQuantity, removeProduct, setCart } from "../store/cartSlice";
import { $authHost, $host } from "./index";

export const fetchCart = async (dispatch, id) => {
    try {
        const { data } = await $authHost.get('basket/' + id)
        dispatch(setCart(data))
    } catch (error) {

    }
}

export const addTocart = async (dispatch, id, product, quantity) => {
    try {
        const { data } = await $authHost.post('basket/' + id, {
            params: {
                productId: product._id, quantity
            }
        })
        dispatch(addProduct({
            basketQuantity: quantity,
            id: product._id,
            name: product.name,
            img: product.img,
            description: product.description,
            price: product.price
        }))
    } catch (error) {

    }
}

export const removeFromCart = async (dispatch, id, productId) => {
    try {
        const { data } = await $authHost.delete('basket/' + id, {
            params: {
                productId
            }
        })
        dispatch(removeProduct(productId))
    } catch (error) {

    }
}

export const changeQuantity = async (dispatch, id, productId, quantity) => {
    try {
        const { data } = await $authHost.patch('basket/' + id, {
            params: {
                productId, quantity
            }
        })
        dispatch(changeProductQuantity({ quantity, id: productId }))
    } catch (error) {

    }
}

export const createOrder = async (basket, tokenId, amount, address) => {
    const response = await $host.post("order", {
        basket,
        tokenId,
        amount,
        address
    }, {
        headers:{
            Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`
        }
    })
    return response
}


