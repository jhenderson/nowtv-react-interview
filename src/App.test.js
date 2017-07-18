import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

const fetchChatLog = () => {};
const fetchMembers = () => {};

const members = [
  { "id": "98", "firstName": "Aaron", "lastName": "Williams" },
  { "id": "99", "firstName": "Victor", "lastName": "Warren", "email": "vwarren9@t-online.de" }
];

const messages = [
  { id: '1', userId: '98', message: 'foo', timestamp: '2016-02-09T04:27:38Z' },
  { id: '2', userId: '99', message: 'bar', timestamp: '2017-02-09T04:27:38Z' }
];

describe('<App />', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App.WrappedComponent messages={messages}
                                          members={members}
                                          fetchChatLog={fetchChatLog}
                                          fetchMembers={fetchMembers} />, div);
  });

  it('should render a list of messages sorted by timestamp', () => {
    const component = shallow(<App.WrappedComponent messages={messages}
                                                    members={members}
                                                    fetchChatLog={fetchChatLog}
                                                    fetchMembers={fetchMembers} />);
    const comments = component.find('.comment');
    expect(comments).toHaveLength(2);

    const firstComment = comments.at(0).text();
    const secondComment = comments.at(1).text();

    // most recent message should be first
    expect(firstComment).toContain('bar');
    expect(secondComment).toContain('foo');

    expect(firstComment).toContain('Victor Warren');
    expect(secondComment).toContain('Aaron Williams');
  });
});
