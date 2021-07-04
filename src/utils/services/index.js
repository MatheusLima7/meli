import axios from "axios";

import * as config from "../constants";

export const getProducts = (text) => {
    try {
        return axios.get(config.SEARCH + text);
    } catch (error) {
        //
    }
};

export const getProductById = (id) => {
    try {
        return axios.get(config.DETAIL + id);
    } catch (error) {
        //
    }
};
