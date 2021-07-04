import {
    findProductByText,
    findProductById,
    findProductByDescription,
} from "../repositories/products";
import { productParser, productDetailParser } from "./parsers/product-parser";

export const searchProducts = async (text) => {
    const response = await findProductByText(text);
    return productParser(response);
};

export const searchProductsById = async (id) => {
    const response = await findProductById(id);
    const responseDescription = await findProductByDescription(id);
    const { plain_text: description } = responseDescription;
    return productDetailParser(response, description);
};
