import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    products: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.id = action.payload._id
      state.products = action.payload.products
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    changeProductQuantity: (state, action) => {
      const idx = state.products.findIndex(p => p.id === action.payload.id)
      state.products[idx].basketQuantity = action.payload.quantity
    }
  },
});

export const { addProduct, removeProduct, setCart, changeProductQuantity } = cartSlice.actions
export default cartSlice.reducer