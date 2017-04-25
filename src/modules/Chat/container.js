'use strict';

import { connect } from 'react-redux';
import Component from './component';
import * as actions from './actions';

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    replies: state.chat.replies
  };
}

export default connect(mapStateToProps, actions)(Component);
