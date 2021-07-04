import React, { useEffect, useCallback, useState } from "react";

let euroEU = Intl.NumberFormat("es-AR");

const useProduct = ({ data = [] }) => {
  const formatData = useCallback((data) => {
    let response = [];
    for (let item of data) {
      response.push({
        ...item,
        priceFormatted: String(
          item.price.currency + " " + euroEU.format(item.price.amount)
        ),
      });
    }
    return response;
  }, []);

  const [dataProduct, setDataProduct] = useState(formatData(data));

  useEffect(() => {
    setDataProduct(formatData(data));
  }, [formatData, data]);

  return { dataProduct };
};

export default useProduct;
