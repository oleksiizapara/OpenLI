import {
  INTERIM_TRANSCRIPT,
  FINAL_TRANSCRIPT,
  LISTENING_TRANSCRIPT
} from './types';

import { makeActionCreator } from './commonAction';

export const interimTranscriptUpdated = makeActionCreator(
  INTERIM_TRANSCRIPT,
  'interimTranscript'
);
export const finalTranscriptUpdated = makeActionCreator(
  FINAL_TRANSCRIPT,
  'finalTranscript'
);
export const listeningUpdated = makeActionCreator(
  LISTENING_TRANSCRIPT,
  'listening'
);
