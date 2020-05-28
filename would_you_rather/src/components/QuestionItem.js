import React from 'react';
import { connect } from 'react-redux';

class QuestionItem extends React.Component {
  onClick = (e, id) => {
    e.preventDefault();
    alert(`this is a redirect to /questions/:id - ${id}`);
  };

  render() {
    const { question, id } = this.props;
    return (
      <div className='question-item' onClick={(e) => this.onClick(e, id)}>
        {JSON.stringify(question)}
      </div>
    );
  }
}

const mapStateToProps = ({ questions }, { id }) => {
  const question = questions[id];
  return { question, id };
};

export default connect(mapStateToProps)(QuestionItem);
