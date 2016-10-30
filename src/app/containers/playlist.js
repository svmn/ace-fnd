'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Playlist extends Component {
  render() {
    return (
      <div className='middle border-right' style={{ padding: '16px' }}>
        Плейлист пуст. Советуем посмотреть фид картинок и webm.
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({ playlist: state.playlist });
export default connect(mapStatetoProps)(Playlist);
