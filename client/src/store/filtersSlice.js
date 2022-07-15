import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isFetching: false,
        categories: null,
        brands: null,
        selectedCategory: 1,
        selectedBrands: [],
        selectedSort: 'New',
        pageNumber: 1,
        fetchLimit: 10,
        error: false
}

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        ...initState
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
        },
        setSelectedSort: (state, action) =>{
            state.selectedSort = action.payload
        },
        setFetchLimit: (state, action) =>{
            state.fetchLimit = action.payload
        },
        setPageNumber: (state, action) =>{
            state.pageNumber = action.payload
        },
        resetFilterValues: (state) =>{           
           
        }
    },
});

export const { dataFetchFail, dataFetchStart, dataFetchSuccess, setSelectedCategory,setSelectedBrands, setSelectedSort, setFetchLimit, setPageNumber, resetFilterValues } = filtersSlice.actions;
export default filtersSlice.reducer;