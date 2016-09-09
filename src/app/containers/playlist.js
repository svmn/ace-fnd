'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Playlist extends Component {
  render() {
    return (
      <div>Playlist</div>
    );
  }
}

const mapStatetoProps = (state) => ({ playlist: state.playlist });
export default connect(mapStatetoProps)(Playlist);
