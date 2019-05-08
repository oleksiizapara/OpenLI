import React, { Component } from 'react';

import { createReadingMessage } from '../../mutationHelper';

import ReadingAddOrEdit from './ReadingAddOrEdit';

class ReadingAdd extends Component {
  constructor(props) {
    super(props);

    // this.publish = this.publish.bind(this);
    // this.delete = this.delete.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  state = {
    id: '',
    title: '',
    content: '',
    tags: '',
    sharedStatus: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async publish() {
    console.log(this.state);

    const { title, content } = this.state;

    const resultReadingMessage = await createReadingMessage({
      content: content
    });

    console.log(resultReadingMessage);

    this.props.history.push(`/read/${resultReadingMessage.id}`);
  }

  render() {
    const { classes } = this.props;

    const { id, title, content, tags, sharedStatus } = this.state;

    return (
      <ReadingAddOrEdit
        id={id}
        title={title}
        content={content}
        tags={tags}
        sharedStatus={sharedStatus}
        publish={this.publish}
        delete={undefined}
        handleChange={this.handleChange}
      />
    );
  }
}

export default ReadingAdd;
