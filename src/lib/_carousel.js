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
  slidesStyle: {
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  styleControlWrapper: {
    position: "absolute",
    zIndex: 100,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "space-between",
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
          flexGrow: 1,
          ...styles,
          ...e[el].props.style
        }
      })
    );
  }

  return children;
};

const defaultSwipeableViewsProps = {
  slideStyle: { 
    ...styles.slidesStyle 
  },
  containerStyle: {
    height: "200px"
  },

  enableMouseEvents: true
}

const _mapProps = mapProps(props => {
  return {
    prev: get(props, "prev", false),
    next: get(props, "next", false),
    showItemsNumber: get(props, "showItemsNumber", 1),
    
    rootStyle: { ...styles.rootStyle, ...get(props, "rootStyle", {}) },
    slidesStyle: { ...styles.slidesStyle, ...get(props, "slidesStyle", {})},
    styleControlWrapper: { ...styles.styleControlWrapper, ...get(props, "styleControlWrapper", {})},
    children: get(props, "children", null)
        ? addClassToSlides(
            get(props, "children"),
            { ...styles.slidesStyle, ...get(props, "slidesStyle", {})}
          )
        : null,

    prevElement: props.prev ?  React.cloneElement(get(props, "prevElement", <button>prev</button>)) : null,
    nextElement: props.next ?  React.cloneElement(get(props, "nextElement", <button>next</button>)) : null,
    swipeableViewsProps: get(props, "swipeableViewsProps", defaultSwipeableViewsProps)
    
  }
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
    onClickPrev: ({onChangeSlide}) => () => onChangeSlide(n => n > 0 ? --n : n),
    onClickNext: ({ onChangeSlide, numberSlide }) => () => onChangeSlide(n => n < numberSlide - 1  ? ++n : n)
  })
);
