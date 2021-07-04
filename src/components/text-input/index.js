import React from "react";
import styles from "./styles.module.scss";

const TextInput = ({ text, handleChange, handleKeyDown, placeholder }) => {
    return (
        <input
            className={styles.searchInput}
            type="text"
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export default TextInput;
