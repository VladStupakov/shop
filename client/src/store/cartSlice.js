import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    products: [],
    total: 0,
  },
  reducers: {
    setCart: (state, action) =>{
      state.id = action.payload._id
      state.products = action.payload.products
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
    },
    removeProduct: (state, action) =>{
        state.products = state.products.filter(product => product.id !== action.payload)
    }
  },
});

export const { addProduct, removeProduct,setCart } = cartSlice.actions
export default cartSlice.reducer