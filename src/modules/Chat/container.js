'use strict';

import { connect } from 'react-redux';
import Component from './component';
import * as chatActions from './actions';
import { actions as previewActions } from '../MessagePreview';

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    replies: state.chat.replies
  };
}

const actions = Object.assign({}, chatActions, previewActions);

export default connect(mapStateToProps, actions)(Component);
