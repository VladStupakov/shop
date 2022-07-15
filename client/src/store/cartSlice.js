import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
    },
    removeProduct: (state, action) =>{
        state.products = state.products.filter(product => product.id !== action.payload)
    }
  },
});

export const { addProduct, removeProduct } = cartSlice.actions
export default cartSlice.reducer