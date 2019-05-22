import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Header, Segment, Container } from 'semantic-ui-react';

const ReadingListItem = ({ message }) => {
  return (
    <>
      <Header attached='top' as='h3'>
        <Link to={`/reading/${message.id}`}> {message.title}</Link>
      </Header>

      <Segment attached>
        <Container>{message.content}</Container>
        <Container textAlign='right'>{`${message.author.name} ${
          message.author.familyName
        }, ${new Date(message.createdAt).toLocaleDateString()}`}</Container>
      </Segment>
    </>
  );
};

ReadingListItem.propTypes = {
  message: PropTypes.object
};

export default ReadingListItem;
