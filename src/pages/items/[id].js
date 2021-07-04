import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import withReduxSaga from "../..";
import { fetchProductDetailStart } from "../../redux/products/actions";
import {
    selectIsProductsFetching,
    selectProductsItems,
} from "../../redux/products/selectors";
import { SearchBar, Breadcrumb, ProductDetail } from "../../components";
import Head from "next/head";

const DetailPage = ({ products, isLoading, query }) => {
    const {
        categories,
        productDetail: { item },
    } = products;

    console.log("item DetailPage", item);

    if (!item) {
        return <span className="messages">Ningún resultado encontrado</span>;
    }

    const title = "Mercado Libre | " + item.title;
    const description = item.description;
    const url = "http://localhost:3000/items/" + item.id;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={url} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
            </Head>
            <SearchBar />
            <Breadcrumb categories={categories} />
            <div className="detail content">
                {isLoading && <div className="center">carregando...</div>}
                {!isLoading && <ProductDetail {...item} />}
            </div>
        </>
    );
};

DetailPage.getInitialProps = async (props) => {
    const { store, isServer, query } = props.ctx;
    await store.dispatch(fetchProductDetailStart(query.id));

    return { isServer, query };
};

const mapStateToProps = createStructuredSelector({
    products: selectProductsItems,
    isLoading: selectIsProductsFetching,
});

const mapDispatchToProps = (dispatch, payload) => {
    const productId = payload?.query?.id || "";
    return {
        fetchProductDetailStart: () => {
            return dispatch(fetchProductDetailStart(productId));
        },
    };
};

export default withReduxSaga(
    connect(mapStateToProps, mapDispatchToProps)(DetailPage)
);
