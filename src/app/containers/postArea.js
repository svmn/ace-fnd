'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CircularProgress from 'material-ui/CircularProgress';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { fullWhite, minBlack } from 'material-ui/styles/colors';
import isMobile from 'is-mobile';
import { chatSend } from '../actions/chat';
import { fixMimeType } from '../utils';

class PostArea extends Component {
  constructor(props) {
    super(props);
    const defaultPostingMode = isMobile() ? 'natural' : 'inverse';
    this.state = {
      showSettings: false,
      mode: localStorage.postingMode || defaultPostingMode,
      message: '',
      preview: null
    };
    this.file = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processing === false && this.props.processing === true) {
      this.unsetFile();
    }
  }

  setMessage(message) {
    this.setState({ message });
  }

  setFile(file) {
    console.log(file);
    this.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (isMobile()) {
        this.setState({ preview: fixMimeType(file, e.target.result) });
      } else {
        this.setState({ preview: e.target.result });
      }
    };
  }

  unsetFile() {
    this.file = null;
    this.fileInput.value = '';
    this.setState({ preview: null });
  }

  showSettings() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ showSettings: true }), 1000);
  }

  hideSettings() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ showSettings: false }), 500);
  }

  send() {
    this.props.chatSend(this.state.message, this.file);
    this.setState({ message: '' });
  }

  insertReply(reply) {
    if (!this.state.message || this.state.message.slice(-1) === '\n') {
      this.setState({ message: `${this.state.message}${reply} ` });
    } else {
      this.setState({ message: `${this.state.message} ${reply} ` });
    }
    // setTimeout to ignore click on popover
    setTimeout(() => this.textarea.focus(), 0);
  }

  render() {
    const { processing } = this.props;
    const fileInput = (
      <input
        ref={ref => (this.fileInput = ref)}
        type='file'
        onChange={(e) => this.setFile(e.target.files[0])}
        style={{
          position: 'absolute',
          top: '8px',
          right: '0',
          width: this.context.muiTheme.spacing.iconSize * 2,
          height: this.context.muiTheme.spacing.iconSize * 2,
          opacity: 0,
          cursor: 'pointer'
        }}
      />
    );
    const progress = processing ? (
      <CircularProgress
        size={42}
        thickness={3}
        color='white'
        style={{
          position: 'absolute',
          top: '29px',
          left: '29px',
          pointerEvents: 'none'
        }}
      />
    ) : null;

    const preview = !this.state.preview ? null : (
      <Paper
        style={{
          height: '100px',
          width: '100px',
          position: 'absolute',
          top: '-108px',
          right: '12px',
          backgroundSize: 'cover',
          backgroundImage: `url('${this.state.preview}')`,
          textAlign: 'center'
        }}

      >
        <IconButton
          style={{
            marginTop: '26px',
            backgroundColor: minBlack,
            borderRadius: '50%'
          }}
          iconStyle={{
            color: fullWhite
          }}
          onTouchTap={this.unsetFile.bind(this)}
        >
          <CloseIcon />
        </IconButton>
        {progress}
      </Paper>
    );

    const Settings = () => (
      <Paper
        style={{
          height: '125px',
          width: '310px',
          position: 'absolute',
          top: '-133px',
          right: '12px',
          padding: '16px'
        }}
        zDepth={2}
        onMouseEnter={this.showSettings.bind(this)}
        onMouseLeave={this.hideSettings.bind(this)}
      >
        <RadioButtonGroup
          name='mode'
          valueSelected={this.state.mode}
          onChange={(e, value) => {
            this.setState({ mode: value });
            localStorage.postingMode = value;
          }}
        >
          <RadioButton
            value='natural'
            label={
              <div>
                <div><b>Ctrl + Enter</b> - Отправка сообщения</div>
                <div><b>Enter</b> - Перенос строки</div>
              </div>
            }
          />
          <RadioButton
            value='inverse'
            label={
              <div>
                <div><b>Enter</b> - Отправка сообщения</div>
                <div><b>Shift + Enter</b> - Перенос строки</div>
              </div>
            }
          />
        </RadioButtonGroup>
      </Paper>
    );

    // Wrap icons in func to update on theme switching
    const IconContainer = () => (
      <div className='icon-container'>
        <IconButton
          onTouchTap={() => this.send()}
          onMouseEnter={isMobile() ? null : this.showSettings.bind(this)}
          onMouseLeave={isMobile() ? null : this.hideSettings.bind(this)}
        >
          <SendIcon />
        </IconButton>
        <IconButton>
          <AddPhotoIcon />
        </IconButton>
      </div>
    );

    return (
      <div className='postarea bottom'>
        <TextArea
          rows={2}
          maxRows={8}
          placeholder='Сообщение'
          maxLength={2048}
          value={this.state.message}
          onChange={e => this.setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (this.state.mode === 'natural') {
                if (e.ctrlKey || e.metaKey) {
                  this.send();
                }
              }
              if (this.state.mode === 'inverse') {
                if (!e.shiftKey) {
                  e.preventDefault();
                  this.send();
                }
              }
            }
          }}
          ref={ref => (this.textarea = ref)}
        />
        <IconContainer />
        {fileInput}
        {preview}
        {
          this.state.showSettings ? <Settings /> : null
        }
      </div>
    );
  }
}

PostArea.propTypes = {
  message: PropTypes.string,
  preview: PropTypes.string,
  processing: PropTypes.bool,
  chatSend: PropTypes.func.isRequired
};
PostArea.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

const mapStatetoProps = (state) => state.postarea;
const mapDispatchToProps = (dispatch) => bindActionCreators({ chatSend }, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps, null, { withRef: true })(PostArea);
