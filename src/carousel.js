import React, { Component } from "react";
import { withProps } from "recompose";
import enhance from "./_carousel.js";

class Carousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { nextElement, prevElement } = this.props;
    return (
      <div>
        {this.props.children}
        {nextElement}
        {prevElement}
      </div>
    );
  }
}

export default enhance(Carousel);
