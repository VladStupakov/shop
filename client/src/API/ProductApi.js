import { dataFetchFail, dataFetchStart, dataFetchSuccess } from "../store/filtersSlice";
import { $authHost, $host } from "./index";

export const fetchFilters = async (dispatch) => {
    dispatch(dataFetchStart())
    try {
        const  {data} = await $host.get('category') 
        const result = await $host.get('brand')
        const brands = result.data
        dispatch(dataFetchSuccess({ categories: data, brands })) 
    } catch (err) {
        dispatch(dataFetchFail(err.response.data.message))      
    }
}

export const fetchCategories = async () => {
    const { data } = await $host.get('category')
    return data
}

export const fetchProducts = async (brands, categoryId, page, limit, sorting) => {
    const { data } = await $host.get('product', {
        params: {
            brands, categoryId, page, limit, sorting
        }
    })
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('product/' + id)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('brand')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('brand', brand)
    return data
}

