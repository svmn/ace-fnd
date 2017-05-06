'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chat } from '../Chat';
import { actions as settings } from '../Settings';

function mapStateToProps(state) {
  return state.info;
}

const actions = {
  ignoreClear: chat.ignoreClear,
  openSettings: settings.open
};

export default connect(mapStateToProps, actions)(Component);
