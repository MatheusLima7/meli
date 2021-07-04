// route /items?q=text
import { searchProducts } from "../../../server/domain-services/products";

export default (req, res) => {
    const {
        query: { q = "" },
    } = req;
    const text = q;

    searchProducts(text).then((response) => res.json(response));
};
