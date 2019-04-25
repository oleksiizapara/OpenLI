import { logic as speechRecognitionLogic } from './speechRecognition/index';
import { logic as readingLogic } from './reading/index';

export default [...speechRecognitionLogic, ...readingLogic];
