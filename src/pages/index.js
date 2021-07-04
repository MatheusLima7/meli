import React, { Suspense, useEffect, useState } from "react";
import Head from "next/head";
const SearchBar = React.lazy(() => import("../components/search-bar"));

const HomePage = ({
  title = "Mercado Libre | siéntete libre de buscar lo que quieras ",
  description = "Encuentre lo que busca en Descuento. Todo lo que necesitas está en Mercado Livre.",
  url = "http://localhost:3000/",
}) => {
  const [mountedClient, setMountedClient] = useState(false);

  useEffect(() => {
    setMountedClient(true);
  }, []);

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
      {mountedClient && (
        <Suspense fallback={<div className="center">Carregando...</div>}>
          <SearchBar />
        </Suspense>
      )}
    </>
  );
};

export default HomePage;
