'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions } from '../Playlist';

function mapStateToProps(state) {
  return {
    track: state.playlist.items.find(track => track.id === state.playlist.selected)
  };
}

export default connect(mapStateToProps, actions)(Component);
