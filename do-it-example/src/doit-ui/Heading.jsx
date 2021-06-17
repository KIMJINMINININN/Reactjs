import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css } from './withStyles';
const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

class Heading extends PureComponent {
  render() {
    const {
      children,
      styles,
      large,
      xlarge,
      small,
      xsmall,
      primary,
      secondary,
      level,
    } = this.props;

    const HeadingTag = headingTags[level - 1];

    return (
      <HeadingTag
        {...css(
          styles.default,
          xsmall && styles.xsmall,
          small && styles.small,
          large && styles.large,
          xlarge && styles.xlarge,
          secondary && styles.secondary,
          primary && styles.primary,
        )}
      >
        {children}
      </HeadingTag>
    );
  }
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
};

Heading.defaultProps = {
  level: 1,
};

export default withStyles(({ color, size, responsive, lineHeight, fontWeight, unit }) => ({
  default: {
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.bold,
  },
  inverse: {
    color: color.white,
  },
  level1: {
    fontSize: size.h1,
    marginTop: unit * 2,
    marginBottom: unit * 4,
  },
  xlarge: {
    fontSize: size.xg,
  },
  large: {
    fontSize: size.lg,
  },
  small: {
    fontSize: size.sm,
  },
  xsmall: {
    fontSize: size.xs,
  },
  primary: {
    color: color.primary,
  },
  secondary: {
    color: color.secondary,
  },
}))(Heading);
