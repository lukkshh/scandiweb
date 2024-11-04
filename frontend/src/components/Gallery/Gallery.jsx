import React from "react";

import ImgCarousel from "./ImgCarousel";
import MainImage from "./MainImage";

class Gallery extends React.Component {
  render() {
    // console.log(this.props.data.gallery);

    return (
      <div className="flex space-x-12" data-testid="product-gallery">
        <ImgCarousel
          images={this.props.data.gallery}
          handleImgChange={this.props.handleImgChange}
        />
        <MainImage
          currentImg={this.props.currentImg}
          handlePrevImage={this.props.handlePrevImage}
          handleNextImage={this.props.handleNextImage}
        />
      </div>
    );
  }
}

export default Gallery;
