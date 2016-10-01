'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey200, darkBlack } from 'material-ui/styles/colors';
import classnames from 'classnames';
import Logo from '../components/logo';
import Header from '../containers/header';
import Playlist from '../containers/playlist';
import Chat from '../containers/chat';
import Player from '../containers/player';
import PostArea from '../containers/postArea';

const muiTheme = getMuiTheme({
  palette: {
  },
  appBar: {
    color: grey200,
    textColor: darkBlack,
    padding: '16px'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistMode: false
    };
  }

  togglePlaylistMode() {
    this.setState({
      playlistMode: !this.state.playlistMode
    });
  }

  componentDidMount() {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={classnames('container', { 'playlist-mode': this.state.playlistMode })} >
          <div className='sidebar'>
            <Logo togglePlaylistMode={() => this.togglePlaylistMode()} playlistMode={this.state.playlistMode} />
            <Playlist />
            <Player />
          </div>
          <div className='main'>
            <Header togglePlaylistMode={() => this.togglePlaylistMode()} />
            <Chat />
            <PostArea />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
