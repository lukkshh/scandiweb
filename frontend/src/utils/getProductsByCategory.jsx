import React from "react";
import { useQuery } from "@apollo/client";

function getProductsByCategory(Component, query, category) {
  return (props) => {
    const { loading, error, data } = useQuery(query, {
      variables: { category: category },
      fetchPolicy: "no-cache",
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data.productsByCategory[1].attributes);

    return <Component {...props} data={data} loading={loading} error={error} />;
  };
}

export default getProductsByCategory;
