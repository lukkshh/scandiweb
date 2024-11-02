import React from "react";
import withRouter from "../utils/withRouter";
import parse from "html-react-parser";
import addToCart from "../utils/addToCart";
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
    this.item = {
      id: this.props.params.id,
      img: "",
      name: "",
      quantity: 1,
      size: "",
      color: "",
      price: "",
      currencySymbol: "",
    };
  }

  handleSizeChange = (value) => {
    this.item.size = value;
  };

  handleColorChange = (value) => {
    this.item.color = value;
  };

  fetchProduct = (client) => {
    client
      .query({
        query: GET_PRODUCT,
        variables: { id: this.props.params.id },
      })
      .then((result) => {
        this.setState({ product: result.data.product });
      })
      .catch((error) => console.error(error));
  };

  handleAddToCart = () => {
    this.item.price = this.state.product.prices[0].amount;
    this.item.img = this.state.product.gallery[0];
    this.item.name = this.state.product.name;
    this.item.currencySymbol = this.state.product.prices[0].currency.symbol;
    addToCart(this.item);
  };

  renderSizeOptions() {
    const sizes = ["XS", "S", "M", "L"];
    return sizes.map((size) => (
      <div className="relative" key={size}>
        <input
          className="cursor-pointer appearance-none h-[45px] w-[63px] border-2 border-[#1D1F22] rounded-sm checked:bg-[#1D1F22] focus:outline-none"
          type="radio"
          name="size"
          value={size}
          id={`size${size}`}
          onChange={() => this.handleSizeChange(size)}
        />
        <label
          className={`${
            this.item.size === size ? "text-white" : "text-black"
          } cursor-pointer font-roboto absolute left-1/2 translate-x-[-50%] top-3`}
          htmlFor={`size${size}`}
        >
          {size}
        </label>
      </div>
    ));
  }

  renderColorOptions() {
    const colors = ["#D3D2D5", "#2B2B2B", "#0F6450"];
    return colors.map((color) => (
      <input
        key={color}
        className="cursor-pointer appearance-none h-9 w-9 border-2 checked:border-[#5ECE7B] rounded-sm focus:outline-none"
        type="radio"
        name="color"
        value={color}
        style={{ backgroundColor: color }}
        onChange={() => this.handleColorChange(color)}
      />
    ));
  }

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          this.fetchProduct(client);
          const { product } = this.state;
          return (
            <section className="flex m-[140px]">
              <div className="flex space-x-12" data-testid="product-gallery">
                <div className="space-y-8 max-h-[478px] overflow-y-auto no-scrollbar ">
                  {product.gallery?.map((img, key) => (
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
                    src={product.gallery?.[0]}
                    alt=""
                  />
                </div>
              </div>
              <div className="ml-[200px]">
                <p className="font-semibold text-3xl">{product.name}</p>
                <p className="uppercase mt-4 text-lg font-bold">Size:</p>
                <div className="flex space-x-2">{this.renderSizeOptions()}</div>
                <p className="uppercase mt-4 text-lg font-bold">Color:</p>
                <div className="space-x-2">{this.renderColorOptions()}</div>
                <p className="uppercase mt-4 text-lg font-bold">Price:</p>
                <p className="uppercase mt-4 text-2xl font-bold ">
                  {product.prices?.[0].currency.symbol}
                  {product.prices?.[0].amount}
                </p>
                <button
                  data-testid="add-to-cart"
                  disabled={
                    !product.inStock || !this.item.size || !this.item.color
                  }
                  onClick={this.handleAddToCart}
                  className="bg-[#5ECE7B] font-semibold mt-6 disabled:bg-[#99dbab] w-[292px] h-[43px] text-white uppercase"
                >
                  Add To Cart
                </button>
                <div
                  className="pr-[150px] mt-6  max-w-[900px]"
                  data-testid="product-description"
                >
                  {parse(product.description || "")}
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
