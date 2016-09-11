'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  render() {
    return (
      <div className='bottom'>Player</div>
    );
  }
}

const mapStatetoProps = (state) => ({ playlist: state.playlist });
export default connect(mapStatetoProps)(Player);
