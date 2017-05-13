'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chat } from '../Chat';

function mapStateToProps(state) {
  return Object.assign({}, state.postarea, {
    settings: state.settings,
    logMode: Boolean(state.chat.logDate)
  });
}

const actions = {
  send: chat.send,
  exitLog: chat.exitLog
};

export default connect(mapStateToProps, actions)(Component);
