import Card from "../components/Card";

import React from "react";

import { ApolloConsumer } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      inStock
      gallery
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  fetchProducts = (client) => {
    client
      .query({
        query: GET_PRODUCTS,
      })
      .then((result) => {
        this.setState({ products: result.data.products });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const currentPath = window.location.pathname;

    const paths = [
      { path: "/", label: "WOMEN" },
      { path: "/men", label: "MEN" },
      { path: "/kids", label: "KIDS" },
    ];

    const currentLabel =
      paths.find((item) => item.path === currentPath)?.label || "/";

    return (
      <ApolloConsumer>
        {(client) => {
          this.fetchProducts(client);

          return (
            <section className="w-full">
              <div className="w-full h-40 flex items-center">
                <p className="text-[42px] ml-24 text-[#1D1F22]">
                  {currentLabel}
                </p>
              </div>

              <div className="w-full flex justify-center items-center">
                <div className="grid grid-cols-3 gap-16">
                  {this.state.products.map((product, index) => (
                    <Card key={index} data={product} />
                  ))}
                </div>
              </div>
            </section>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Home;
