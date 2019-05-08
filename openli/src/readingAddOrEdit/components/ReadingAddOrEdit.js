import React, { Component } from 'react';
import {
  withStyles,
  FormControl,
  Paper,
  Input,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';

import { createReadingMessage } from '../../mutationHelper';
import { getReadingMessage } from '../../queryHelper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto'
  },
  formControl: {
    // margin: theme.spacing.unit * 3,
    minWidth: 120,
    width: '100%'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class ReadingAddOrEdit extends Component {
  constructor(props) {
    super(props);

    this.publish = this.publish.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  publish() {
    this.props.publish();
  }

  delete() {
    this.props.delete();
  }

  handleChange(event) {
    this.props.handleChange(event);
  }

  render() {
    const { classes } = this.props;
    const { id, title, content, tags, sharedStatus } = this.props;

    return (
      <form className={classes.root} autoComplete='off'>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                required
                id='title'
                name='title'
                label='Title'
                defaultValue={title}
                fullWidth
                autoComplete='new_reading_message title'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                required
                id='content'
                name='content'
                label='Content'
                value={content}
                fullWidth
                multiline
                rows={3}
                rowsMax={12}
                autoComplete='new_reading_message content'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                id='tags'
                name='tags'
                label='Tags'
                value={tags}
                fullWidth
                autoComplete='new_reading_message tags'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='shared-status'>Shared Status</InputLabel>
                <Select
                  required
                  value={sharedStatus}
                  onChange={this.handleChange}
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
            <Grid
              item
              sm={6}
              xs={12}
              container
              spacing={16}
              alignItems={'center'}
            >
              <Grid item sm={6} xs={12}>
                {/* {this.props.delete && (
                  <Button fullWidth variant='contained' onClick={this.delete}>
                    Delete
                  </Button>
                )} */}
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={this.publish}
                >
                  Publish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

export default withStyles(styles)(ReadingAddOrEdit);
