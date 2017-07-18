import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

export function reducer(state = { messages: [], members: [] }, action) {
  switch (action.type) {
      case 'MESSAGES_LOADING_FULFILLED':
        return {...state, messages: action.payload};
      case 'MEMBERS_LOADING_FULFILLED':
          return {...state, members: action.payload};
      default:
        return state
  }
}

export const store = createStore(reducer, applyMiddleware(createLogger(), promiseMiddleware()));