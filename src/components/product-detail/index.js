import React from "react";
import { useRouter } from "next/router";
import {
    Price,
    ProductName,
    ProductImage,
    ProductDescription,
    Button,
    Specification,
} from "../";
import styles from "./styles.module.scss";

const ProductDetail = ({
    id = "",
    title = "",
    price,
    picture = "",
    condition = "",
    free_shipping,
    sold_quantity = 0,
    description = "",
}) => {
    const router = useRouter();
    return (
        <div className={`${styles.productDetail}`}>
            <div className={styles.info}>
                <ProductImage source={picture} title={title} />
                <div className={styles.titleProduct}>
                    Descripción del producto
                </div>
                <ProductDescription>{description}</ProductDescription>
            </div>
            <div className={styles.purchase}>
                <Specification
                    condition={condition}
                    sold_quantity={sold_quantity}
                />
                <ProductName>{title}</ProductName>
                <Price
                    size={46}
                    amount={price.amount}
                    currency={price.currency}
                />
                <Button>comprar</Button>
            </div>
        </div>
    );
};

export default ProductDetail;
