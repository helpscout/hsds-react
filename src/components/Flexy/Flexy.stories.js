import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { Flexy } from '../index'

const stories = storiesOf('Flexy', module)

const BlockUI = styled('div')`
  background: yellow;
  padding: 20px;
`

stories.add('default', () => (
  <Flexy>
    <Flexy.Block>
      <BlockUI>Block</BlockUI>
    </Flexy.Block>
    <Flexy.Item>
      <BlockUI>Item</BlockUI>
    </Flexy.Item>
    <Flexy.Item>
      <BlockUI>Item</BlockUI>
    </Flexy.Item>
  </Flexy>
))

stories.add('align', () => (
  <div>
    <Flexy style={{ height: 100, border: '1px solid blue' }} align="top">
      <Flexy.Item>
        <BlockUI>top</BlockUI>
      </Flexy.Item>
    </Flexy>
    <Flexy style={{ height: 100, border: '1px solid blue' }} align="middle">
      <Flexy.Item>
        <BlockUI>middle</BlockUI>
      </Flexy.Item>
    </Flexy>
    <Flexy style={{ height: 100, border: '1px solid blue' }} align="bottom">
      <Flexy.Item>
        <BlockUI>bottom</BlockUI>
      </Flexy.Item>
    </Flexy>
  </div>
))

stories.add('gap', () => (
  <div>
    <Flexy style={{ border: '1px solid blue' }} gap="none">
      <Flexy.Block>
        <BlockUI>none</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>none</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>none</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>none</BlockUI>
      </Flexy.Block>
    </Flexy>
    <Flexy style={{ border: '1px solid blue' }} gap="xs">
      <Flexy.Block>
        <BlockUI>xs</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>xs</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>xs</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>xs</BlockUI>
      </Flexy.Block>
    </Flexy>
    <Flexy style={{ border: '1px solid blue' }} gap="sm">
      <Flexy.Block>
        <BlockUI>sm</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>sm</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>sm</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>sm</BlockUI>
      </Flexy.Block>
    </Flexy>
    <Flexy style={{ border: '1px solid blue' }} gap="md">
      <Flexy.Block>
        <BlockUI>md</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>md</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>md</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>md</BlockUI>
      </Flexy.Block>
    </Flexy>
    <Flexy style={{ border: '1px solid blue' }} gap="lg">
      <Flexy.Block>
        <BlockUI>lg</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>lg</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>lg</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>lg</BlockUI>
      </Flexy.Block>
    </Flexy>
    <Flexy style={{ border: '1px solid blue' }} gap="xl">
      <Flexy.Block>
        <BlockUI>xl</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>xl</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>xl</BlockUI>
      </Flexy.Block>
      <Flexy.Block>
        <BlockUI>xl</BlockUI>
      </Flexy.Block>
    </Flexy>
  </div>
))

stories.add('just', () => (
  <div>
    <Flexy style={{ height: 100, border: '1px solid blue' }} just="left">
      <Flexy.Item>
        <BlockUI>left</BlockUI>
      </Flexy.Item>
    </Flexy>
    <Flexy style={{ height: 100, border: '1px solid blue' }} just="center">
      <Flexy.Item>
        <BlockUI>center</BlockUI>
      </Flexy.Item>
    </Flexy>
    <Flexy style={{ height: 100, border: '1px solid blue' }} just="right">
      <Flexy.Item>
        <BlockUI>right</BlockUI>
      </Flexy.Item>
    </Flexy>
  </div>
))
