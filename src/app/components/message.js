'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MessageMenu from './messageMenu';
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

  shouldComponentUpdate(nextProps, nextState) {
    const { props } = this;
    return (
      this.state !== nextState ||
      props.selected !== nextProps.selected ||
      (props.replies && props.replies.length) !== (nextProps.replies && nextProps.replies.length)
    );
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
    const { message, replies, selected, personal } = this.props;
    let { text } = message;
    const { id, user_id: userId, picture, controls, avatar } = message;
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

    text = parser.parseMarkup(text);
    text = parser.parseReplies(
      text,
      this.props.gotoMessage,
      this.props.showPreview,
      this.props.movePreview,
      this.props.hidePreview
    );
    if (this.state.youtubeTitle) {
      text = parser.replaceYoutubeLink(text, this.state.youtubeTitle);
    }
    text = parser.parseLinks(text);

    return (
      <div className={classnames('message', { selected, personal })} ref={ref => (this.ref = ref)}>
        <div
          className='avatar'
          onTouchTap={e => {
            e.preventDefault();
            this.showPopover(e);
          }}
        >
          <Avatar userId={userId} image={avatar} />
          <MessageMenu
            open={this.state.showPopover}
            anchorEl={this.state.popoverAnchorEl}
            hidePopover={this.hidePopover.bind(this)}
            controls={controls}
            messageId={id}
            chatControl={this.props.chatControl}
            insertReply={this.props.insertReply}
            ignoreAdd={this.props.ignoreAdd}
          />
        </div>
        <div className='time'>{formattedTime}</div>
        <div className='id-wrapper'>
          <span
            className='id'
            onTouchTap={() => this.props.insertReply((personal ? '!#' : '@') + id)}
          >
            #{id}
          </span>
          {personal ? <span className='personal-flag'> [Личное сообщение]</span> : null}
        </div>
        <div
          className='text'
          ref={ref => (this.messageTextRef = ref)}
          style={{
            maxHeight: this.state.expandedText ? 'none' : null
          }}
        >
          {text}
        </div>
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
  ignoreAdd: PropTypes.func,
  chatControl: PropTypes.func,
  selected: PropTypes.bool,
  personal: PropTypes.bool
};

export default Message;
