import React from 'react';
import { connect } from 'react-redux';
import { searchQuestions } from '../actions/searchString';

class Nav extends React.Component {
  onChange = (e) => {
    e.preventDefault();
    this.props.dispatch(searchQuestions(e.target.value));
  };

  render() {
    return (
      <nav>
        <div className='nav-left'>
          <button>Questions</button>
          <button>Leaderboard</button>
          {/*FIXME: fix search placeholder*/}
          <input
            onChange={this.onChange}
            placeholder='Search questions'
          ></input>
        </div>
        <div className='nav-right'>{this.props.authedUser}</div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser, searchString }) => ({
  authedUser,
  searchString,
});

export default connect(mapStateToProps)(Nav);
