import * as types from '../actions/actionTypes';

const INITIAL_STATE = { books: [], loading: false };

export default function reducer(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case types.REQUEST_BOOKS:
      return { ...state, loading: true };
    case types.RECEIVE_BOOKS:
      return { books: action.data, loading: false };
    default:
      return state;
  }
}
