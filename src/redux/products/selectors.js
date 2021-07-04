import { createSelector } from "reselect";

const selectProducts = (state) => {
    return state.products;
};

export const selectIsProductsFetching = createSelector(
    [selectProducts],
    (products) => {
        return products.isFetching;
    }
);

export const selectProductsItems = createSelector(
    [selectProducts],
    (products) => {
        return products;
    }
);
