'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { blueGrey500, grey800, grey900, darkWhite, darkBlack, deepOrange200, deepOrange500 } from 'material-ui/styles/colors';
import classnames from 'classnames';
import Logo from '../components/logo';
import Header from '../containers/header';
import Playlist from '../containers/playlist';
import Chat from '../containers/chat';
import Player from '../containers/player';
import PostArea from '../containers/postArea';
import Snackbar from '../containers/snackbar';
import PreviewMessage from '../containers/previewMessage';
import { setBackground } from '../utils';

lightBaseTheme.appBar = {
  padding: '16px'
};
lightBaseTheme.palette.primary1Color = blueGrey500;
lightBaseTheme.palette.textColor = darkBlack;

darkBaseTheme.appBar = {
  color: grey900,
  textColor: darkWhite,
  padding: '16px'
};
darkBaseTheme.palette.primary1Color = deepOrange500;
darkBaseTheme.palette.accent2Color = deepOrange200;
darkBaseTheme.palette.accent3Color = deepOrange200;
darkBaseTheme.palette.canvasColor = grey800;
darkBaseTheme.palette.textColor = darkWhite;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistMode: false,
      theme: localStorage.theme || 'light'
    };
  }

  componentDidMount() {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
    setBackground(this.state.theme);
  }

  setTheme(theme) {
    this.setState({ theme });
    setBackground(theme);
    localStorage.theme = theme;
  }

  togglePlaylistMode() {
    this.setState({
      playlistMode: !this.state.playlistMode
    });
  }

  insertReply(reply) {
    this.postarea.getWrappedInstance().insertReply(reply);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme === 'light' ? lightBaseTheme : darkBaseTheme)}>
        <div className={classnames('container', { 'playlist-mode': this.state.playlistMode }, this.state.theme)}>
          <div className='sidebar'>
            <Logo togglePlaylistMode={() => this.togglePlaylistMode()} playlistMode={this.state.playlistMode} />
            <Playlist />
            <Player theme={this.state.theme} />
          </div>
          <div className='main'>
            <Header togglePlaylistMode={() => this.togglePlaylistMode()} setTheme={this.setTheme.bind(this)} theme={this.state.theme} />
            <Chat insertReply={this.insertReply.bind(this)} />
            <PostArea ref={ref => (this.postarea = ref)} theme={this.state.theme} />
            <PreviewMessage />
          </div>
          <Snackbar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
