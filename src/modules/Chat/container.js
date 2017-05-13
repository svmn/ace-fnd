'use strict';

import { connect } from 'react-redux';
import Component from './component';
import * as chatActions from './actions';
import { actions as previewActions } from '../MessagePreview';

function mapStateToProps(state) {
  return Object.assign({}, state.chat, {
    logMode: Boolean(state.chat.logDate),
    settings: state.settings
  });
}

const actions = Object.assign({}, chatActions, previewActions);

export default connect(mapStateToProps, actions)(Component);
