import React from 'react'
import { Hr, Text, Tooltip } from '../src/components'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('Tooltip', module)

const List = () => (
  <div style={{ width: 100 }}>
    <h3>Heading</h3>
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>🐝</li>
    </ul>
  </div>
)
stories.add('default', () => (
  <div style={{ padding: '20%' }}>
    <Tooltip
      triggerOn="click"
      renderContent={() => <List />}
      placement="top-start"
      title="Hallo"
    >
      Custom Top. Not contained in Text.
    </Tooltip>
    <Hr />
    <Tooltip placement="right" title="Halloooooo">
      <Text>Right</Text>
    </Tooltip>
    <br />
    <Tooltip title="hello thereeeeee" placement="bottom">
      <Text>Bottom</Text>
    </Tooltip>
    <Hr />
    <Tooltip title="hello thereeeeee" placement="left">
      <Text>Left</Text>
    </Tooltip>
    <br />
    <Tooltip
      triggerOn="click"
      title="lotsssssssssofffffffffwordddddddddddddddddsssssssssssssssssssssssss"
      placement="top-start"
    >
      Top Left, lots of words. Not contained in Text.
    </Tooltip>
    <br />
    <Tooltip placement="right">
      <Text>No tooltip (missing title)</Text>
    </Tooltip>
    <br />
  </div>
))
