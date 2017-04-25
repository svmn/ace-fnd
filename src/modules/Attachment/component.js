'use strict';

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import { fullWhite, lightBlack } from 'material-ui/styles/colors';
import isMobile from 'is-mobile';
import {
  getYoutubeThumbnail
} from '../../utils/youtube';
import {
  getExtWebmThumbnail
} from '../../utils';

export default class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedImage: false,
      loading: false,
      expandedYoutube: false,
      expandedWebm: false
    };
  }

  toggleExpandImage() {
    this.setState({
      expandedImage: !this.state.expandedImage,
      loading: !this.state.expandedImage
    });
  }

  hideSpinner() {
    this.setState({
      loading: false
    });
  }

  toggleExpandYoutube() {
    this.setState({
      expandedYoutube: !this.state.expandedYoutube
    });
  }

  toggleExpandWebm(e) {
    e.preventDefault();
    this.setState({
      expandedWebm: !this.state.expandedWebm
    });
  }

  render() {
    const { message, youtubeVideoId, youtubeTimestamp, extWebmUrl } = this.props;
    const { picture } = message;


    if (picture) {
      const progress = !this.state.loading ? null : (
        <CircularProgress
          size={48}
          thickness={3}
          color={fullWhite}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-34px 0 0 -24px',
            pointerEvents: 'none',
            backgroundColor: lightBlack,
            borderRadius: '50%'
          }}
        />
      );
      const fileExtenstion = picture.name.split('.').pop().toUpperCase();
      return (
        <div className={cx('attachment', { expanded: this.state.expandedImage && !this.state.loading })}>
          <img
            src={`https://tuzach.in${this.state.expandedImage ? picture.imgurl : picture.thumburl}`}
            alt={message.id}
            style={{
              height: this.state.expandedImage ? null : `${picture.thumbh}px`,
              width: this.state.expandedImage ? null : `${picture.thumbw}px`
            }}
            onClick={this.toggleExpandImage.bind(this)}
            onLoad={this.hideSpinner.bind(this)}
          />
          <div className='fileinfo'>{fileExtenstion} {picture.filedata}</div>
          {progress}
        </div>
      );
    }

    if (!picture && youtubeVideoId && !this.state.expandedYoutube) {
      const thumbnailUrl = getYoutubeThumbnail(youtubeVideoId);
      const icon = (
        <IconButton
          iconClassName='fa fa-youtube-play'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-24px 0 0 -24px',
            borderRadius: '50%',
            backgroundColor: lightBlack
          }}
          iconStyle={{
            color: fullWhite
          }}
          onTouchTap={isMobile() ? () => console.log('unsupported') : this.toggleExpandYoutube.bind(this)}
        />
      );

      if (isMobile()) {
        const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
        return (
          <div className='attachment'>
            <a href={videoUrl} target='_blank'>
              <img
                alt='Youtube video'
                src={thumbnailUrl}
                style={{
                  height: '150px'
                }}
              />
              {icon}
            </a>
          </div>
        );
      }

      return (
        <div className='attachment'>
          <img
            alt='Youtube video'
            src={thumbnailUrl}
            style={{
              height: '150px'
            }}
            onTouchTap={this.toggleExpandYoutube.bind(this)}
          />
          {icon}
        </div>
      );
    }

    if (this.state.expandedYoutube) {
      let youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`;
      if (youtubeTimestamp) {
        youtubeUrl += `&start=${youtubeTimestamp}`;
      }
      return (
        <div className='attachment'>
          <iframe
            width='560'
            height='315'
            src={youtubeUrl}
            frameBorder='0'
            allowFullScreen
            style={{
              display: 'block'
            }}
          />
          <a
            href=''
            onClick={e => e.preventDefault()}
            onTouchTap={this.toggleExpandYoutube.bind(this)}
          >
            Закрыть
          </a>
        </div>
      );
    }

    if (!picture && !youtubeVideoId && extWebmUrl && !this.state.expandedWebm) {
      const thumbnailUrl = getExtWebmThumbnail(extWebmUrl);
      const icon = (
        <IconButton
          iconClassName='fa fa-file-video-o'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-24px 0 0 -24px',
            borderRadius: '50%',
            backgroundColor: lightBlack
          }}
          iconStyle={{
            color: fullWhite
          }}
          onTouchTap={this.toggleExpandWebm.bind(this)}
        />
      );

      return (
        <div className='attachment'>
          <img
            alt='webm'
            src={thumbnailUrl}
            style={{
              height: '95px'
            }}
            onTouchTap={this.toggleExpandWebm.bind(this)}
          />
          {icon}
        </div>
      );
    }

    if (this.state.expandedWebm) {
      return (
        <div className={cx('attachment', { expanded: this.state.expandedWebm })}>
          <video
            controls
            autoPlay
          >
            <source src={extWebmUrl} type='video/webm' />
          </video>
          <a
            href=''
            onClick={this.toggleExpandWebm.bind(this)}
          >
            Закрыть
          </a>
        </div>
      );
    }

    return null;
  }
}

Attachment.propTypes = {
  message: PropTypes.object.isRequired,
  youtubeVideoId: PropTypes.string,
  youtubeTimestamp: PropTypes.string,
  extWebmUrl: PropTypes.string
};
