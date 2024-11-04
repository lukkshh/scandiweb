import Card from "../components/Card";
import React from "react";

import withGraphQl from "../utils/withGraphQL";

import { gql } from "@apollo/client";

import Header from "../components/Header";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      inStock
      gallery
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
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

class Home extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <>
        <Header activeCategory="all" />
        <section className="w-full">
          <div className="w-full h-40 flex items-center">
            <p className="text-[42px] ml-24 text-[#1D1F22]">ALL</p>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-3 gap-16">
              {data.products.map((product, index) => (
                <Card key={index} data={product} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withGraphQl(Home, GET_PRODUCTS);
