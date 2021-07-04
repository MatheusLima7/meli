import React from "react";
import { Product, Message } from "..";

const ListProducts = ({ items, isLoading }) => {
    if (!isLoading && !items?.length) {
        return (
            <div className="detail content">
                <Message>Ningún resultado encontrado</Message>
            </div>
        );
    }
    return (
        <div className="detail content">
            <ul>
                {isLoading && <Message>carregando...</Message>}
                {!isLoading &&
                    items.map((product, index) => {
                        return <Product {...product} key={index} />;
                    })}
            </ul>
        </div>
    );
};

export default ListProducts;
