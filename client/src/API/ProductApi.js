import {$authHost, $host} from "./index";

export const fetchCategories = async () => {
    const {data} = await $host.get('category')
    return data
}
