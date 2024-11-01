import React from "react";
import withRouter from "../utils/withRouter";
import parse from "html-react-parser";

import { ApolloConsumer, gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
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
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  fetchProduct = (client) => {
    client
      .query({
        query: GET_PRODUCT,
        variables: { id: this.props.params.id },
      })
      .then((result) => {
        this.setState({ product: result.data.product });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          this.fetchProduct(client);
          return (
            <section
              className="flex m-[140px]
            "
            >
              <div className="flex space-x-12 ">
                <div className="space-y-8">
                  {this.state.product.gallery?.map((img, key) => (
                    <img
                      key={key}
                      className="object-contain w-20 h-20"
                      src={img}
                      alt=""
                    />
                  ))}
                </div>
                <div>
                  <img
                    className="w-[575px] h-[478px] object-contain"
                    src={this.state.product.gallery?.[0]}
                    alt=""
                  />
                </div>
              </div>
              <div className="ml-[200px]">
                <p className=" font-semibold text-3xl">
                  {this.state.product.name}
                </p>
                <p className="uppercase mt-4 text-lg font-bold ">Size:</p>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      className="appearance-none h-[45px] w-[63px] border-2 border-[#1D1F22] rounded-sm checked:bg-[#1D1F22] focus:outline-none"
                      type="radio"
                      name="size"
                      id="size1"
                    />
                    <label
                      className="font-roboto absolute left-5 top-3"
                      htmlFor="size1"
                    >
                      XS
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="appearance-none h-[45px] w-[63px] border-2 border-[#1D1F22] rounded-sm checked:bg-[#1D1F22] focus:outline-none"
                      type="radio"
                      name="size"
                      id="size1"
                    />
                    <label
                      className="font-roboto absolute left-5 top-3"
                      htmlFor="size1"
                    >
                      XS
                    </label>
                  </div>
                </div>
                <p className="uppercase mt-4 text-lg font-bold ">Color:</p>
                <div>
                  <input type="radio" name="color" id="" />
                  <input type="radio" name="color" id="" />
                  <input type="radio" name="color" id="" />
                </div>
                <p className="uppercase mt-4 text-lg font-bold ">Price:</p>
                <p className="uppercase mt-4 text-2xl font-bold ">
                  {this.state.product.prices?.[0].currency.symbol}
                  {this.state.product.prices?.[0].amount}
                </p>
                <button
                  disabled={!this.state.product.inStock}
                  onClick={() => {
                    console.log("added to cart");
                  }}
                  className="bg-[#5ECE7B] font-semibold mt-6 disabled:bg-[#99dbab] w-[292px] h-[43px] text-white uppercase"
                >
                  Add To Cart
                </button>
                <div className="pr-[150px] mt-6">
                  {parse(this.state.product.description || "")}
                </div>
              </div>
            </section>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default withRouter(PDP);
