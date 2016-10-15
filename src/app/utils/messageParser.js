'use strict';

import {
  LINK_REGEXP,
  REPLY_REGEXP,
  MARKUP_STRONG_REGEXP,
  MARKUP_EMPH_REGEXP,
  MARKUP_STRIKE_REGEXP,
  MARKUP_SPOILER_REGEXP,
  MARKUP_QUOTE_REGEXP,
  YOUTUBE_REGEXP
} from '../constants';

export function parseMarkup(text) {
  return text
    .replace(MARKUP_QUOTE_REGEXP, '<span class="quote">$1</span>')
    .replace(MARKUP_STRONG_REGEXP, '<span class="strong">$1</span>')
    .replace(MARKUP_EMPH_REGEXP, '<span class="emph">$1</span>')
    .replace(MARKUP_STRIKE_REGEXP, '<span class="strike">$1</span>')
    .replace(MARKUP_SPOILER_REGEXP, '<span class="spoiler">$1</span>');
}

export function parseReplies(text) {
  return text.replace(REPLY_REGEXP, '<a href="" data-reply="$1">$&</a>');
}

export function parseLinks(text) {
  return text.replace(LINK_REGEXP, '<a href="$&" target="_blank">$&</a>');
}

export function replaceYoutubeLink(text, title) {
  let i = 0;
  return text.replace(new RegExp(YOUTUBE_REGEXP, 'g'), (match) => {
    i += 1;
    return (i === 2) ? title : match;
  });
}
