'use strict';

import { connect } from 'react-redux';
import Component from './component';
import * as actions from '../../actions/memeFeed';

function mapStateToProps(state) {
  return {
    feed: state.imageFeed
  };
}

export default connect(mapStateToProps, actions)(Component);
