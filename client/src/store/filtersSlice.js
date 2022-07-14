import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        isFetching: false,
        categories: null,
        brands: null,
        selectedCategory: 1,
        selectedBrands: [],
        selectedSort: 'new',
        pageNumber: 1,
        fetchLimit: 10,
        error: false
    },
    reducers: {
        dataFetchStart: (state) => {
            state.isFetching = true
        },
        dataFetchSuccess: (state, action) => {
            state.isFetching = false
            state.categories = action.payload.categories
            state.brands = action.payload.brands
        },
        dataFetchFail: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        setSelectedCategory: (state, action) =>{
            state.selectedCategory = action.payload
        },
        setSelectedBrands: (state, action) =>{
            state.selectedBrands = action.payload
        }
    },
});

export const { dataFetchFail, dataFetchStart, dataFetchSuccess, setSelectedCategory,setSelectedBrands } = filtersSlice.actions;
export default filtersSlice.reducer;