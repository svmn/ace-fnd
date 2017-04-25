'use strict';

import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Component as Feed } from '../Feed';

export default class ImageFeed extends Component {
  componentDidMount() {
    this.props.start();
  }

  render() {
    const { feed } = this.props;
    return (
      <Feed>
        {
          feed.map((post, i) => (
            <Paper style={{ margin: '10px' }} key={post + (feed.length - i)} >
              <img
                src={post}
                alt={post}
                style={{
                  display: 'block',
                  maxWidth: '100%'
                }}
              />
            </Paper>
          ))
        }
      </Feed>
    );
  }
}

ImageFeed.propTypes = {
  feed: PropTypes.array.isRequired,
};
