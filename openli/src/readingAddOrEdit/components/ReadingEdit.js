import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  updateReadingMessage,
  deleteReadingMessage
} from '../../mutationHelper';
import { getReadingMessage } from '../../queryHelper';

import ReadingAddOrEdit from './ReadingAddOrEdit';

class ReadingEdit extends Component {
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

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;

    const message = await getReadingMessage(params.id);

    this.setState({ ...message });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async publish() {
    console.log(this.state);

    const { id, title, content } = this.state;

    const resultReadingMessage = await updateReadingMessage({
      id: id,
      content: content
    });

    this.props.history.push(`/read/${resultReadingMessage.id}`);
  }

  async delete() {
    const { id } = this.state;

    const resultReadingMessage = await deleteReadingMessage({
      id: id
    });

    this.props.history.push(`/readingSearch`);
  }

  render() {
    const { id, title, content, tags, sharedStatus } = this.state;

    return (
      <ReadingAddOrEdit
        id={id}
        title={title}
        content={content}
        tags={tags}
        sharedStatus={sharedStatus}
        publish={this.publish}
        delete={this.delete}
        handleChange={this.handleChange}
      />
    );
  }
}

export default withRouter(ReadingEdit);
