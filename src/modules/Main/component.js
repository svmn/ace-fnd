'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classnames from 'classnames';
import themes from '../../themes';
import { Component as LeftHeader } from '../LeftHeader';
import { Container as RightHeader } from '../RightHeader';
import { Container as Playlist } from '../Playlist';
import { Container as Chat } from '../Chat';
import { Container as Player } from '../Player';
import { Container as PostArea } from '../PostArea';
import { Container as Snackbar } from '../Snackbar';
import { Container as MessagePreview } from '../MessagePreview';
import { Component as SidebarMenu } from '../SidebarMenu';
import { Container as ImageFeed } from '../ImageFeed';

export default class Main extends Component {
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

  movePreview(x, y) {
    const cursorOffset = 20;
    const el = this.preview.getWrappedInstance().ref;
    if (!el) return;
    const previewHeight = el.offsetHeight;
    const previewWidth = el.offsetWidth;
    const rightEdgeDistance = window.innerWidth - x - previewWidth - cursorOffset;
    const bottomEdgeDistance = window.innerHeight - y - previewHeight - cursorOffset;
    const leftPos = (rightEdgeDistance <= 10) ?
      x - previewWidth - cursorOffset :
      x + cursorOffset;
    const topPos = (bottomEdgeDistance <= 10) ?
      y - previewHeight - cursorOffset :
      y + cursorOffset;
    el.style.top = `${topPos}px`;
    el.style.left = `${leftPos}px`;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(themes[this.state.theme])}>
        <div className={classnames('container', { 'playlist-mode': this.state.playlistMode }, this.state.theme)}>
          <div className='left'>
            <LeftHeader togglePlaylistMode={() => this.togglePlaylistMode()} playlistMode={this.state.playlistMode} />

            <Player theme={this.state.theme} />

            {this.state.sidebarContent === 0 ? <Playlist theme={this.state.theme} /> : null}
            {this.state.sidebarContent === 1 ? <ImageFeed /> : null}

            <SidebarMenu selected={this.state.sidebarContent} select={this.setSidebarContent.bind(this)} />
          </div>

          <div className='right'>
            <RightHeader
              togglePlaylistMode={() => this.togglePlaylistMode()}
              setTheme={this.setTheme.bind(this)}
              theme={this.state.theme}
            />
            <Chat insertReply={this.insertReply.bind(this)} movePreview={this.movePreview.bind(this)} />
            <PostArea ref={ref => (this.postarea = ref)} theme={this.state.theme} />
            <MessagePreview ref={ref => (this.preview = ref)} />
          </div>
          <Snackbar />
        </div>
      </MuiThemeProvider>
    );
  }
}
