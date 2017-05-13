'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chat } from '../Chat';
import { actions as settings } from '../Settings';

function mapStateToProps(state) {
  return Object.assign({}, state.info, { logDate: state.chat.logDate });
}

const actions = {
  ignoreClear: chat.ignoreClear,
  openSettings: settings.open
};

export default connect(mapStateToProps, actions)(Component);
