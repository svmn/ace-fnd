'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chat } from '../Chat';

function mapStateToProps(state) {
  return state.postarea;
}

const actions = {
  send: chat.send
};

export default connect(mapStateToProps, actions)(Component);
