import {$authHost, $host} from "./index";

export const fetchCategories = async () => {
    const {data} = await $host.get('category')
    return data
}

export const fetchProducts = async () =>{
    const {data} = await $host.get('product')
    return data
}
