import React from "react";
import Link from "next/link";
import Image from "next/image";
import MercadoLivre from "../../assets/Logo_ML.png";
import styles from "./styles.module.scss";

const Logo = ({}) => {
  return (
    <Link href="/">
      <h1 className={styles.image}>
        <Image src={MercadoLivre} alt="Mercado Livre" />
      </h1>
    </Link>
  );
};

export default Logo;
