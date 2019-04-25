import React, { PropTypes, Component } from 'react';
import BaseSpeechRecognition from './baseSpeechRecognition';

// const propTypes = {
//   // Props injected by SpeechRecognition
//   transcript: PropTypes.string,
//   resetTranscript: PropTypes.func,
//   browserSupportsSpeechRecognition: PropTypes.bool
// }

class SpeechRecognition extends Component {
  componentDidMount() {
    this.props.recognition.lang = 'en';
  }

  render() {
    const {
      startListening,
      stopListening,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
      </div>
    );
  }
}
const options = {
  autoStart: false
};
//Dictaphone.propTypes = propTypes
export default BaseSpeechRecognition(options)(SpeechRecognition);
