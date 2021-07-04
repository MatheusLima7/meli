import { CURRENT_API_HOST } from "../constants/constants";

const fetch = require("node-fetch");

export const findProductByText = async (text) => {
    const qs = `sites/MLA/search?q=${text}`;
    const response = await request(qs);
    return response;
};

export const findProductById = async (id) => {
    const qs = `items/${id}`;
    const response = await request(qs);
    return response;
};

export const findProductByDescription = async (id) => {
    const qs = `items/${id}/description`;
    const response = await request(qs);
    return response;
};

export async function request(queryString) {
    return await fetch(CURRENT_API_HOST + queryString, {
        method: "get",
        headers: { "Content-Type": "application/json;" },
    }).then((res) => res.json());
}
