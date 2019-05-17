import React from 'react';
import PropTypes from 'prop-types';

import { Form as FormikForm } from 'formik';

// import * as Yup from 'yup';

// export const DisplayFormikState = props => (
//   <div style={{ margin: '1rem 0' }}>
//     <h3 style={{ fontFamily: 'monospace' }} />
//     <pre
//       style={{
//         background: '#f6f8fa',
//         fontSize: '.65rem',
//         padding: '.5rem'
//       }}
//     >
//       <strong>props</strong> = {JSON.stringify(props, null, 2)}
//     </pre>
//   </div>
// );

// eslint-disable-next-line no-unused-vars
export default function Form(props) {
  const { handleSubmit } = props;
  return (
    <FormikForm autoComplete='off' onSubmit={handleSubmit}>
      {/* <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Field
              id='title'
              name='title'
              label='Title'
              fullWidth
              autoComplete='new_readingMessageWasNotFound title'
              component={TextField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id='content'
              name='content'
              label='Content'
              fullWidth
              multiline
              rows={3}
              rowsMax={12}
              autoComplete='new_readingMessageWasNotFound content'
              component={TextField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id='tags'
              name='tags'
              label='Tags'
              fullWidth
              autoComplete='new_readingMessageWasNotFound tags'
              component={TextField}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='shared-status'>Shared Status</InputLabel>
              <Select
                required
                input={<Input name='sharedStatus' id='shared-status' />}
                autoWidth
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Public</MenuItem>
                <MenuItem value={20}>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12} container spacing={1} alignItems={'center'}>
            <Grid item sm={6} xs={12}>
              {false && (
                <Button fullWidth variant='contained'>
                  Delete
                </Button>
              )}
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                type='submit'
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <DisplayFormikState {...props} /> */}
    </FormikForm>
  );
}

export const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.content) {
    errors.content = 'Required';
  }
  return errors;
};

Form.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.string,
  sharedStatus: PropTypes.string,
  handleChange: PropTypes.func,
  // deleteFunction: PropTypes.func,
  handleSubmit: PropTypes.func
};
