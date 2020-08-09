import React from 'react';
import gql from 'graphql-tag';

export const GET_LINK = gql`
  query link($shortcut: String!, $twlSecret: String!) {
    link(shortcut: $shortcut, twlSecret: $twlSecret) {
      url,
      shortcut,
      dateTimeCreated,
      twlSecret,
      totalClicks,
      chart {
          title,
          labels,
          values
      }
    }
  }
`

export const CREATE_LINK = gql`
  mutation createLink($url: String!) {
    createLink(url: $url) {
      url,
      shortcut,
      dateTimeCreated,
      twlSecret,
      totalClicks,
      chart {
          title,
          labels,
          values
      }
    }
  }
`

export const TRACK_CLICK = gql`
  mutation trackClick($shortcut: String!) {
    trackClick(shortcut: $shortcut) {
      url,
      shortcut,
      dateTimeCreated
    }
  }
`

export const GET_LINKS = gql`
  query {
    links {
        url,
        shortcut,
        dateTimeCreated
    }
  }
`
