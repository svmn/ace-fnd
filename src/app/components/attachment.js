'use strict';

import React, { Component, PropTypes } from 'react';
import isMobile from 'is-mobile';
import {
  getYoutubeThumbnail
} from '../utils/youtube';

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedImage: false,
      expandedYoutube: false
    };
  }

  toggleExpandImage() {
    this.setState({ expandedImage: !this.state.expandedImage });
  }

  toggleExpandText() {
    this.setState({
      expandedText: !this.state.expandedText
    });
  }

  toggleExpandYoutube() {
    this.setState({
      expandedYoutube: !this.state.expandedYoutube
    });
  }

  render() {
    const { message, youtubeVideoId, youtubeTimestamp } = this.props;
    const { picture } = message;

    if (picture) {
      return (
        <div className='attachment'>
          <img
            src={`https://tuzach.in/${this.state.expandedImage ? picture.imgurl : picture.thumburl}`}
            alt={message.id}
            style={{
              height: this.state.expandedImage ? null : `${picture.thumbh}px`,
              width: this.state.expandedImage ? null : `${picture.thumbw}px`
            }}
            onTouchTap={() => this.toggleExpandImage()}
          />
        </div>
      );
    }

    if (!picture && youtubeVideoId && !this.state.expandedYoutube) {
      const thumbnailUrl = getYoutubeThumbnail(youtubeVideoId);

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

    return null;
  }
}

Attachment.propTypes = {
  message: PropTypes.object.isRequired,
  youtubeVideoId: PropTypes.string,
  youtubeTimestamp: PropTypes.string
};

export default Attachment;
