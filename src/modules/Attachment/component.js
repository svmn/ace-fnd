'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Component as AttachmentImage } from '../AttachmentImage';
import { Component as AttachmentYoutube } from '../AttachmentYoutube';
import { Component as AttachmentWebm } from '../AttachmentWebm';

export default class Attachment extends Component {
  render() {
    const { message, youtubeVideoId, youtubeTimestamp, extWebmUrl } = this.props;
    const { picture } = message;

    let content = null;

    if (picture) {
      content = <AttachmentImage picture={picture} />;
    } else if (youtubeVideoId) {
      content = <AttachmentYoutube youtubeVideoId={youtubeVideoId} youtubeTimestamp={youtubeTimestamp} />;
    } else if (extWebmUrl) {
      content = <AttachmentWebm extWebmUrl={extWebmUrl} />;
    }

    if (content) {
      return <div className='attachment'>{content}</div>;
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
