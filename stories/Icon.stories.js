import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flexy, Icon, Text } from '../src/index.js'
import { ICONS as iconList } from '../src/components/Icon/utils'
import styled from '../src/components/styled'
import { getColor } from '../src/styles/utilities/color'

const stories = storiesOf('Icon', module)

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

stories.add('icons', () => {
  const icons = Object.keys(iconList).map(i => (
    <WrapperUI key={i}>
      <IconWrapper>
        <Icon name={i} key={i} center />
      </IconWrapper>
      <TextWrapper size="12">{i}</TextWrapper>
    </WrapperUI>
  ))

  return <IconGrid>{icons}</IconGrid>
})

stories.add('sizes', () => {
  const icons = ['14', '16', '18', '24'].map(i => (
    <div style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}>
      <Icon name="emoji" size={i} key={i} center />
      <Text muted size="sm">
        {i}
      </Text>
      <br />
    </div>
  ))

  return <div>{icons}</div>
})

stories.add('colors', () => {
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
})

stories.add('shades', () => {
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
})

stories.add('withCaret', () => {
  const icons = ['14', '16', '18', '24'].map(i => (
    <div style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}>
      <Icon name="user" size={i} key={i} center withCaret />
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
          <Icon name="user" withCaret />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size="sm">
            With Caret
          </Text>
        </Flexy.Item>
      </Flexy>

      <Flexy just="left">
        <Flexy.Item>
          <Icon name="user" withCaret muted />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size="sm">
            Muted + Caret
          </Text>
        </Flexy.Item>
      </Flexy>

      <Flexy just="left" style={{ color: 'red' }}>
        <Flexy.Item>
          <Icon name="user" withCaret />
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
})
