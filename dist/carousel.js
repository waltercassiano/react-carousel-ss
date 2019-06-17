"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _carousel = require("./_carousel");

var _carousel2 = _interopRequireDefault(_carousel);

var _reactContainerDimensions = require("react-container-dimensions");

var _reactContainerDimensions2 = _interopRequireDefault(_reactContainerDimensions);

var _reactSwipeableViews = require("react-swipeable-views");

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel() {
    _classCallCheck(this, Carousel);

    return _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));
  }

  _createClass(Carousel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          nextElement = _props.nextElement,
          prevElement = _props.prevElement,
          rootStyle = _props.rootStyle,
          styleControlWrapper = _props.styleControlWrapper,
          slidesStyle = _props.slidesStyle,
          activeSlide = _props.activeSlide,
          slides = _props.slides;

      return _react2.default.createElement(
        _reactContainerDimensions2.default,
        null,
        function (_ref) {
          var width = _ref.width;

          return _react2.default.createElement(
            "div",
            { style: _extends({}, rootStyle) },
            _react2.default.createElement(
              "div",
              { style: styleControlWrapper },
              nextElement ? _react2.default.cloneElement(prevElement, {
                onClick: _this2.props.onClickPrev
              }) : null,
              prevElement ? _react2.default.cloneElement(nextElement, {
                onClick: _this2.props.onClickNext
              }) : null
            ),
            _react2.default.createElement(_reactSwipeableViews2.default, {
              enableMouseEvents: true,
              index: activeSlide,
              interval: 1000,
              children: slides.map(function (slide) {
                return _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  slide
                );
              }),
              slideStyle: slidesStyle
            })
          );
        }
      );
    }
  }]);

  return Carousel;
}(_react.Component);

exports.default = (0, _carousel2.default)(Carousel);