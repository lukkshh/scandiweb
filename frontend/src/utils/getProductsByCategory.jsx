import React from "react";
import { useQuery } from "@apollo/client";

function getProductsByCategory(Component, query, category) {
  return (props) => {
    const { loading, error, data } = useQuery(query, {
      variables: { category: category },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <Component {...props} data={data} loading={loading} error={error} />;
  };
}

export default getProductsByCategory;
