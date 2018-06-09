import React, { Component } from "react";
import { withProps } from "recompose";
import enhance from "./_carousel.js";

class Carousel extends Component {
  render() {
    return <div>{console.log(item)}</div>;
  }
}

export default enhance((({item}) => Carousel))
