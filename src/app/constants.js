'use strict';

export const LINK_REGEXP = /https?:\/\/\S+/g;
export const REPLY_REGEXP = /@([0-9]+)/g;
export const MARKUP_STRONG_REGEXP = /\*\*(.+?)\*\*/g;
export const MARKUP_EMPH_REGEXP = /\*(.+?)\*/g;
export const MARKUP_STRIKE_REGEXP = /\[s\](.+?)\[\/s\]/g;
export const MARKUP_SPOILER_REGEXP = /%%(.+?)%%/g;
export const MARKUP_QUOTE_REGEXP = /(>.+|&gt;.+)/g;
