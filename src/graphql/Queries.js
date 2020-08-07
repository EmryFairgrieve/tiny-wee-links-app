import React from 'react';
import gql from 'graphql-tag';

export const GET_LINK = gql`
  query link($shortcut: String!, $twlSecret: String!) {
    link(shortcut: $shortcut, twlSecret: $twlSecret) {
      url
      expiryDate
      secret
    }
  }
`

export const CREATE_LINK = gql`
  mutation createLink($url: String!) {
    createLink(url: $url) {
      shortcut,
      url,
      expiryDate,
      secret
    }
  }
`

export const TRACK_CLICK = gql`
  mutation trackClick($shortcut: String!) {
    trackClick(shortcut: $shortcut) {
      url
    }
  }
`
