'use strict';

import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach';
import classnames from 'classnames';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {
  padTime,
  getExtWebmUrl
} from '../utils';
import * as parser from '../utils/messageParser';
import * as ytUtils from '../utils/youtube';
import Avatar from './avatar';
import Attachment from './attachment';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedText: false,
      showReadMore: false,
      youtubeTitle: null,
      showPopover: false,
      popoverAnchorEl: null
    };
    this.isYoutube = false;
  }

  componentDidMount() {
    this.attachReplyHandler();

    if (this.messageTextRef.scrollHeight > this.messageTextRef.clientHeight) {
      this.setState({
        showReadMore: true
      });
    }

    if (this.isYoutube) {
      ytUtils.getYoutubeTitle(this.youtubeVideoId)
        .then(title => this.setState({ youtubeTitle: title }));
    }
  }

  componentDidUpdate() {
    this.attachReplyHandler();
  }

  componentWillUnmount() {
    this.detachReplyHandler();
  }

  attachReplyHandler() {
    const replyElements = this.messageTextRef.querySelectorAll('a[data-reply]');
    // replyElements is Nodelist
    forEach(replyElements, el => el.addEventListener('click', (e) => this.replyHandler(e)));
    forEach(replyElements, el => el.addEventListener('mouseenter',
      (e) => this.props.showPreview(e.target.dataset.reply)));
    forEach(replyElements, el => el.addEventListener('mouseleave', () => this.props.hidePreview()));
    forEach(replyElements, el => el.addEventListener('mousemove', (e) => this.props.movePreview(e)));
  }

  detachReplyHandler() {
    const replyElements = this.messageTextRef.querySelectorAll('a[data-reply]');
    forEach(replyElements, el => el.removeEventListener('click', (e) => this.replyHandler(e)));
    forEach(replyElements, el => el.addEventListener('mouseenter',
      (e) => this.props.showPreview(e.target.dataset.reply)));
    forEach(replyElements, el => el.addEventListener('mouseleave', () => this.props.hidePreview()));
    forEach(replyElements, el => el.addEventListener('mousemove', (e) => this.props.movePreview(e)));
  }

  replyHandler(e) {
    e.preventDefault();
    this.props.gotoMessage(e.target.dataset.reply);
  }

  toggleExpandText() {
    this.setState({
      expandedText: !this.state.expandedText
    });
  }

  showPopover(e) {
    this.setState({
      showPopover: true,
      popoverAnchorEl: e.currentTarget
    });
  }

  hidePopover() {
    this.setState({
      showPopover: false,
      popoverAnchorEl: null
    });
  }

  render() {
    const { message, replies } = this.props;
    let { text } = message;
    const { picture } = message;
    const time = new Date(message.time);
    const formattedTime = `${padTime(time.getHours())}:${padTime(time.getMinutes())}:${padTime(time.getSeconds())}`;
    this.isYoutube = ytUtils.isYoutube(text) && !picture;
    this.youtubeVideoId = ytUtils.getYoutubeId(text);
    const youtubeTimestamp = ytUtils.getYoutubeTimestamp(text);
    const extWebmUrl = getExtWebmUrl(text);

    const readMoreBlock = !this.state.showReadMore ? null : (
      <a href='' className='read-more' onClick={e => e.preventDefault()} onTouchTap={this.toggleExpandText.bind(this)} >
        {this.state.expandedText ? 'Скрыть' : 'Читать полностью'}
      </a>
    );

    const repliesBlock = !replies ? null : (
      <div className='replies'>
        Ответы:{
          replies.map((reply, i) =>
            <a
              href=''
              key={i}
              onClick={e => e.preventDefault()}
              onTouchTap={() => this.props.gotoMessage(reply)}
              onMouseEnter={() => this.props.showPreview(reply)}
              onMouseMove={e => this.props.movePreview(e)}
              onMouseLeave={() => this.props.hidePreview()}
            >
              >>{reply}
            </a>
          )
        }
      </div>
    );

    const popover = (
      <Popover
        open={this.state.showPopover}
        anchorEl={this.state.popoverAnchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        canAutoPostion
        onRequestClose={this.hidePopover.bind(this)}
      >
        <Menu
          onItemTouchTap={e=> {
            e.preventDefault();
            this.hidePopover();
          }}
        >
          <MenuItem
            primaryText='Ответить'
            leftIcon={<FontIcon className='fa fa-at' />}
            onTouchTap={() => this.props.insertReply(`@${message.id}`)}
          />
          <MenuItem
            primaryText='Игнор'
            leftIcon={<FontIcon className='fa fa-minus-circle' />}
          />
          <MenuItem
            primaryText='Личное cообщение'
            leftIcon={<FontIcon className='fa fa-envelope' />}
            onTouchTap={() => this.props.insertReply(`#!${message.id}`)}
          />
          {/*
          <MenuItem
            primaryText='Delete'
            leftIcon={<FontIcon className='fa fa-trash' />}
          />
          <MenuItem
            primaryText='Force delete' leftIcon={<FontIcon className='fa fa-eraser' />}
          />
          <MenuItem
            primaryText='Ban'
            leftIcon={<FontIcon className='fa fa-ban' />}
          />
          <MenuItem
            primaryText='IP'
            leftIcon={<FontIcon className='fa fa-search' />}
          />
          */}
        </Menu>
      </Popover>
    );

    text = parser.parseMarkup(text);
    text = parser.parseReplies(text);
    text = parser.parseLinks(text);
    if (this.state.youtubeTitle) {
      text = parser.replaceYoutubeLink(text, this.state.youtubeTitle);
    }

    return (
      <div className={classnames('message', { selected: this.props.selected })} ref={ref => (this.ref = ref)}>
        <div className='avatar' onTouchTap={this.showPopover.bind(this)}>
          <Avatar userId={message.user_id} />
          {popover}
        </div>
        <div className='time'>{formattedTime}</div>
        <div className='id'>
          <span onTouchTap={() => this.props.insertReply(`@${message.id}`)}>#{message.id}</span>
        </div>
        <div
          className='text'
          ref={ref => (this.messageTextRef = ref)}
          style={{
            maxHeight: this.state.expandedText ? 'none' : null
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {readMoreBlock}
        <Attachment
          message={message}
          youtubeVideoId={this.youtubeVideoId}
          youtubeTimestamp={youtubeTimestamp}
          extWebmUrl={extWebmUrl}
        />
        {repliesBlock}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  replies: PropTypes.array,
  insertReply: PropTypes.func,
  gotoMessage: PropTypes.func,
  showPreview: PropTypes.func,
  movePreview: PropTypes.func,
  hidePreview: PropTypes.func,
  selected: PropTypes.bool
};

export default Message;
