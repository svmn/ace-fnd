/* global window */
'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { postareaSetReply } from '../actions/postarea';
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

  reply(id) {
    this.props.postareaSetReply(id);
    this.props.focusTextarea();
  }

  gotoMessage(id) {
    const element = this.messageRefs[id].ref;
    this.scrollbars.scrollTop(element.offsetTop - 100);
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
                key={msg.id}
                reply={(id) => this.reply(id)}
                replies={replies[msg.id]}
                gotoMessage={this.gotoMessage.bind(this)}
                ref={ref => (this.messageRefs[msg.id] = ref)}
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
  postareaSetReply: PropTypes.func.isRequired,
  focusTextarea: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => {
  const { messages, replies, ignoreList } = state.chat;
  return { messages, replies, ignoreList };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ postareaSetReply }, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(Chat);
