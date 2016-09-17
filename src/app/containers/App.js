'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from '../components/logo';
import Header from '../containers/header';
import Playlist from '../containers/playlist';
import Chat from '../containers/chat';
import Player from '../containers/player';
import PostArea from '../containers/postArea';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='container'>
          <div className='appbar'>
            <Logo />
            <Header />
          </div>
          <div className='sidebar'>
            <Playlist />
            <Player />
          </div>
          <div className='main'>
            <Chat />
            <PostArea />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
