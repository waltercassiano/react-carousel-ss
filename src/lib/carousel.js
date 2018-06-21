import React, { Component } from "react";
import enhance from "./_carousel";
import ContainerDimensions from "react-container-dimensions";

class Carousel extends Component {
  render() {
    const {
      nextElement,
      prevElement,
      children,
      rootStyle,
      wrapperSlidesWidth,
      styleControlWrapper,
      slidePosition,
    } = this.props;
    return (
      <ContainerDimensions>
        {({ width }) => {
          return (
            <div style={{...rootStyle, width: width}}>
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
        }}
      </ContainerDimensions>
    );
  }
}

export default enhance(Carousel);
