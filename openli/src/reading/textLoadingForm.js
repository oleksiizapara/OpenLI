import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { selectors as readingSelector } from './reducer';
import { textUpdated } from './actions';

class TextLoadingForm extends Component {
  render() {
    const OnChangeText = e => {
      this.props.dispatch(textUpdated(e.target.value));
    };

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id='text'
              name='text'
              label='Text'
              fullWidth
              autoComplete='reading text'
              onChange={OnChangeText}
              multiline
              defaultValue={this.props.text}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    text: readingSelector.text(state)
  };
}

export default connect(mapStateToProps)(TextLoadingForm);
