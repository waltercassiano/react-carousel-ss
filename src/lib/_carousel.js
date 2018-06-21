import React from "react";
import {
  compose,
  withHandlers,
  mapProps,
  withState,
  setDisplayName,
  lifecycle
} from "recompose";
import { get, size } from "lodash";

const styles = {
  rootStyle: {
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden"
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
    boxSizing: "border-box"
  },
  styleControlWrapper: {
    position: "absolute",
    zIndex: 100,
    top: "50%",
    width: "100%",
  }
};

const addClassToSlides = (e, numberItems, styles) => {
  const children = [];
  for (let el in e) {
    children.push(
      React.cloneElement(e[el], {
        className: "rcss-item-" + el,
        key: el,
        style: {
          width: 100 / numberItems + "%",
          ...styles,
          ...e[el].props.style
        }
      })
    );
  }

  return children;
};

const calcWrapperSlidesWidth = props => {
  const s = {
    ...styles.wrapperSlidesStyle,
    ...get(props, "wrapperSlidesStyle", {}),
    width: props.numberSlide * (100 / props.showItemsNumber) + "%"
  };
  return s;
};

const calcWrapperSlidesPosition = props => {
  const step = 100 / props.showItemsNumber;

  const wrapperSlidesStyle = {
    ...props.wrapperSlidesStyle,
    left: "-" + (props.activeSlide === 0 ? 0 : step * props.activeSlide + "%")
  };

  return wrapperSlidesStyle;
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
    updateWidth: props => () => {
      const { updateSlidePosition } = props;
      updateSlidePosition(() => {
        return calcWrapperSlidesPosition(props);
      });
    }
  }),
  withHandlers({
    onClickPrev: props => () => {
      const { onChangeSlide } = props;
      onChangeSlide(n => {
        const currentSlide = n > 0 ? --n : n;
        return currentSlide;
      });
    },
    onClickNext: props => () => {
      const { onChangeSlide, numberSlide } = props;
      onChangeSlide(n => {
        const currentSlide =
          n < numberSlide - 1 && props.showItemsNumber + n < numberSlide
            ? ++n
            : n;
        return currentSlide;
      });
    }
  }),
  lifecycle({
    componentWillReceiveProps(prevProps) {
      if (this.props.activeSlide !== prevProps.activeSlide) {
        this.props.updateWidth(prevProps);
      }
    }
  })
);
