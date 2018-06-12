import React from "react";
import { compose, withProps, withHandlers, mapProps } from "recompose";
import { get } from "lodash";

export default compose(
  withHandlers({
    onClickPrev: props => event => console.log("clicked prev"),
    onClickNext: props => event => console.log("clicked next")
  }),
  withProps(props => {
    return {
      item: get(props, "item", []),
      prev: get(props, "prev", false),
      next: get(props, "next", false),
      prevElement: get(props, "prevElement", <span>prev</span>),
      nextElement: get(props, "nextElement", <span>next</span>)
    };
  }),
  mapProps(props => {
    return {
      item: get(props, "item"),
      prev: get(props, "prev"),
      next: get(props, "next"),
      prevElement: props.prev
        ? React.cloneElement(get(props, "prevElement"), {
            onClick: props.onClickPrev,
            id: "rcss-prev"
          })
        : null,
      nextElement: props.next
        ? React.cloneElement(get(props, "nextElement"), {
            onClick: props.onClickNext,
            id: "rcss-next"
          })
        : null
    };
  })
);
