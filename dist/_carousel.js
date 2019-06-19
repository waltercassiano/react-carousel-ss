"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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
    width: "100%"
  }
};

var addClassToSlides = function addClassToSlides(e, styles) {
  var children = [];
  for (var el in e) {
    children.push(_react2.default.cloneElement(e[el], {
      className: "rcss-item-" + el,
      key: el,
      style: _extends({
        flexGrow: 1
      }, styles, e[el].props.style)
    }));
  }

  return children;
};

var defaultSwipeableViewsProps = {
  slideStyle: _extends({}, styles.slidesStyle),
  containerStyle: {
    height: "200px"
  },

  enableMouseEvents: true
};

var _mapProps = (0, _recompose.mapProps)(function (props) {
  return {
    prev: (0, _lodash.get)(props, "prev", false),
    next: (0, _lodash.get)(props, "next", false),
    showItemsNumber: (0, _lodash.get)(props, "showItemsNumber", 1),

    rootStyle: _extends({}, styles.rootStyle, (0, _lodash.get)(props, "rootStyle", {})),
    slidesStyle: _extends({}, styles.slidesStyle, (0, _lodash.get)(props, "slidesStyle", {})),
    styleControlWrapper: _extends({}, styles.styleControlWrapper, (0, _lodash.get)(props, "styleControlWrapper", {})),
    children: (0, _lodash.get)(props, "children", null) ? addClassToSlides((0, _lodash.get)(props, "children"), _extends({}, styles.slidesStyle, (0, _lodash.get)(props, "slidesStyle", {}))) : null,

    prevElement: props.prev ? _react2.default.cloneElement((0, _lodash.get)(props, "prevElement", _react2.default.createElement(
      "button",
      null,
      "prev"
    ))) : null,
    nextElement: props.next ? _react2.default.cloneElement((0, _lodash.get)(props, "nextElement", _react2.default.createElement(
      "button",
      null,
      "next"
    ))) : null,
    swipeableViewsProps: (0, _lodash.get)(props, "swipeableViewsProps", defaultSwipeableViewsProps)

  };
});

exports.default = (0, _recompose.compose)((0, _recompose.setDisplayName)({
  displayName: "react-carousel-ss"
}), _mapProps, (0, _recompose.withState)("activeSlide", "onChangeSlide", 0), (0, _recompose.withState)("numberSlide", "updateNumberSlide", function (props) {
  return (0, _lodash.size)((0, _lodash.chunk)((0, _lodash.get)(props, "children", 0), (0, _lodash.get)(props, "showItemsNumber")));
}), (0, _recompose.withState)("slides", "slidesAll", function (props) {
  return (0, _lodash.chunk)((0, _lodash.get)(props, "children", 0), (0, _lodash.get)(props, "showItemsNumber"));
}), (0, _recompose.withHandlers)({
  onClickPrev: function onClickPrev(_ref) {
    var onChangeSlide = _ref.onChangeSlide;
    return function () {
      return onChangeSlide(function (n) {
        return n > 0 ? --n : n;
      });
    };
  },
  onClickNext: function onClickNext(_ref2) {
    var onChangeSlide = _ref2.onChangeSlide,
        numberSlide = _ref2.numberSlide;
    return function () {
      return onChangeSlide(function (n) {
        return n < numberSlide - 1 ? ++n : n;
      });
    };
  }
}));