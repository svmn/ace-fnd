'use strict';

import { connect } from 'react-redux';
import Component from './component';
import {
  ignoreClear
} from '../../actions/chat';

function mapStateToProps(state) {
  return {
    topic: state.topic,
    online: state.onlineCounter
  };
}

const actions = {
  ignoreClear
};

export default connect(mapStateToProps, actions)(Component);
