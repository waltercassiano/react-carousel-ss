import React, { Component } from "react";
import enhance from "./_carousel";

class Carousel extends Component {
  render() {
    const {
      nextElement,
      prevElement,
      children,
      rootStyle,
      wrapperSlidesStyle,
      wrapperSlidesWidth,
      styleControlWrapper,
      slidePosition
    } = this.props;

    return (
      <div style={rootStyle}>
        <div style={styleControlWrapper}>
          {nextElement
            ? React.cloneElement(prevElement, {
                onClick: this.props.onClickPrev
              })
            : null}
          {prevElement
            ? React.cloneElement(nextElement, {
                onClick: this.props.onClickNext
              })
            : null}
        </div>
        <div style={{ ...wrapperSlidesWidth, ...slidePosition }}>
          {children}
        </div>
      </div>
    );
  }
}

export default enhance(Carousel);
