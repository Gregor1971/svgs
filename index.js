import PropTypes from "prop-types";
import React from "react";
import rip from "rip-out";

//
// Allow both numbers and strings to represent a value.
//
const numb = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

/**
 * Helper function to copy and paste over properties to a different object if
 * they exists.
 *
 * @param {Object} from Object to copy from.
 * @param {Object} to Object to paste to.
 * @param {String} props Name of the property
 * @private
 */
function copypaste(from, to, ...props) {
  props.forEach(prop => {
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
  const clean = rip(
    props,
    "translate",
    "scale",
    "rotate",
    "skewX",
    "skewY",
    "originX",
    "originY",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "style"
  );

  const transform = [];

  //
  // Correctly apply the transformation properties.
  // To apply originX and originY we need to translate the element on those values and
  // translate them back once the element is scaled, rotated and skewed.
  //
  if ("originX" in props || "originY" in props)
    transform.push(`translate(${props.originX || 0}, ${props.originY || 0})`);
  if ("translate" in props) transform.push(`translate(${props.translate})`);
  if ("scale" in props) transform.push(`scale(${props.scale})`);
  if ("rotate" in props) transform.push(`rotate(${props.rotate})`);
  if ("skewX" in props) transform.push(`skewX(${props.skewX})`);
  if ("skewY" in props) transform.push(`skewY(${props.skewY})`);
  if ("originX" in props || "originY" in props)
    transform.push(`translate(${-props.originX || 0}, ${-props.originY || 0})`);
  if (transform.length) clean.transform = transform.join(" ");

  //
  // Correctly set the initial style value.
  //
  const style = "style" in props ? props.style : {};

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
class Circle extends React.Component {
  setNativeProps(nativeProps) {
    if (this._component) this._component.setNativeProps(nativeProps);
  }

  render() {
    return (
      <circle
        ref={component => {
          this._component = component;
        }}
        {...prepare(this.props)}
      />
    );
  }
}

/**
 * Return a clipPath SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} ClipPath SVG.
 * @public
 */
class ClipPath extends React.Component {
  render() {
    return <clipPath {...prepare(this.props)} />;
  }
}

/**
 * Return a defs SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Defs SVG.
 * @public
 */
class Defs extends React.Component {
  render() {
    return <defs {...prepare(this.props)} />;
  }
}

/**
 * Return a ellipse SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Ellipse SVG.
 * @public
 */
class Ellipse extends React.Component {
  render() {
    return <ellipse {...prepare(this.props)} />;
  }
}

/**
 * Return a g SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} G SVG.
 * @public
 */
class G extends React.Component {
  render() {
    const { x, y, ...rest } = this.props;

    if ((x || y) && !rest.translate) {
      rest.translate = `${x || 0}, ${y || 0}`;
    }

    return <g {...prepare(rest)} />;
  }
}

/**
 * Return a image SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Image SVG.
 * @public
 */
class Image extends React.Component {
  render() {
    return <image {...prepare(this.props)} />;
  }
}

/**
 * Return a line SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Line SVG.
 * @public
 */
class Line extends React.Component {
  render() {
    return <line {...prepare(this.props)} />;
  }
}

/**
 * Return a linearGradient SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} LinearGradient SVG.
 * @public
 */
class LinearGradient extends React.Component {
  render() {
    return <linearGradient {...prepare(this.props)} />;
  }
}

/**
 * Return a path SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Path SVG.
 * @public
 */
class Path extends React.Component {
  render() {
    return <path {...prepare(this.props)} />;
  }
}

/**
 * Return a polygon SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Polygon SVG.
 * @public
 */
class Polygon extends React.Component {
  render() {
    return <polygon {...prepare(this.props)} />;
  }
}

/**
 * Return a polyline SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Polyline SVG.
 * @public
 */
class Polyline extends React.Component {
  render() {
    return <polyline {...prepare(this.props)} />;
  }
}

/**
 * Return a radialGradient SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} RadialGradient SVG.
 * @public
 */
class RadialGradient extends React.Component {
  render() {
    return <radialGradient {...prepare(this.props)} />;
  }
}

/**
 * Return a rect SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Rect SVG.
 * @public
 */
class Rect extends React.Component {
  setNativeProps(nativeProps) {
    this._component && this._component.setNativeProps(nativeProps);
  }

  render() {
    return (
      <rect
        ref={component => {
          this._component = component;
        }}
        {...prepare(this.props)}
      />
    );
  }
}

/**
 * Return a stop SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} Stop SVG.
 * @public
 */
class Stop extends React.Component {
  render() {
    return <stop {...prepare(this.props)} />;
  }
}

/**
 * Return a SVG element.
 *
 * @param {Object} this.props The properties that are spread on the SVG element.
 * @returns {React.Component} SVG.
 * @public
 */
class Svg extends React.Component {
  setNativeProps(nativeProps) {
    this._component && this._component.setNativeProps(nativeProps);
  }

  render() {
    const { title, ...rest } = this.props;
    if (title) {
      return (
        <svg
          ref={component => {
            this._component = component;
          }}
          role="img"
          aria-label="[title]"
          {...prepare(rest)}
        >
          <title>{title}</title>
          {this.props.children}
        </svg>
      );
    }

    return (
      <svg
        ref={component => {
          this._component = component;
        }}
        {...prepare(rest)}
      />
    );
  }
}

Svg.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
};

/**
 * Return a symbol SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Symbol SVG.
 * @public
 */
class Symbol extends React.Component {
  render() {
    return <symbol {...prepare(props)} />;
  }
}

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
class Text extends React.Component {
  render() {
    const { x, y, dx, dy, rotate, ...rest } = props;
    return <text {...prepare(rest)} {...{ x, y, dx, dy, rotate }} />;
  }
}

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
class TSpan extends React.Component {
  render() {
    const { x, y, dx, dy, rotate, ...rest } = props;
    return <tspan {...prepare(rest)} {...{ x, y, dx, dy, rotate }} />;
  }
}

TSpan.propTypes = Text.propTypes;

/**
 * Return a textpath SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} TextPath SVG.
 * @public
 */
class TextPath extends React.Component {
  render() {
    return <textPath {...prepare(props)} />;
  }
}

/**
 * Return a use SVG element.
 *
 * @param {Object} props The properties that are spread on the SVG element.
 * @returns {React.Component} Use SVG.
 * @public
 */
class Use extends React.Component {
  render() {
    return <use {...prepare(props)} />;
  }
}

//
// Expose everything in the same way as `react-native-svg` is doing.
//
export {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Text,
  TSpan,
  TextPath,
  Use
};

export default Svg;
