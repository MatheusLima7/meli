import { searchProductsById } from "../../../../server/domain-services/products";
// route /items/:id

export default (req, res) => {
  const {
    query: { id = "" },
  } = req;
  const productId = id;

  searchProductsById(productId).then((response) => res.json(response));
};
