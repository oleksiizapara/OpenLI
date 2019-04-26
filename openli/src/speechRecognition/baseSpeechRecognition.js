import React, { Component } from 'react';
import { connect } from 'react-redux';

import { listeningUpdated, interimUpdated, finalUpdated } from './actions';
import { selectors as speechSelector } from './reducer';
export default function baseSpeechRecognition(options) {
  const SpeechRecognitionInner = function(WrappedComponent) {
    const BrowserSpeechRecognition =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition ||
        window.oSpeechRecognition);
    const recognition = BrowserSpeechRecognition
      ? new BrowserSpeechRecognition()
      : null;
    const browserSupportsSpeechRecognition = recognition !== null;
    let listening;
    if (
      !browserSupportsSpeechRecognition ||
      (options && options.autoStart === false)
    ) {
      listening = false;
    } else {
      recognition.start();
      listening = true;
    }
    let pauseAfterDisconnect = false;

    class SpeechRecognitionContainer extends Component {
      constructor(props) {
        super(props);

        if (browserSupportsSpeechRecognition) {
          recognition.continuous = options.continuous !== false;
          recognition.interimResults = true;
          recognition.onresult = this.updateTranscript.bind(this);
          recognition.onend = this.onRecognitionDisconnect.bind(this);
        }

        this.state = {
          listening
        };
      }

      disconnect = disconnectType => {
        if (recognition) {
          switch (disconnectType) {
            case 'ABORT':
              pauseAfterDisconnect = true;
              recognition.abort();
              break;
            case 'RESET':
              pauseAfterDisconnect = false;
              recognition.abort();
              break;
            case 'STOP':
            default:
              pauseAfterDisconnect = true;
              recognition.stop();
          }
        }
      };

      onRecognitionDisconnect() {
        if (pauseAfterDisconnect) {
          // this.props.dispatch(listeningUpdated(false));
        } else if (recognition) {
          if (recognition.continuous) {
            this.startListening();
          } else {
            this.props.dispatch(listeningUpdated(false));
          }
        }
        pauseAfterDisconnect = false;
      }

      updateTranscript(event) {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.props.dispatch(finalUpdated(event.results[i][0].transcript));
          } else {
            this.props.dispatch(interimUpdated(event.results[i][0].transcript));
          }
        }
      }

      resetTranscript = () => {
        this.disconnect('RESET');
      };

      startListening = () => {
        if (recognition && !listening) {
          if (!recognition.continuous) {
            this.resetTranscript();
          }
          try {
            recognition.start();
          } catch (DOMException) {
            // Tried to start recognition after it has already started - safe to swallow this error
          }

          this.props.dispatch(listeningUpdated(true));
        }
      };

      abortListening = () => {
        this.props.dispatch(listeningUpdated(false));
        this.disconnect('ABORT');
      };

      stopListening = () => {
        this.props.dispatch(listeningUpdated(false));
        this.disconnect('STOP');
      };

      render() {
        return (
          <WrappedComponent
            startListening={this.startListening}
            abortListening={this.abortListening}
            stopListening={this.stopListening}
            recognition={recognition}
            browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
            {...this.state}
            {...this.props}
          />
        );
      }
    }

    function mapStateToProps(state) {
      return {
        ...state,
        listening: speechSelector.listening(state)
      };
    }

    return connect(mapStateToProps)(SpeechRecognitionContainer);
  };

  if (typeof options === 'function') {
    return SpeechRecognitionInner(options);
  } else {
    return SpeechRecognitionInner;
  }
}
