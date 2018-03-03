import * as types from './actionTypes';

import { URL } from '../config/url';

import api from '../utils/api';

export function fetchBookshelves() {
  return dispatch => {
    dispatch({ type: types.REQUEST_BOOKSHELVES });
    return api
        .get(URL.bookshelves)
        .then(res => res.ok ? res.json() : [])
        .then(data => dispatch({
          type: types.RECEIVE_BOOKSHELVES,
          data
        }));
  };
}
