import React from "react";
import {
  compose,
  withHandlers,
  mapProps,
  withState,
  setDisplayName
} from "recompose";
import { get, size, chunk } from "lodash";

const styles = {
  rootStyle: {
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
    width: "100%"
  },
  wrapperSlidesStyle: {
    position: "absolute",
    display: "flex",
    left: 0,
    top: 0,
    boxSizing: "border-box",
    height: "100%"
  },
  slidesStyle: {
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
  },
  styleControlWrapper: {
    position: "absolute",
    zIndex: 100,
    top: "50%",
    width: "100%",
  }
};

const addClassToSlides = (e, styles) => {
  const children = [];
  for (let el in e) {
    children.push(
      React.cloneElement(e[el], {
        className: "rcss-item-" + el,
        key: el,
        style: {
          width: "100%",
          ...styles,
          ...e[el].props.style
        }
      })
    );
  }

  return children;
};

const _mapProps = mapProps(props => {
  return {
    prev: get(props, "prev", false),
    next: get(props, "next", false),
    showItemsNumber: get(props, "showItemsNumber", 1),
    transition: get(props, "transition", "all 0.5s ease"),
    wrapperHeight: get(props, "wrapperHeight", "200px"),
    wrapperSlidesStyle: {
      ...styles.wrapperSlidesStyle,
      transition: get(props, "transition", "all 0.5s ease"),
      ...get(props, "wrapperSlidesStyle", {})
    },
    rootStyle: {
      ...styles.rootStyle,
      ...get(props, "rootStyle", {}),
      height: get(props, "wrapperHeight", "500px"),
    },
    slidesStyle: { ...styles.slidesStyle, ...get(props, "slidesStyle", {}), width: "100%" },
    styleControlWrapper: {
      ...styles.styleControlWrapper,
      ...get(props, "styleControlWrapper", {})
    },
    children:
      get(props, "children", null) !== null
        ? addClassToSlides(
            get(props, "children"),
            { ...styles.slidesStyle, ...get(props, "slidesStyle", {})}
          )
        : null,
    prevElement: props.prev
      ? React.cloneElement(get(props, "prevElement", <span>prev</span>), {
          className: "rcss-prev",
          style: {...props.prevElement.props.style, position: "absolute", left: 0}
        })
      : null,
    nextElement: props.next
      ? React.cloneElement(get(props, "nextElement", <span>prev</span>), {
          className: "rcss-next",
          style: {...props.prevElement.props.style, position: "absolute", right: 0}
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
  withState("numberSlide", "updateNumberSlide", props => size(chunk(get(props, "children", 0), get(props, "showItemsNumber")))),
  withState("slides", "slidesAll", props => chunk(get(props, "children", 0), get(props, "showItemsNumber"))),
  withHandlers({
    onClickPrev: props => () => {
      const { onChangeSlide } = props;
      onChangeSlide(n => n > 0 ? --n : n)
    },
    onClickNext: props => () => {
      const { onChangeSlide, numberSlide } = props;
      onChangeSlide(n => n < numberSlide - 1  ? ++n : n);
    }
  })
);
