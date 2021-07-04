import React, { useState } from "react";
import { useRouter } from "next/router";
import { Logo, TextInput, SearchButton } from "../";
import styles from "./styles.module.scss";

const SearchBar = ({ defaultText = "" }) => {
  const router = useRouter();
  const [text, setText] = useState(defaultText);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    router.push("/items?search=" + text);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChange(event);
      handleClick();
    }
  };

  return (
    <header className={`${styles.headerContent} container`}>
      <div className={`${styles.searchBar} content`}>
        <Logo />
        <TextInput
          text={text}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          placeholder={"Nunca dejes de buscar"}
        />
        <SearchButton handleClick={handleClick} />
      </div>
    </header>
  );
};

export default SearchBar;
