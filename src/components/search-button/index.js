import React from "react";
import Image from "next/image";
import SearchIcon from "../../assets/ic_Search@2x.png";
import styles from "./styles.module.scss";

const SearchButton = ({ icon = SearchIcon, handleClick, alt = "Buscar" }) => {
    return (
        <button className={styles.searchButton} onClick={handleClick}>
            <Image width={20} height={20} src={icon} alt={alt} />
        </button>
    );
};

export default SearchButton;
