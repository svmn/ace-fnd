'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classnames from 'classnames';
import themes from '../themes';
import Logo from '../components/logo';
import Header from '../containers/header';
import Playlist from '../containers/playlist';
import Chat from '../containers/chat';
import Player from '../containers/player';
import PostArea from '../containers/postArea';
import Snackbar from '../containers/snackbar';
import PreviewMessage from '../containers/previewMessage';
import SidebarMenu from '../components/sidebarMenu';
import MemeFeed from '../containers/MemeFeed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistMode: false,
      sidebarContent: 0,
      theme: localStorage.theme || 'light'
    };
  }

  componentDidMount() {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  }

  setTheme(theme) {
    this.setState({ theme });
    localStorage.theme = theme;
  }

  setSidebarContent(content) {
    this.setState({
      sidebarContent: content
    });
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
      <MuiThemeProvider muiTheme={getMuiTheme(themes[this.state.theme])}>
        <div className={classnames('container', { 'playlist-mode': this.state.playlistMode }, this.state.theme)}>

          <div className='sidebar'>
            <Logo togglePlaylistMode={() => this.togglePlaylistMode()} playlistMode={this.state.playlistMode} />

            {this.state.sidebarContent === 0 ? <Playlist theme={this.state.theme} /> : null}
            {this.state.sidebarContent === 1 ? <MemeFeed /> : null}
            {this.state.sidebarContent === 2 ? <div className='middle border-right' /> : null}

            <Player theme={this.state.theme} />
            <SidebarMenu selected={this.state.sidebarContent} select={this.setSidebarContent.bind(this)} />

          </div>

          <div className='main'>
            <Header
              togglePlaylistMode={() => this.togglePlaylistMode()}
              setTheme={this.setTheme.bind(this)}
              theme={this.state.theme}
            />
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
