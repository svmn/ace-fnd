'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey200, darkBlack, blue500, blue700 } from 'material-ui/styles/colors';
import classnames from 'classnames';
import Logo from '../components/logo';
import Header from '../containers/header';
import Playlist from '../containers/playlist';
import Chat from '../containers/chat';
import Player from '../containers/player';
import PostArea from '../containers/postArea';
import Snackbar from '../containers/snackbar';
import PreviewMessage from '../containers/previewMessage';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700
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

  componentDidMount() {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  }

  focusTextarea() {
    this.postarea.getWrappedInstance().focus();
  }

  togglePlaylistMode() {
    this.setState({
      playlistMode: !this.state.playlistMode
    });
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
            <Chat focusTextarea={this.focusTextarea.bind(this)} />
            <PostArea ref={ref => (this.postarea = ref)} />
            <PreviewMessage />
          </div>
          <Snackbar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
