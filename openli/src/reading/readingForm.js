import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectors as readingSelector } from './reducer';

class ReadingForm extends Component {
  render() {
    const words = this.props.words;
    return (
      <React.Fragment>
        {words.map(word => (
          <Word key={word.index} word={word} />
        ))}
      </React.Fragment>
    );
  }
}

function Word({ word }) {
  var style = {
    color: '#212121'
  };

  if (word.isRead) {
    style['color'] = '#4615b2';
  }

  if (word.isReading) {
    style['color'] = '#00a152';
  }

  const newLineRegularExpression = new RegExp('\n');

  if (newLineRegularExpression.test(word.afterWord)) {
    return (
      <React.Fragment>
        <span style={style}>{word.viewWord}</span>
        <br />
      </React.Fragment>
    );
  }
  return <span style={style}>{word.viewWord}</span>;
}

function mapStateToProps(state) {
  return {
    ...state,
    words: readingSelector.words(state)
  };
}

export default connect(mapStateToProps)(ReadingForm);
