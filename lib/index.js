"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Use = exports.TextPath = exports.TSpan = exports.Text = exports.Symbol = exports.Svg = exports.Stop = exports.Rect = exports.RadialGradient = exports.Polyline = exports.Polygon = exports.Path = exports.LinearGradient = exports.Line = exports.Image = exports.G = exports.Ellipse = exports.Defs = exports.ClipPath = exports.Circle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ripOut = require("rip-out");

var _ripOut2 = _interopRequireDefault(_ripOut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//
// Allow both numbers and strings to represent a value.
//
var numb = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]);

/**
 * Helper function to copy and paste over properties to a different object if
 * they exists.
 *
 * @param {Object} from Object to copy from.
 * @param {Object} to Object to paste to.
 * @param {String} props Name of the property
 * @private
 */
function copypaste(from, to) {
  for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    props[_key - 2] = arguments[_key];
  }

  props.forEach(function (prop) {
    if (prop in from) to[prop] = from[prop];
  });
}

/**
 * The `react-native-svg` has some crazy api's that do not match with the
 * properties that can be applied to SVG elements. This prepare function removes
 * those properties and adds the properties back in their correct location.
 *
 * @param {Object} props Properties given to us.
 * @returns {Object} Cleaned object.
 * @private
 */
function prepare(props) {
  var clean = (0, _ripOut2.default)(props, "translate", "scale", "rotate", "skewX", "skewY", "originX", "originY", "fontFamily", "fontSize", "fontWeight", "fontStyle", "style");

  var transform = [];

  //
  // Correctly apply the transformation properties.
  // To apply originX and originY we need to translate the element on those values and
  // translate them back once the element is scaled, rotated and skewed.
  //
  if ("originX" in props || "originY" in props) transform.push("translate(" + (props.originX || 0) + ", " + (props.originY || 0) + ")");
  if ("translate" in props) transform.push("translate(" + props.translate + ")");
  if ("scale" in props) transform.push("scale(" + props.scale + ")");
  if ("rotate" in props) transform.push("rotate(" + props.rotate + ")");
  if ("skewX" in props) transform.push("skewX(" + props.skewX + ")");
  if ("skewY" in props) transform.push("skewY(" + props.skewY + ")");
  if ("originX" in props || "originY" in props) transform.push("translate(" + (-props.originX || 0) + ", " + (-props.originY || 0) + ")");
  if (transform.length) clean.transform = transform.join(" ");

  //
  // Correctly set the initial style value.
  //
  var style = "style" in props ? props.style : {};

  //
  // This is the nasty part where we depend on React internals to work as
  // intended. If we add an empty object as style, it shouldn't render a `style`
  // attribute. So we can safely conditionally add things to our `style` object
  // and re-introduce it to our `clean` object
  //
  copypaste(props, style, "fontFamily", "fontSize", "fontWeight", "fontStyle");
  clean.style = style;

  return clean;
}

/**
 * Return a circle SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Circle SVG.
 * @public
 */

var Circle = function (_React$Component) {
  _inherits(Circle, _React$Component);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
  }

  _createClass(Circle, [{
    key: "setNativeProps",
    value: function setNativeProps(nativeProps) {
      if (this._component) this._component.setNativeProps(nativeProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("circle", _extends({
        ref: function ref(component) {
          _this2._component = component;
        }
      }, prepare(this.props)));
    }
  }]);

  return Circle;
}(_react2.default.Component);

/**
 * Return a clipPath SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} ClipPath SVG.
 * @public
 */


var ClipPath = function (_React$Component2) {
  _inherits(ClipPath, _React$Component2);

  function ClipPath() {
    _classCallCheck(this, ClipPath);

    return _possibleConstructorReturn(this, (ClipPath.__proto__ || Object.getPrototypeOf(ClipPath)).apply(this, arguments));
  }

  _createClass(ClipPath, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("clipPath", prepare(this.props));
    }
  }]);

  return ClipPath;
}(_react2.default.Component);

/**
 * Return a defs SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Defs SVG.
 * @public
 */


var Defs = function (_React$Component3) {
  _inherits(Defs, _React$Component3);

  function Defs() {
    _classCallCheck(this, Defs);

    return _possibleConstructorReturn(this, (Defs.__proto__ || Object.getPrototypeOf(Defs)).apply(this, arguments));
  }

  _createClass(Defs, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("defs", prepare(this.props));
    }
  }]);

  return Defs;
}(_react2.default.Component);

/**
 * Return a ellipse SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Ellipse SVG.
 * @public
 */


var Ellipse = function (_React$Component4) {
  _inherits(Ellipse, _React$Component4);

  function Ellipse() {
    _classCallCheck(this, Ellipse);

    return _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).apply(this, arguments));
  }

  _createClass(Ellipse, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("ellipse", prepare(this.props));
    }
  }]);

  return Ellipse;
}(_react2.default.Component);

/**
 * Return a g SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} G SVG.
 * @public
 */


var G = function (_React$Component5) {
  _inherits(G, _React$Component5);

  function G() {
    _classCallCheck(this, G);

    return _possibleConstructorReturn(this, (G.__proto__ || Object.getPrototypeOf(G)).apply(this, arguments));
  }

  _createClass(G, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          x = _props.x,
          y = _props.y,
          rest = _objectWithoutProperties(_props, ["x", "y"]);

      if ((x || y) && !rest.translate) {
        rest.translate = (x || 0) + ", " + (y || 0);
      }

      return _react2.default.createElement("g", prepare(rest));
    }
  }]);

  return G;
}(_react2.default.Component);

/**
 * Return a image SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Image SVG.
 * @public
 */


var Image = function (_React$Component6) {
  _inherits(Image, _React$Component6);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("image", prepare(this.props));
    }
  }]);

  return Image;
}(_react2.default.Component);

/**
 * Return a line SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Line SVG.
 * @public
 */


var Line = function (_React$Component7) {
  _inherits(Line, _React$Component7);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("line", prepare(this.props));
    }
  }]);

  return Line;
}(_react2.default.Component);

/**
 * Return a linearGradient SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} LinearGradient SVG.
 * @public
 */


var LinearGradient = function (_React$Component8) {
  _inherits(LinearGradient, _React$Component8);

  function LinearGradient() {
    _classCallCheck(this, LinearGradient);

    return _possibleConstructorReturn(this, (LinearGradient.__proto__ || Object.getPrototypeOf(LinearGradient)).apply(this, arguments));
  }

  _createClass(LinearGradient, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("linearGradient", prepare(this.props));
    }
  }]);

  return LinearGradient;
}(_react2.default.Component);

/**
 * Return a path SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Path SVG.
 * @public
 */


var Path = function (_React$Component9) {
  _inherits(Path, _React$Component9);

  function Path() {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
  }

  _createClass(Path, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("path", prepare(this.props));
    }
  }]);

  return Path;
}(_react2.default.Component);

/**
 * Return a polygon SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Polygon SVG.
 * @public
 */


var Polygon = function (_React$Component10) {
  _inherits(Polygon, _React$Component10);

  function Polygon() {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).apply(this, arguments));
  }

  _createClass(Polygon, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("polygon", prepare(this.props));
    }
  }]);

  return Polygon;
}(_react2.default.Component);

/**
 * Return a polyline SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Polyline SVG.
 * @public
 */


var Polyline = function (_React$Component11) {
  _inherits(Polyline, _React$Component11);

  function Polyline() {
    _classCallCheck(this, Polyline);

    return _possibleConstructorReturn(this, (Polyline.__proto__ || Object.getPrototypeOf(Polyline)).apply(this, arguments));
  }

  _createClass(Polyline, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("polyline", prepare(this.props));
    }
  }]);

  return Polyline;
}(_react2.default.Component);

/**
 * Return a radialGradient SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} RadialGradient SVG.
 * @public
 */


var RadialGradient = function (_React$Component12) {
  _inherits(RadialGradient, _React$Component12);

  function RadialGradient() {
    _classCallCheck(this, RadialGradient);

    return _possibleConstructorReturn(this, (RadialGradient.__proto__ || Object.getPrototypeOf(RadialGradient)).apply(this, arguments));
  }

  _createClass(RadialGradient, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("radialGradient", prepare(this.props));
    }
  }]);

  return RadialGradient;
}(_react2.default.Component);

/**
 * Return a rect SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Rect SVG.
 * @public
 */


var Rect = function (_React$Component13) {
  _inherits(Rect, _React$Component13);

  function Rect() {
    _classCallCheck(this, Rect);

    return _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).apply(this, arguments));
  }

  _createClass(Rect, [{
    key: "setNativeProps",
    value: function setNativeProps(nativeProps) {
      this._component && this._component.setNativeProps(nativeProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this15 = this;

      return _react2.default.createElement("rect", _extends({
        ref: function ref(component) {
          _this15._component = component;
        }
      }, prepare(this.props)));
    }
  }]);

  return Rect;
}(_react2.default.Component);

/**
 * Return a stop SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Stop SVG.
 * @public
 */


var Stop = function (_React$Component14) {
  _inherits(Stop, _React$Component14);

  function Stop() {
    _classCallCheck(this, Stop);

    return _possibleConstructorReturn(this, (Stop.__proto__ || Object.getPrototypeOf(Stop)).apply(this, arguments));
  }

  _createClass(Stop, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("stop", prepare(this.props));
    }
  }]);

  return Stop;
}(_react2.default.Component);

/**
 * Return a SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} SVG.
 * @public
 */


var Svg = function (_React$Component15) {
  _inherits(Svg, _React$Component15);

  function Svg() {
    _classCallCheck(this, Svg);

    return _possibleConstructorReturn(this, (Svg.__proto__ || Object.getPrototypeOf(Svg)).apply(this, arguments));
  }

  _createClass(Svg, [{
    key: "setNativeProps",
    value: function setNativeProps(nativeProps) {
      this._component && this._component.setNativeProps(nativeProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this18 = this;

      var _props2 = this.props,
          title = _props2.title,
          rest = _objectWithoutProperties(_props2, ["title"]);

      if (title) {
        return _react2.default.createElement(
          "svg",
          _extends({
            ref: function ref(component) {
              _this18._component = component;
            },
            role: "img",
            "aria-label": "[title]"
          }, prepare(rest)),
          _react2.default.createElement(
            "title",
            null,
            title
          ),
          this.props.children
        );
      }

      return _react2.default.createElement("svg", _extends({
        ref: function ref(component) {
          _this18._component = component;
        }
      }, prepare(rest)));
    }
  }]);

  return Svg;
}(_react2.default.Component);

Svg.propTypes = {
  title: _propTypes2.default.string,
  desc: _propTypes2.default.string
};

/**
 * Return a symbol SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Symbol SVG.
 * @public
 */

var _Symbol = function (_React$Component16) {
  _inherits(_Symbol, _React$Component16);

  function _Symbol() {
    _classCallCheck(this, _Symbol);

    return _possibleConstructorReturn(this, (_Symbol.__proto__ || Object.getPrototypeOf(_Symbol)).apply(this, arguments));
  }

  _createClass(_Symbol, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("symbol", prepare(props));
    }
  }]);

  return _Symbol;
}(_react2.default.Component);

/**
 * Return a text SVG element.
 *
 * @returns {React.Component} Text SVG.
 * @public
 * @param {Object} props The properties that are spread on the SVG element.
 * @param {String} props.x x position
 * @param {String} props.y y position
 * @param {String} props.dx delta x
 * @param {String} props.dy delta y
 * @param {String} props.rotate rotation
 */


var Text = function (_React$Component17) {
  _inherits(Text, _React$Component17);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      var _props3 = props,
          x = _props3.x,
          y = _props3.y,
          dx = _props3.dx,
          dy = _props3.dy,
          rotate = _props3.rotate,
          rest = _objectWithoutProperties(_props3, ["x", "y", "dx", "dy", "rotate"]);

      return _react2.default.createElement("text", _extends({}, prepare(rest), { x: x, y: y, dx: dx, dy: dy, rotate: rotate }));
    }
  }]);

  return Text;
}(_react2.default.Component);

Text.propTypes = {
  x: numb,
  y: numb,
  dx: numb,
  dy: numb,
  rotate: numb
};

/**
 * Return a tspan SVG element.
 *
 * @returns {React.Component} TSpan SVG.
 * @public
 * @param {Object} props The properties that are spread on the SVG element.
 * @param {String} props.x x position
 * @param {String} props.y y position
 * @param {String} props.dx delta x
 * @param {String} props.dy delta y
 * @param {String} props.rotate rotation
 */

var TSpan = function (_React$Component18) {
  _inherits(TSpan, _React$Component18);

  function TSpan() {
    _classCallCheck(this, TSpan);

    return _possibleConstructorReturn(this, (TSpan.__proto__ || Object.getPrototypeOf(TSpan)).apply(this, arguments));
  }

  _createClass(TSpan, [{
    key: "render",
    value: function render() {
      var _props4 = props,
          x = _props4.x,
          y = _props4.y,
          dx = _props4.dx,
          dy = _props4.dy,
          rotate = _props4.rotate,
          rest = _objectWithoutProperties(_props4, ["x", "y", "dx", "dy", "rotate"]);

      return _react2.default.createElement("tspan", _extends({}, prepare(rest), { x: x, y: y, dx: dx, dy: dy, rotate: rotate }));
    }
  }]);

  return TSpan;
}(_react2.default.Component);

TSpan.propTypes = Text.propTypes;

/**
 * Return a textpath SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} TextPath SVG.
 * @public
 */

var TextPath = function (_React$Component19) {
  _inherits(TextPath, _React$Component19);

  function TextPath() {
    _classCallCheck(this, TextPath);

    return _possibleConstructorReturn(this, (TextPath.__proto__ || Object.getPrototypeOf(TextPath)).apply(this, arguments));
  }

  _createClass(TextPath, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("textPath", prepare(props));
    }
  }]);

  return TextPath;
}(_react2.default.Component);

/**
 * Return a use SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Use SVG.
 * @public
 */


var Use = function (_React$Component20) {
  _inherits(Use, _React$Component20);

  function Use() {
    _classCallCheck(this, Use);

    return _possibleConstructorReturn(this, (Use.__proto__ || Object.getPrototypeOf(Use)).apply(this, arguments));
  }

  _createClass(Use, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("use", prepare(props));
    }
  }]);

  return Use;
}(_react2.default.Component);

//
// Expose everything in the same way as `react-native-svg` is doing.
//


exports.Circle = Circle;
exports.ClipPath = ClipPath;
exports.Defs = Defs;
exports.Ellipse = Ellipse;
exports.G = G;
exports.Image = Image;
exports.Line = Line;
exports.LinearGradient = LinearGradient;
exports.Path = Path;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.RadialGradient = RadialGradient;
exports.Rect = Rect;
exports.Stop = Stop;
exports.Svg = Svg;
exports.Symbol = _Symbol;
exports.Text = Text;
exports.TSpan = TSpan;
exports.TextPath = TextPath;
exports.Use = Use;
exports.default = Svg;