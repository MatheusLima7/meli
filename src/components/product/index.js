import React from "react";
import { useRouter } from "next/router";
import { Price, ProductName, Address, ProductImage } from "../";
import styles from "./styles.module.scss";

const Product = ({
    id = "",
    price = "",
    title = "",
    address = "",
    picture = "",
}) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/items/${id}`);
    };

    return (
        <li className={styles.product} onClick={handleClick}>
            <div className={styles.contentProduct}>
                <ProductImage source={picture} title={title} />
                <div className={styles.description}>
                    <div className={styles.detail}>
                        <Price
                            amount={price.amount}
                            currency={price.currency}
                            size={24}
                        />
                        <ProductName className={styles.info}>
                            {title}
                        </ProductName>
                    </div>
                    <Address>{address}</Address>
                </div>
            </div>
        </li>
    );
};

export default Product;
