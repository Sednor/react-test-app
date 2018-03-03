import * as types from './actionTypes';

import { URL } from '../config/url';

import api from '../utils/api';

export function fetchBooks() {
  return dispatch => {
    dispatch({ type: types.REQUEST_BOOKS });
    return api
        .get(URL.books)
        .then(res => res.ok ? res.json() : [])
        .then(data => dispatch({
          type: types.RECEIVE_BOOKS,
          data
        }));
  };
}
