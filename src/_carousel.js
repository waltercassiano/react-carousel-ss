import React from "react";
import {
  compose,
  withProps,
  withHandlers,
  mapProps,
  withState,
  lifecycle,
  setDisplayName
} from "recompose";
import { get, size } from "lodash";

const addClassToSlides = e => {
  const children = [];
  for (let el in e) {
    children.push(
      React.cloneElement(e[el], { className: "rcss-item-" + el, key: el })
    );
  }
  return children;
};

const _mapProps = mapProps(props => {
  return {
    prev: get(props, "prev", false),
    next: get(props, "next", false),
    children:
      get(props, "children", null) !== null
        ? addClassToSlides(get(props, "children"))
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
  
  withHandlers({
  
    onClickPrev: ({ onChangeSlide }) => () => {
      
      onChangeSlide(n => n > 0 ? n - 1 : n);
    },
    onClickNext: ({ onChangeSlide, numberSlide }) => () => {
      
      onChangeSlide(n => n < numberSlide ?  n + 1 : n);
    }
  }),

);
