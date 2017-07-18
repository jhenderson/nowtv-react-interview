import {getMessages, getMembers} from './data';

export function fetchChatLog() {
  return {
    type: 'MESSAGES_LOADING',
    payload: getMessages()
  };
}

export function fetchMembers() {
  return {
    type: 'MEMBERS_LOADING',
    payload: getMembers()
  };
}
