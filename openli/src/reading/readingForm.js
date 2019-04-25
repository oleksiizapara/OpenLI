import React from 'react';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { func } from 'prop-types';

function ReadingForm() {
  return (
    <React.Fragment>
      <Word key='1' value='Have read ' isRead='true' />
      <Word key='2' value='Reading ' isReading='true' />
      <Word key='3' value='Will read' />
    </React.Fragment>
  );
}

function Word({ value, index, isNew, isRead, isReading, isSkipped, isSign }) {
  var style = {
    color: 'black'
  };

  if (isRead) {
    style['color'] = '#4615b2';
  } else {
    style['color'] = '#212121';
  }

  if (isReading) {
    style['color'] = '#00a152';
  }

  return <span style={style}>{value}</span>;
}

export default ReadingForm;
