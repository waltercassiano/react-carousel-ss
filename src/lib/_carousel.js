import React from "react";
import {
  compose,
  withHandlers,
  mapProps,
  withState,
  setDisplayName
} from "recompose";
import { get, size } from "lodash";

const styles = {
  rootStyle: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    height: "100px"
  },
  wrapperSlidesStyle: {
    position: "absolute",
    display: "flex",
    left: 0,
    top: 0,
    boxSizing: "border-box"
  },
  slidesStyle: {
    height: "100px",
    boxSizing: "border-box"
  },
  styleControlWrapper: {
    position: "absolute",
    zIndex: 100,
    top: "20px",
    width: "100%"
  }
};

const addClassToSlides = (e, numberItems, styles) => {
  const children = [];
  for (let el in e) {
    children.push(
      React.cloneElement(e[el], {
        className: "rcss-item-" + el,
        key: el,
        style: { width: 100 / numberItems + "vw", ...styles }
      })
    );
  }

  return children;
};

const calcWrapperSlidesWidth = props => {
  const s = {
    ...styles.wrapperSlidesStyle,
    ...get(props, "wrapperSlidesStyle", {}),
    width: props.numberSlide * (100 / props.showItemsNumber) + "vw"
  };
  return s;
};

const calcWrapperSlidesPosition = props => {
  console.log(props.activeSlide)
  const step = 100 / props.showItemsNumber;

  const wrapperSlidesStyle = {
    ...props.wrapperSlidesStyle,
    left: props.activeSlide === 0 ? 0 : step * props.activeSlide + "vw"
  };

  return wrapperSlidesStyle;
};

const _mapProps = mapProps(props => {
  return {
    prev: get(props, "prev", false),
    next: get(props, "next", false),
    showItemsNumber: get(props, "showItemsNumber", 1),
    wrapperSlidesStyle: {
      ...styles.wrapperSlidesStyle,
      ...get(props, "wrapperSlidesStyle", {})
    },
    rootStyle: { ...styles.rootStyle, ...get(props, "rootStyle", {}) },
    slidesStyle: { ...styles.slidesStyle, ...get(props, "slidesStyle", {}) },
    styleControlWrapper: {
      ...styles.styleControlWrapper,
      ...get(props, "styleControlWrapper", {})
    },
    children:
      get(props, "children", null) !== null
        ? addClassToSlides(
            get(props, "children"),
            get(props, "showItemsNumber", 1),
            { ...styles.slidesStyle, ...get(props, "slidesStyle", {}) }
          )
        : null,
    prevElement: props.prev
      ? React.cloneElement(get(props, "prevElement", <span>prev</span>), {
          className: "rcss-prev"
        })
      : null,
    nextElement: props.next
      ? React.cloneElement(get(props, "nextElement", <span>prev</span>), {
          className: "rcss-next"
        })
      : null
  };
});

export default compose(
  setDisplayName({
    displayName: "react-carousel-ss"
  }),

  _mapProps,

  withState("activeSlide", "onChangeSlide", 0),

  withState("numberSlide", "updateNumberSlide", props => {
    return size(get(props, "children", 0));
  }),

  withState("wrapperSlidesWidth", "updateWrapperWidth", props =>
    calcWrapperSlidesWidth(props)
  ),

  withState("slidePosition", "updateSlidePosition", props => {
    calcWrapperSlidesPosition(props);
  }),

  withHandlers({
    onClickPrev: props => () => {
      const { onChangeSlide, updateSlidePosition } = props;
      onChangeSlide(n => {
        const currentSlide = n > 0 ? n - 1 : n;
        return currentSlide;
      });
      updateSlidePosition(() => {
        return calcWrapperSlidesPosition(props);
      });
    },
    onClickNext: props => () => {
      const { onChangeSlide, numberSlide, updateSlidePosition } = props;
      onChangeSlide(n => {
        const currentSlide = n < numberSlide - 1 ? n + 1 : n;
        return currentSlide;
      });

      updateSlidePosition(() => {
        return calcWrapperSlidesPosition(props);
      });
    }
  })
);
