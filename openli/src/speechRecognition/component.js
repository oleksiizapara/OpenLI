import React, { PropTypes, Component } from 'react';
import BaseSpeechRecognition from './baseSpeechRecognition';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

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
      abortListening,
      listening,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    if (listening) {
      return (
        <React.Fragment>
          <IconButton color='inherit' onClick={stopListening}>
            <Icon>pause_circle_filled</Icon>
          </IconButton>
          <IconButton color='inherit' onClick={abortListening}>
            <Icon>cancel</Icon>
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <IconButton color='inherit' onClick={startListening}>
            <Icon>play_circle_filled</Icon>
          </IconButton>
          <IconButton color='inherit' onClick={abortListening}>
            <Icon>cancel</Icon>
          </IconButton>
        </React.Fragment>
      );
    }
  }
}
const options = {
  autoStart: false
};
//Dictaphone.propTypes = propTypes
export default BaseSpeechRecognition(options)(SpeechRecognition);
