'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostArea extends Component {
  render() {
    return (
      <div className='bottom'>Post Area</div>
    );
  }
}

const mapStatetoProps = (state) => ({ message: state.chat.typedMessage });
export default connect(mapStatetoProps)(PostArea);
