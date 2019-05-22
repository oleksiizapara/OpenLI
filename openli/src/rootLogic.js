import { logic as speechRecognitionLogic } from './speechRecognition/index';
import { logic as readingLogic } from './reading/index';
import { logic as readingMessageLogic } from './readingMessage/index';
import { logic as reviewLogic } from './review/index';
import { logic as settingsLogic } from './settings/index';
import { logic as readingListLogic } from './readingList/index';
import { logic as readingSearchLogic } from './readingSearch/index';

export default [
  ...speechRecognitionLogic,
  ...readingLogic,
  ...readingMessageLogic,
  ...reviewLogic,
  ...settingsLogic,
  ...readingListLogic,
  ...readingSearchLogic
];
