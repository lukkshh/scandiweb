import Card from "../components/Card";
import React from "react";

import getProductsByCategory from "../utils/getProductsByCategory";

import { gql } from "@apollo/client";
import Header from "../components/Header";

const GET_PRODUCTS = gql`
  query getProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      id
      name
      inStock
      gallery
      category
      attributes {
        id
        items {
          displayValue
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
    }
  }
`;

class Category extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <Header activeCategory={data.productsByCategory[0].category} />
        <section className="w-full">
          <div className="w-full h-40 flex items-center">
            <p className="text-[42px] ml-24 text-[#1D1F22] uppercase">
              {data.productsByCategory[0].category}
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-3 gap-16">
              {data.productsByCategory.map((product, index) => (
                <Card key={index} data={product} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
}
const CategoryWithData = (props) => {
  const currentPath = window.location.pathname;
  const paths = [
    { path: "/clothes", label: "CLOTHES" },
    { path: "/tech", label: "TECH" },
  ];

  const category = paths.find((item) => item.path === currentPath)?.label;

  return getProductsByCategory(Category, GET_PRODUCTS, category)(props);
};

export default CategoryWithData;
