import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';

import { getReadingMessage } from '../../queryHelper';
import { selectors as readingSelector } from './../reducer';
import { selectors as speechRecognitionSelector } from '../../speechRecognition/reducer';
import { getTooltipWordIndex } from '../common';
import { readingMessageUpdated } from '../actions';

class Reading extends Component {
  async componentDidMount() {
    const {
      match: { params }
    } = this.props;

    const message = await getReadingMessage(params.id);
    this.props.dispatch(readingMessageUpdated(message.content));
  }

  render() {
    const words = this.props.words;
    const interimTranscript = this.props.interimTranscript;
    const finalTranscript = this.props.finalTranscript;
    const toolTipWordIndex = getTooltipWordIndex(this.props.words);

    return (
      <React.Fragment>
        {words.map(word => (
          <Word
            key={word.index}
            word={word}
            toolTipWordIndex={toolTipWordIndex}
            interimTranscript={interimTranscript}
            finalTranscript={finalTranscript}
          />
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

function Word({ word, toolTipWordIndex, interimTranscript, finalTranscript }) {
  const newLineRegularExpression = new RegExp('\n');
  var open = true;

  return (
    <React.Fragment>
      {word.index === toolTipWordIndex ? (
        <Tooltip
          title={
            <React.Fragment>
              <span color='fff'>{finalTranscript}</span>
              <br />
              <span color='000'>{interimTranscript}</span>
            </React.Fragment>
          }
          open={open}
          placement='top-start'
        >
          <WordInner word={word} />
        </Tooltip>
      ) : (
        <WordInner word={word} />
      )}
    </React.Fragment>
  );
}

function WordInner({ word }) {
  var style = {
    color: '#212121'
  };

  if (word.isInterimRecognised) {
    style['color'] = '#00a152';
  }

  if (word.isFinalRecognised) {
    style['color'] = '#4615b2';
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

export default withRouter(connect(mapStateToProps)(Reading));
