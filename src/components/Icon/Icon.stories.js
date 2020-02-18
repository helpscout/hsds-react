import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { select } from '@storybook/addon-knobs'
import iconList from './icons'
import { Flexy, Icon, Text } from '../index'

export default {
  component: Icon,
  title: 'Components/Elements/Icon',
}

const IconGrid = styled('div')`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
`
const WrapperUI = styled('div')`
  flex: 0 0 80px;
  text-align: center;
  margin: 12px;
  border: 1px solid ${getColor('grey.500')};
  border-radius: 5px;
  -webkit-box-align: start;
  display: flex;
  flex-direction: column;
`
const TextWrapper = styled(Text)`
  margin-top: 'auto';
  border-top: 1px solid ${getColor('grey.500')};
  display: 'flex';
  padding: 8px;
  width: 100%;
  color: ${getColor('charcoal.300')};
`
const IconWrapper = styled('div')`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Icons = () => {
  const size = select(
    'size',
    {
      10: 10,
      12: 12,
      13: 13,
      14: 14,
      16: 16,
      18: 18,
      20: 20,
      24: 24,
      32: 32,
      48: 48,
      52: 52,
    },
    20
  )

  const icons = Object.keys(iconList).map(i => (
    <WrapperUI key={i}>
      <IconWrapper>
        <Icon name={i} key={i} size={size} center />
      </IconWrapper>
      <TextWrapper size="12">{i}</TextWrapper>
    </WrapperUI>
  ))

  return <IconGrid>{icons}</IconGrid>
}

Icons.story = {
  name: 'icons',
}

export const Sizes = () => {
  const icons = ['14', '16', '18', '24'].map(i => (
    <div
      key={i}
      style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}
    >
      <Icon name="emoji" size={i} key={i} center />
      <Text muted size="sm">
        {i}
      </Text>
      <br />
    </div>
  ))

  return <div>{icons}</div>
}

Sizes.story = {
  name: 'sizes',
}

export const Colors = () => {
  return (
    <div>
      <div>
        <Icon name="emoji" />
        <Text muted size="sm">
          Regular
        </Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name="emoji" muted />
        <Text muted size="sm">
          Muted
        </Text>
        <br />
      </div>
    </div>
  )
}

Colors.story = {
  name: 'colors',
}

export const Shades = () => {
  return (
    <div>
      <div>
        <Icon name="emoji" />
        <Text muted size="sm">
          Regular
        </Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name="emoji" shade="subtle" />
        <Text muted size="sm">
          Subtle
        </Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name="emoji" shade="muted" />
        <Text muted size="sm">
          Muted
        </Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name="emoji" shade="faint" />
        <Text muted size="sm">
          Faint
        </Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name="emoji" shade="extraMuted" />
        <Text muted size="sm">
          Extra Muted
        </Text>
        <br />
      </div>
    </div>
  )
}

Shades.story = {
  name: 'shades',
}

export const WithCaret = () => {
  const icons = ['14', '16', '18', '24'].map(i => (
    <div
      key={i}
      style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}
    >
      <Icon name="assign" size={i} key={i} center withCaret />
      <Text muted size="sm">
        {i}
      </Text>
      <br />
    </div>
  ))

  return (
    <div>
      <Flexy just="left">
        <Flexy.Item>
          <Icon name="assign" withCaret />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size="sm">
            With Caret
          </Text>
        </Flexy.Item>
      </Flexy>

      <Flexy just="left">
        <Flexy.Item>
          <Icon name="assign" withCaret muted />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size="sm">
            Muted + Caret
          </Text>
        </Flexy.Item>
      </Flexy>

      <Flexy just="left" style={{ color: 'red' }}>
        <Flexy.Item>
          <Icon name="assign" withCaret />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size="sm">
            Caret + Custom color
          </Text>
        </Flexy.Item>
      </Flexy>

      {icons}
    </div>
  )
}

WithCaret.story = {
  name: 'withCaret',
}
