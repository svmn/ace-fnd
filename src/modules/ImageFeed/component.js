'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          feed.map(post => (
            <Paper key={post} style={{ margin: '10px' }} >
              <img src={post} alt={post} />
            </Paper>
          ))
        }
      </Feed>
    );
  }
}

ImageFeed.propTypes = {
  feed: PropTypes.array.isRequired,
  start: PropTypes.func.isRequired
};
