import { dataFetchFail, dataFetchStart, dataFetchSuccess } from "../store/filtersSlice";
import { $authHost, $host } from "./index";

export const fetchFilters = async (dispatch) => {
    dispatch(dataFetchStart())
    try {
        const { data } = await $host.get('category')
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
    const { data } = await $host.get('product/' + id)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('brand')
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('brand', brand)
    return data
}

export const updateBrand = async (id, brand) => {
    const { data } = await $authHost.put('brand/' + id, brand)
    return data
}

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete('brand/' + id)
    return data
}

export const getUserBrands = async (id) => {
    const { data } = await $authHost.get('brand/user/' + id)
    return data
}

export const createProduct = async (body) => {
    const { data } = await $authHost.post('product', body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

export const getUserProducts = async (id) => {
    const { data } = await $authHost.get('product/user/' + id)
    return data
}

export const updateProduct = async (id, body) => {
    const { data } = await $authHost.put('product/' + id, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete('product/' + id,)
    return data
}

export const updateCategory = async (id, category) => {
    const { data } = await $authHost.put('category/' + id, {name: category})
    return data
}

export const createCategory = async (category) => {
    const { data } = await $authHost.post('category', category, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

export const deleteCategory= async (id) => {
    const { data } = await $authHost.delete('category/' + id)
    return data
}