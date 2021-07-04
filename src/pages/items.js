import React, { Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import withReduxSaga from "..";
import { fetchProductsStart } from "../redux/products/actions";
import {
    selectIsProductsFetching,
    selectProductsItems,
} from "../redux/products/selectors";
import { SearchBar, Breadcrumb, Header } from "../components";
import useProduct from "../hooks/products/useProduct";
import utilString from "../utils/strings";

const ListProducts = React.lazy(() => import("../components/list-products"));

const ItemsPage = ({ products, isLoading, query }) => {
    const queryString = query.search;
    const { categories, items } = products;
    const { dataProduct } = useProduct({ data: items });

    const customTitle = queryString + "y " + categories.join(", ");
    const headerprops = {
        title: "Mercado Libre | Búsqueda de " + customTitle,
        description: "Aquí puedes encontrar " + customTitle,
        url: "http://localhost:3000/items?search=" + queryString,
    };

    const [mountedClient, setMountedClient] = useState(false);

    useEffect(() => {
        setMountedClient(true);
    }, []);

    return (
        <>
            <Header {...headerprops} />
            <SearchBar defaultText={queryString} />
            {!isLoading && <Breadcrumb categories={categories} />}
            {mountedClient && (
                <Suspense
                    fallback={<div className="center">Carregando...</div>}
                >
                    <ListProducts
                        items={dataProduct.slice(0, 4)}
                        isLoading={isLoading}
                    />
                </Suspense>
            )}
        </>
    );
};

ItemsPage.getInitialProps = async (props) => {
    const { store, isServer, query } = props.ctx;
    await store.dispatch(
        fetchProductsStart(utilString.nameNormalizer(query.search))
    );

    return { isServer, query };
};

const mapStateToProps = createStructuredSelector({
    products: selectProductsItems,
    isLoading: selectIsProductsFetching,
});

const mapDispatchToProps = (dispatch, payload) => {
    const payloadFormatted =
        utilString.nameNormalizer(payload?.query?.search) || "";
    return {
        fetchProductsStart: () => {
            return dispatch(fetchProductsStart(payloadFormatted));
        },
    };
};

export default withReduxSaga(
    connect(mapStateToProps, mapDispatchToProps)(ItemsPage)
);
