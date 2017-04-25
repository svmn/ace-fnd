'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chat } from '../Chat';

function mapStateToProps(state) {
  return state.info;
}

const actions = {
  ignoreClear: chat.ignoreClear
};

export default connect(mapStateToProps, actions)(Component);
