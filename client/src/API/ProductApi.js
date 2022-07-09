import { $authHost, $host } from "./index";

export const fetchCategories = async () => {
    const { data } = await $host.get('category')
    return data
}

export const fetchProducts = async (brands, categoryId, page, limit) => {
    const { data } = await $host.get('product', {
        params: {
            brands, categoryId, page, limit
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
