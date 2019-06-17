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
    width: "100%"
  }
};

var addClassToSlides = function addClassToSlides(e, numberItems, styles) {
  var children = [];
  for (var el in e) {
    children.push(_react2.default.cloneElement(e[el], {
      className: "rcss-item-" + el,
      key: el,
      style: _extends({
        width: 100 / numberItems + "%"
      }, styles, e[el].props.style)
    }));
  }

  return children;
};

var calcWrapperSlidesWidth = function calcWrapperSlidesWidth(props) {
  var s = _extends({}, styles.wrapperSlidesStyle, (0, _lodash.get)(props, "wrapperSlidesStyle", {}), {
    width: props.numberSlide * (100 / props.showItemsNumber) + "%"
  });
  return s;
};

var calcWrapperSlidesPosition = function calcWrapperSlidesPosition(props) {
  var step = 100 / props.showItemsNumber;

  var wrapperSlidesStyle = _extends({}, props.wrapperSlidesStyle, {
    left: "-" + (props.activeSlide === 0 ? 0 : step * props.activeSlide + "%")
  });

  return wrapperSlidesStyle;
};

var _mapProps = (0, _recompose.mapProps)(function (props) {
  return {
    prev: (0, _lodash.get)(props, "prev", false),
    next: (0, _lodash.get)(props, "next", false),
    showItemsNumber: (0, _lodash.get)(props, "showItemsNumber", 1),
    transition: (0, _lodash.get)(props, "transition", "all 0.5s ease"),
    wrapperHeight: (0, _lodash.get)(props, "wrapperHeight", "200px"),
    wrapperSlidesStyle: _extends({}, styles.wrapperSlidesStyle, {
      transition: (0, _lodash.get)(props, "transition", "all 0.5s ease")
    }, (0, _lodash.get)(props, "wrapperSlidesStyle", {})),
    rootStyle: _extends({}, styles.rootStyle, (0, _lodash.get)(props, "rootStyle", {}), {
      height: (0, _lodash.get)(props, "wrapperHeight", "500px")
    }),
    slidesStyle: _extends({}, styles.slidesStyle, (0, _lodash.get)(props, "slidesStyle", {})),
    styleControlWrapper: _extends({}, styles.styleControlWrapper, (0, _lodash.get)(props, "styleControlWrapper", {})),
    children: (0, _lodash.get)(props, "children", null) !== null ? addClassToSlides((0, _lodash.get)(props, "children"), (0, _lodash.get)(props, "showItemsNumber", 1), _extends({}, styles.slidesStyle, (0, _lodash.get)(props, "slidesStyle", {}))) : null,
    prevElement: props.prev ? _react2.default.cloneElement((0, _lodash.get)(props, "prevElement", _react2.default.createElement(
      "span",
      null,
      "prev"
    )), {
      className: "rcss-prev",
      style: _extends({}, props.prevElement.props.style, { position: "absolute", left: 0 })
    }) : null,
    nextElement: props.next ? _react2.default.cloneElement((0, _lodash.get)(props, "nextElement", _react2.default.createElement(
      "span",
      null,
      "prev"
    )), {
      className: "rcss-next",
      style: _extends({}, props.prevElement.props.style, { position: "absolute", right: 0 })
    }) : null
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.setDisplayName)({
  displayName: "react-carousel-ss"
}), _mapProps, (0, _recompose.withState)("activeSlide", "onChangeSlide", 0), (0, _recompose.withState)("numberSlide", "updateNumberSlide", function (props) {
  return (0, _lodash.size)((0, _lodash.get)(props, "children", 0));
}), (0, _recompose.withState)("wrapperSlidesWidth", "updateWrapperWidth", function (props) {
  return calcWrapperSlidesWidth(props);
}), (0, _recompose.withState)("slidePosition", "updateSlidePosition", function (props) {
  calcWrapperSlidesPosition(props);
}), (0, _recompose.withHandlers)({
  updateWidth: function updateWidth(props) {
    return function () {
      var updateSlidePosition = props.updateSlidePosition;

      updateSlidePosition(function () {
        return calcWrapperSlidesPosition(props);
      });
    };
  }
}), (0, _recompose.withHandlers)({
  onClickPrev: function onClickPrev(props) {
    return function () {
      var onChangeSlide = props.onChangeSlide;

      onChangeSlide(function (n) {
        var currentSlide = n > 0 ? --n : n;
        return currentSlide;
      });
    };
  },
  onClickNext: function onClickNext(props) {
    return function () {
      var onChangeSlide = props.onChangeSlide,
          numberSlide = props.numberSlide;

      onChangeSlide(function (n) {
        var currentSlide = n < numberSlide - 1 && props.showItemsNumber + n < numberSlide ? ++n : n;
        return currentSlide;
      });
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(prevProps) {
    if (this.props.activeSlide !== prevProps.activeSlide) {
      this.props.updateWidth(prevProps);
    }
  }
}));