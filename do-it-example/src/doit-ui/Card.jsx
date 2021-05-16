import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import Spacing from './Spacing';
import Text from './Text';

class Toast extends PureComponent {
  render() {
    const { message, styles, waring } = this.props;

    return (
      <div {...css(styles.overlay)}>
        <div {...css(styles.wrapper, waring && styles.waring)}>
          <Spacing vertical={4} horizontal={8}>
            {message}
          </Spacing>
        </div>
      </div>
    );
  }
}

Toast.propTypes = {
  ...withStylesPropTypes,
  waring: PropTypes.bool,
  message: PropTypes.string,
};

export default withStyles(({ depth, unit, color }) => ({
  overlay: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: unit * 4,
  },
  wrapper: {
    ...depth.level1,
    borderRadius: unit,
    backgroundColor: color.secondary,
    padding: unit * 2,
    marginBottom: unit * 4,
  },
  waring: {
    backgroundColor: color.error,
  },
}))(Toast);
