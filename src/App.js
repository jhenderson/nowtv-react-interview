import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import {fetchChatLog, fetchMembers} from './service';

import './App.css';

// This could go into another file like constants.js or something
const fallbackAvatar = 'http://dummyimage.com/100x100.jpg/000000/ffffff';

class App extends Component {
  componentWillMount() {
    this.props.fetchChatLog();
    this.props.fetchMembers();
  }

  getMemberDetails(userId) {
    return this.props.members.find((member) => member.id === userId);
  }

  messagesSortedByTime() {
    return this.props.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui minimal comments">
          {this.messagesSortedByTime().map(({userId, message, timestamp}, index) => {
            let member = this.getMemberDetails(userId);
            if (!member) return null;
            let author = `${member.firstName} ${member.lastName}`;
            return (
              <div key={index} className="comment">
                <span className="avatar">
                  <img src={member.avatar || fallbackAvatar} alt={author}/>
                </span>
                <div className="content">
                  <span className="author">{author}</span>
                  <div className="metadata">
                    <div className="date">
                      <Moment fromNow>{timestamp}</Moment>
                    </div>
                  </div>
                  <div className="text">
                    <p data-popup={member.email}>{message}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  messages: PropTypes.array,
  members: PropTypes.array
};

const mapStateToProps = state => {
  return {
    messages: state.messages,
    members: state.members
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({fetchChatLog, fetchMembers}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
