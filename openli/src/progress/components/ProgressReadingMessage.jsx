import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import Enumerable from 'linq';
import moment from 'moment/moment';
import { Header, Table } from 'semantic-ui-react';

import { Message, Form, Icon, Container } from 'semantic-ui-react';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';

const tooltipFormatter = (value, name, props) => {
  switch (name) {
    case 'readingSpeed':
      return [`${value} words/minute`, 'Reading Speed'];
    case 'recognisedWordsPercent':
      return [`${value}%`, 'Recognised Words'];
    default:
      return [];
  }
};

const ProgressReadingMessage = ({ readingMessageProgress }) => {
  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

  const {
    readingMessageProgressUnits,
    readingMessageTitle
  } = readingMessageProgress;

  return (
    <>
      <Header>{readingMessageTitle}</Header>

      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={readingMessageProgressUnits}>
          <XAxis
            dataKey='time'
            domain={['auto', 'auto']}
            name='Time'
            tickFormatter={unixTime => moment(unixTime).format('HH:mm Do')}
            type='number'
          />
          <YAxis type='number' dataKey='readingSpeed' orientation='left' />
          <YAxis
            type='number'
            dataKey='recognisedWordsPercent'
            orientation='right'
          />
          <Line type='monotone' dataKey='readingSpeed' stroke='#8884d8' />
          <Line
            type='monotone'
            dataKey='recognisedWordsPercent'
            stroke='#82ca9d'
          />
          <Tooltip
            filterNull={true}
            formatter={tooltipFormatter}
            labelFormatter={unixTime => moment(unixTime).format('HH:mm Do')}
          />
        </LineChart>
      </ResponsiveContainer>

      <Table basic='very' celled collapsing>
        <Table.Body>
          {Enumerable.from(readingMessageProgressUnits)
            .orderByDescending(x => x.time)
            .toArray()
            .map(readingMessageProgressUnit => {
              const {
                readingMessageId,
                time,
                readingSpeed,
                totalWords,
                uniqueWords,
                recognisedWords,
                notRecognisedWords,
                recognisedWordsPercent
              } = readingMessageProgressUnit;
              return (
                <React.Fragment key={time}>
                  <Table.Row>
                    <Table.Cell singleLine>
                      {moment(time).format('HH:mm Do')}
                    </Table.Cell>
                    <Table.Cell>
                      Not Recognised Words: {notRecognisedWords.join(', ')}
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ProgressReadingMessage;
