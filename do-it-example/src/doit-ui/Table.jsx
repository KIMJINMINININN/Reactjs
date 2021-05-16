import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylePropTypes } from './withStyles';

class TableHead extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <thead>
        {React.Children.map(children, (child) => React.cloneElement(child, { isHeader: true }))}
      </thead>
    );
  }
}

TableHead.propTypes = {
  children: PropTypes.node,
};

export default TableHead;
