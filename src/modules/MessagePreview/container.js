'use strict';

import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state) {
  return Object.assign({}, state.preview, { settings: state.settings });
}

export default connect(mapStateToProps)(Component);

