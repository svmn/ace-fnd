'use strict';

import React, { Component, PropTypes } from 'react';
import { padTime } from '../utils';
import Avatar from './avatar';
import {
  LINK_REGEXP,
  REPLY_REGEXP,
  MARKUP_STRONG_REGEXP,
  MARKUP_EMPH_REGEXP,
  MARKUP_STRIKE_REGEXP,
  MARKUP_SPOILER_REGEXP
} from '../constants';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    this.attachReplyHandler();
  }

  componentWillUnmount() {
    this.detachReplyHandler();
  }

  attachReplyHandler() {
    const replyElements = this.ref.querySelectorAll('a[data-reply]');
    replyElements.forEach(el => el.addEventListener('click', (e) => this.replyHandler(e)));
  }

  detachReplyHandler() {
    const replyElements = this.ref.querySelectorAll('a[data-reply]');
    replyElements.forEach(el => el.removeEventListener('click', (e) => this.replyHandler(e)));
  }

  replyHandler(e) {
    e.preventDefault();
    this.gotoMessage(e.target.dataset.reply);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  gotoMessage(id) {
    console.log(id);
    console.log(this);
  }

  parseMarkup() {
    this.messageText = this.messageText
      .replace(MARKUP_STRONG_REGEXP, '<span class="strong">$1</span>')
      .replace(MARKUP_EMPH_REGEXP, '<span class="emph">$1</span>')
      .replace(MARKUP_STRIKE_REGEXP, '<span class="strike">$1</span>')
      .replace(MARKUP_SPOILER_REGEXP, '<span class="spoiler">$1</span>');
  }

  parseReplies() {
    this.messageText = this.messageText.replace(REPLY_REGEXP, '<a href="" data-reply="$1">$&</a>');
  }

  parseLinks() {
    this.messageText = this.messageText.replace(LINK_REGEXP, '<a href="$&" target="_blank">$&</a>');
  }

  render() {
    const { message } = this.props;
    const { picture } = message;
    this.messageText = message.text;
    const time = new Date(message.time);
    const formattedTime = `${padTime(time.getHours())}:${padTime(time.getMinutes())}:${padTime(time.getSeconds())}`;

    let attachment = null;

    if (picture) {
      attachment = (
        <div className='attachment'>
          <img
            src={`https://tuzach.in/${this.state.expanded ? picture.imgurl : picture.thumburl}`}
            alt={message.id}
            style={{
              height: this.state.expanded ? null : `${picture.thumbh}px`,
              width: this.state.expanded ? null : `${picture.thumbw}px`
            }}
            onTouchTap={() => this.toggleExpand()}
          />
        </div>
      );
    }

    this.parseMarkup();
    this.parseReplies();
    this.parseLinks();

    return (
      <div className='message'>
        <div className='avatar'>
          <Avatar userId={message.user_id} />
        </div>
        <div className='right'>
          <div className='time'>{formattedTime}</div>
        </div>
        <div className='id'>#{message.id}</div>
        <div
          className='text'
          ref={ref => (this.ref = ref)}
          dangerouslySetInnerHTML={{ __html: this.messageText }}
        />
        {attachment}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
