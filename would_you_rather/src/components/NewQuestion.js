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
        <h1 className='text-center'> Would you rather?</h1>
        <form
          className='col-md-6 mx-auto text-center pt-3'
          onSubmit={this.onSubmit}
        >
          <div className='form-group'>
            <label htmlFor='optionOne'>Option 1</label>
            <input
              className='form-control'
              type='text'
              onChange={this.onChange}
              name='optionOneText'
              id='optionOne'
              value={this.state.optionOneText}
            />
          </div>
          <div className='form-group'>
            <label for='optionTwo'>Option 2</label>
            <input
              className='form-control'
              onChange={this.onChange}
              name='optionTwoText'
              id='optionTwo'
              value={this.state.optionTwoText}
            />
          </div>
          <button
            disabled={Object.values(this.state).some((t) => t === '')}
            className='btn btn-primary'
          >
            Create new poll
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(NewQuestion);
