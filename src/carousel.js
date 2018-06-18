import React, { Component } from "react";
import { toClass } from "recompose";
import enhance from "./_carousel.js";


class Carousel extends Component {
  render() {
    const { nextElement, prevElement, children } = this.props;
    return (
      <div>
        {nextElement ? React.cloneElement(nextElement, { onClick: this.props.onClickNext }) : null }
        {prevElement ? React.cloneElement(prevElement, { onClick: this.props.onClickPrev }) : null }
        {children}
      </div>
    );
  }
}

export default enhance(Carousel);
