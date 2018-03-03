import * as types from '../actions/actionTypes';

const INITIAL_STATE = { shelves: [], loading: false };

export default function reducer(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case types.REQUEST_BOOKSHELVES:
      return { ...state, loading: true };
    case types.RECEIVE_BOOKSHELVES:
      return { shelves: action.data, loading: false };
    default:
      return state;
  }
}
