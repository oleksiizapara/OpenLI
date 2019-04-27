import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectors as readingSelector } from './reducer';
import { selectors as speechRecognitionSelector } from '../speechRecognition/reducer';

class ReadingForm extends Component {
  render() {
    const words = this.props.words;
    return (
      <React.Fragment>
        {words.map(word => (
          <Word key={word.index} word={word} />
        ))}

        <br />
        <br />
        <p>Final Transcript : {this.props.finalTranscript}</p>
        <br />
        <p>Interim Transcript : {this.props.interimTranscript}</p>
      </React.Fragment>
    );
  }
}

function Word({ word }) {
  var style = {
    color: '#212121'
  };

  if (word.isFinalRecognised) {
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
    words: readingSelector.words(state),
    finalTranscript: speechRecognitionSelector.finalTranscript(state),
    interimTranscript: speechRecognitionSelector.interimTranscript(state)
  };
}

export default connect(mapStateToProps)(ReadingForm);
