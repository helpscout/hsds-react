import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flexy, Hr, Switch, Text } from '../src/index.js'

const stories = storiesOf('Switch', module)

stories.add('default', () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Active)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch active />
      </Flexy.Item>
    </Flexy>
  </form>
))

stories.add('state', () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Regular)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Error)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="sm" state="error" />
      </Flexy.Item>
    </Flexy>
  </form>
))

stories.add('sizes', () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Medium)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="md" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Small)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Extra small)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="xs" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
  </form>
))
