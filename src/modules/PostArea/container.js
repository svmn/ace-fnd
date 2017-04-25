'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { chatSend } from '../../actions/chat';
import { avatarUpload } from '../../actions/avatar';

function mapStateToProps(state) {
  return {
    processing: state.postarea.processing,
    avatar: state.avatar
  };
}

const actions = {
  chatSend,
  avatarUpload
};

export default connect(mapStateToProps, actions, null, { withRef: true })(Component);
