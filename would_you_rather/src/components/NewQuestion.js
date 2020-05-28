import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends React.Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { dispatch, authedUser } = this.props;
    const { optionOneText, optionTwoText } = this.state;
    e.preventDefault();
    dispatch(
      handleAddQuestion({ optionOneText, optionTwoText, author: authedUser })
    );
    this.setState({ optionOneText: '', optionTwoText: '' });
  };

  render() {
    return (
      <div className='question-new'>
        <h1> Would you rather?</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            name='optionOneText'
            value={this.state.optionOne}
          />
          <input
            onChange={this.onChange}
            name='optionTwoText'
            value={this.state.optionTwo}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(NewQuestion);
