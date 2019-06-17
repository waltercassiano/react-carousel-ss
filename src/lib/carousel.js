import React, { Component } from "react";
import enhance from "./_carousel";
import ContainerDimensions from "react-container-dimensions";
import SwipeableViews from 'react-swipeable-views';

class Carousel extends Component {
  render() {
    const {
      nextElement,
      prevElement,
      rootStyle,
      styleControlWrapper,
      slidesStyle,
      activeSlide,
      slides
    } = this.props;
    return (
      <ContainerDimensions>
        {({ width }) => {
          return (
            <div style={{ ...rootStyle }}>
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
                <SwipeableViews
                  enableMouseEvents={true}
                  index={activeSlide}
                  interval={1000}
                  children={slides.map(slide => <>{slide}</>)}
                  slideStyle={ slidesStyle }
                />
            </div>
          );
        }}
      </ContainerDimensions>
    );
  }
}

export default enhance(Carousel);
