import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: "https://dummyjson.com",
});


const getAllItems = () => {
    return api.get("/products")
}

const getSingleItem = (id: number | string) => {
    return api.get(`/products/${id}`)

}

const searchItem = (searchKeyword: string) => {
    const params = { q: searchKeyword };

    const config: AxiosRequestConfig = {
        params,
    };

    return api.get(`/products/search`, config)

}

export {
    getAllItems,
    getSingleItem,
    searchItem
}