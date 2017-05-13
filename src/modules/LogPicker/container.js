'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions } from '../Chat';

export default connect(null, { load: actions.loadLog })(Component);
