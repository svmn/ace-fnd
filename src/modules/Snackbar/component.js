'use strict';

import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class AceSnackbar extends Component {
  render() {
    return (
      <Snackbar
        autoHideDuration={10000}
        message={this.props.message}
        onRequestClose={this.props.snackbarClose}
        open={Boolean(this.props.message)}
        bodyStyle={{
          height: null,
          lineHeight: null,
          padding: '12px 24px'
        }}
      />
    );
  }
}

AceSnackbar.propTypes = {
  message: PropTypes.string,
  snackbarClose: PropTypes.func.isRequired
};
