import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { actions } from '../actions';

import { selectors as readingSelector } from 'reading/reducer';
import { formStates as readingFormStates } from 'reading/actions';

import * as constants from 'common/constants';

const RecordingButton = () => {
  const readingFormState = useSelector(state =>
    readingSelector.formState(state)
  );

  const dispatch = useDispatch();

  return readingFormState === readingFormStates.READING_STATE ? (
    <Button
      circular
      icon='microphone'
      color={constants.recordActiveColor}
      onClick={() => dispatch(actions.start())}
    />
  ) : (
    <Button
      circular
      icon='microphone'
      color={constants.recordUnActiveColor}
      onClick={() => dispatch(actions.stop())}
    />
  );
};

export default RecordingButton;
