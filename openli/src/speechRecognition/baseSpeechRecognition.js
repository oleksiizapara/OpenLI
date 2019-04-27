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
    let interimTranscript = '';
    let finalTranscript = '';

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
          listening,
          interimTranscript,
          finalTranscript
        };
      }

      updateListening(listening) {
        if (this.props.listening !== listening) {
          this.props.dispatch(listeningUpdated(listening));
        }
      }

      updateInterim(interimTranscript) {
        if (this.props.interimTranscript !== interimTranscript) {
          this.props.dispatch(interimUpdated(interimTranscript));
        }
      }

      updateFinal(finalTranscript) {
        if (this.props.finalTranscript !== finalTranscript) {
          this.props.dispatch(finalUpdated(finalTranscript));
        }
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
        listening = false;
        if (pauseAfterDisconnect) {
          this.updateListening(listening);
        } else if (recognition) {
          if (recognition.continuous) {
            this.startListening();
          } else {
            this.updateListening(listening);
          }
        }
        pauseAfterDisconnect = false;
      }

      updateTranscript(event) {
        interimTranscript = '';
        finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript = this.concatTranscripts(
              finalTranscript,
              event.results[i][0].transcript
            );
          } else {
            interimTranscript = this.concatTranscripts(
              interimTranscript,
              event.results[i][0].transcript
            );
          }
        }
        this.updateFinal(finalTranscript);
        this.updateInterim(interimTranscript);
      }

      concatTranscripts(...transcriptParts) {
        return transcriptParts
          .map(t => t.trim())
          .join(' ')
          .trim();
      }

      resetTranscript = () => {
        interimTranscript = '';
        finalTranscript = '';
        this.disconnect('RESET');
        this.updateFinal(finalTranscript);
        this.updateInterim(interimTranscript);
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
          listening = true;
          this.updateListening(listening);
        }
      };

      abortListening = () => {
        listening = false;
        this.updateListening(listening);
        this.disconnect('ABORT');
      };

      stopListening = () => {
        listening = false;
        this.updateListening(listening);
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
        listening: speechSelector.listening(state),
        finalTranscript: speechSelector.finalTranscript(state),
        interimTranscript: speechSelector.interimTranscript(state)
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
