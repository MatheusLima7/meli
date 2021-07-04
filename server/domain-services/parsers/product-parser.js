import UtilCategories from "./categories";

export function productParser(resources) {
  const categories = UtilCategories.getCategories(resources.filters);
  const items = resources.results.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: "$",
        amount: item.price,
        decimals: 0,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.city_name + " " + item.address.state_name,
    };
  });

  return {
    author: {
      name: "Matheus",
      lastname: "Lima",
    },
    categories,
    items,
  };
}

export function productDetailParser(resources, description) {
  const picture = resources.pictures[resources.pictures.length - 1]?.secure_url;
  return {
    author: {
      name: "Matheus",
      lastname: "Lima",
    },
    item: {
      id: resources.id,
      title: resources.title,
      price: {
        currency: "$",
        amount: resources.price,
        decimals: 2,
      },
      picture,
      condition: resources.condition,
      free_shipping: resources.shipping.free_shipping,
      sold_quantity: resources.sold_quantity,
      description,
    },
  };
}
