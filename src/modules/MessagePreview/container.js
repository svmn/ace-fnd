'use strict';

import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state) {
  return state.preview;
}

export default connect(mapStateToProps, null, null, { withRef: true })(Component);

