import React, { PropTypes, Component } from 'react';
import SpeechRecognition from './SpeechRecognition';

// const propTypes = {
//   // Props injected by SpeechRecognition
//   transcript: PropTypes.string,
//   resetTranscript: PropTypes.func,
//   browserSupportsSpeechRecognition: PropTypes.bool
// }

class Dictaphone extends Component {
  componentDidMount() {
    this.props.recognition.lang = 'en';
  }

  render() {
    const {
      transcript,
      startListening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    const { interimTranscript, finalTranscript } = this.props.speechRecognition;

    return (
      <div>
        <button onClick={startListening}>start</button>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
        <br />
        <span>interimTranscript {interimTranscript}</span>
        <br />
        <span>finalTranscript {finalTranscript}</span>
      </div>
    );
  }
}
const options = {
  autoStart: false
};
//Dictaphone.propTypes = propTypes
export default SpeechRecognition(options)(Dictaphone);
