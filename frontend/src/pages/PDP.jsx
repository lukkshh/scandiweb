import React from "react";

import { gql } from "@apollo/client";

import parse from "html-react-parser";

import withGraphQl from "../utils/withGraphQL";
import withRouter from "../utils/withRouter";

import Header from "../components/Header";
import Gallery from "../components/Gallery/Gallery";
import addToCart from "../utils/addToCart";
import SizeOptions from "../components/ProductOptions/SizeOptions";
import ColorOptions from "../components/ProductOptions/ColorOptions";
import CapacityOptions from "../components/ProductOptions/CapacityOptions";

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
      currentImg: props.data.product.gallery[0],
      selectedSize: "",
      selectedColor: "",
      selectedCapacity: "",
    };
  }

  handleSizeChange = (value) => {
    this.setState({ selectedSize: value });
  };

  handleCapacityChange = (value) => {
    this.setState({ selectedCapacity: value });
  };

  handleColorChange = (value) => {
    this.setState({ selectedColor: value });
  };

  handleAddToCart = () => {
    const { data } = this.props;
    const { selectedSize, selectedColor, selectedCapacity } = this.state;

    const { attributes } = data.product;

    const hasSize = attributes.some((attr) => attr.id === "Size");
    const hasColor = attributes.some((attr) => attr.id === "Color");
    const hasCapacity = attributes.some((attr) => attr.id === "Capacity");

    const item = {
      id: this.props.params.id,
      img: data.product.gallery[0],
      name: data.product.name,
      quantity: 1,
      price: data.product.prices[0].amount,
      currencySymbol: data.product.prices[0].currency.symbol,
      ...(hasSize && { size: selectedSize }),
      ...(hasColor && { color: selectedColor }),
      ...(hasCapacity && { capacity: selectedCapacity }),
    };

    addToCart(item);
  };

  handleImgChange = (img) => {
    this.setState({ currentImg: img });
  };

  handlePrevImage = () => {
    const { data } = this.props;
    const { currentImg } = this.state;

    let imgCount = data.product.gallery.indexOf(currentImg);

    imgCount =
      (imgCount - 1 + data.product.gallery.length) %
      data.product.gallery.length;

    this.handleImgChange(data.product.gallery[imgCount]);
  };

  handleNextImage = () => {
    const { data } = this.props;
    const { currentImg } = this.state;

    let imgCount = data.product.gallery.indexOf(currentImg);

    imgCount = (imgCount + 1) % data.product.gallery.length;

    this.handleImgChange(data.product.gallery[imgCount]);
  };

  render() {
    const { data } = this.props;
    const { currentImg, selectedSize, selectedColor, selectedCapacity } =
      this.state;

    const hasSize = data.product.attributes.some((attr) => attr.id === "Size");
    const hasColor = data.product.attributes.some(
      (attr) => attr.id === "Color"
    );
    const hasCapacity = data.product.attributes.some(
      (attr) => attr.id === "Capacity"
    );

    return (
      <>
        <Header activeCategory={data.product.category} />
        <section className="flex m-[140px]">
          <Gallery
            data={data.product}
            currentImg={currentImg}
            handleImgChange={this.handleImgChange}
            handlePrevImage={this.handlePrevImage}
            handleNextImage={this.handleNextImage}
          ></Gallery>

          <div className="ml-[200px]">
            <p className="font-semibold text-3xl">{data.product.name}</p>

            <SizeOptions
              data={data.product}
              selectedSize={selectedSize}
              handleSizeChange={this.handleSizeChange}
            ></SizeOptions>

            <ColorOptions
              data={data.product}
              selectedColor={selectedColor}
              handleColorChange={this.handleColorChange}
            ></ColorOptions>

            <CapacityOptions
              data={data.product}
              selectedCapacity={this.state.selectedCapacity}
              handleCapacityChange={this.handleCapacityChange}
            ></CapacityOptions>

            <p className="uppercase mt-4 text-lg font-bold">Price:</p>
            <p className="uppercase mt-4 text-2xl font-bold">
              {data.product.prices[0].currency.symbol}
              {data.product.prices[0].amount}
            </p>

            <button
              data-testid="add-to-cart"
              disabled={
                !data.product.inStock ||
                (hasSize && !selectedSize) ||
                (hasColor && !selectedColor) ||
                (hasCapacity && !selectedCapacity)
              }
              onClick={this.handleAddToCart}
              className="bg-[#5ECE7B] font-semibold mt-6 disabled:bg-[#99dbab] w-[292px] h-[43px] text-white uppercase"
            >
              Add To Cart
            </button>

            <div
              className="pr-[150px] mt-6 max-w-[900px]"
              data-testid="product-description"
            >
              {parse(data.product.description || "")}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(withGraphQl(PDP, GET_PRODUCT));
