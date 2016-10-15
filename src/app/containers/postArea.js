'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CircularProgress from 'material-ui/CircularProgress';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import isMobile from 'is-mobile';
import * as actions from '../actions/postarea';

class PostArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      mode: localStorage.postingMode || 'inverse'
    };
  }

  focus() {
    this.textarea.focus();
  }

  showSettings() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ showSettings: true }), 500);
  }

  hideSettings() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ showSettings: false }), 500);
  }

  render() {
    const { message, preview, processing } = this.props;
    const FileInput = () => (
      <input
        type='file'
        onChange={(e) => this.props.postareaSetFile(e.target.files[0])}
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

    const Preview = () => {
      if (preview) {
        return (
          <Paper
            style={{
              height: '100px',
              width: '100px',
              position: 'absolute',
              top: '-108px',
              right: '12px',
              backgroundSize: 'cover',
              backgroundImage: `url('${preview}')`,
              textAlign: 'center'
            }}

          >
            <IconButton
              style={{
                marginTop: '26px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '50%'
              }}
              iconStyle={{
                color: '#FFF'
              }}
              onTouchTap={() => this.props.postareaResetFile()}
            >
              <CloseIcon />
            </IconButton>
            {progress}
          </Paper>
        );
      }
      return null;
    };

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
          onTouchTap={() => this.props.postareaSend()}
          onMouseEnter={isMobile() ? null : this.showSettings.bind(this)}
          onMouseLeave={isMobile() ? null : this.hideSettings.bind(this)}
        >
          <SendIcon />
        </IconButton>
        <IconButton>
          <AddPhotoIcon />
        </IconButton>
        <FileInput />
      </div>
    );

    return (
      <div className='postarea bottom'>
        <TextArea
          rows={2}
          maxRows={8}
          placeholder='Сообщение'
          maxLength={2048}
          value={message}
          onChange={(e) => this.props.postareaSetMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (this.state.mode === 'natural') {
                if (e.ctrlKey || e.metaKey) {
                  this.props.postareaSend();
                }
              }
              if (this.state.mode === 'inverse') {
                if (!e.shiftKey) {
                  e.preventDefault();
                  this.props.postareaSend();
                }
              }
            }
          }}
          ref={ref => (this.textarea = ref)}
        />
        <IconContainer />
        <Preview />
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
  postareaSetMessage: PropTypes.func.isRequired,
  postareaSetFile: PropTypes.func.isRequired,
  postareaResetFile: PropTypes.func.isRequired,
  postareaSend: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => state.postarea;
export default connect(mapStatetoProps, actions, null, { withRef: true })(PostArea);
