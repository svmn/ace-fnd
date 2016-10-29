/* global window */
'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  showPreview,
  movePreview,
  hidePreview,
  ignoreAdd,
  chatControl
} from '../actions/chat';
import Message from '../components/message';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.messageRefs = {};
    this.state = {
      selectedMessageId: null
    };
    this.autoscroll = true;
    this.inactive = false;
    this.defaultTitle = document.title;
    this.unreadPosts = 0;
  }

  componentDidMount() {
    window.addEventListener('blur', () => (this.inactive = true));
    window.addEventListener('focus', () => {
      this.inactive = false;
      this.unreadPosts = 0;
      document.title = this.defaultTitle;
    });
  }

  componentDidUpdate(prevProps) {
    setTimeout(() => this.scrollDown(), 0);
    if (this.inactive) {
      if (this.props.messages.length > prevProps.messages.length) {
        this.unreadPosts += 1;
        document.title = `[${this.unreadPosts}] ${this.defaultTitle}`;
      }
    }
  }

  onScroll() {
    const height = this.scrollbars.getScrollHeight() - this.scrollbars.getClientHeight();
    const diff = height - this.scrollbars.getScrollTop();
    this.autoscroll = (diff < 100);
  }

  gotoMessage(id) {
    const element = this.messageRefs[id].ref;

    const docViewTop = this.scrollbars.getScrollTop();
    const docViewBottom = docViewTop + this.scrollbars.getClientHeight();
    const elemTop = element.offsetTop;
    const elemBottom = elemTop + element.offsetHeight;
    const visible = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    if (!visible) {
      this.scrollbars.scrollTop(elemTop - 100);
    }
    this.setState({ selectedMessageId: id });
  }

  scrollDown() {
    if (this.autoscroll) {
      this.scrollbars.scrollToBottom();
    }
  }

  render() {
    const { messages, replies } = this.props;
    return (
      <div className='middle chat'>
        <Scrollbars
          autoHide
          className='scrollbar-container'
          onScroll={e => this.onScroll(e)}
          ref={ref => (this.scrollbars = ref)}
        >
          {
            messages.map(msg =>
              <Message
                message={msg}
                selected={this.state.selectedMessageId === msg.id}
                personal={msg.type === 'pvt'}
                key={msg.id}
                insertReply={this.props.insertReply}
                replies={replies[msg.id]}
                gotoMessage={this.gotoMessage.bind(this)}
                ref={ref => (this.messageRefs[msg.id] = ref)}
                showPreview={this.props.showPreview}
                movePreview={this.props.movePreview}
                hidePreview={this.props.hidePreview}
                ignoreAdd={this.props.ignoreAdd}
                chatControl={this.props.chatControl}
              />
            )
          }
        </Scrollbars>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  replies: PropTypes.object.isRequired,
  insertReply: PropTypes.func.isRequired,
  showPreview: PropTypes.func.isRequired,
  movePreview: PropTypes.func.isRequired,
  hidePreview: PropTypes.func.isRequired,
  ignoreAdd: PropTypes.func.isRequired,
  chatControl: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { messages, replies } = state.chat;
  return { messages, replies };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    showPreview,
    movePreview,
    hidePreview,
    ignoreAdd,
    chatControl
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
