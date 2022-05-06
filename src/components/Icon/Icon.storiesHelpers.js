import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { boolean, select } from '@storybook/addon-knobs'
import iconList from './icons'
import { Icon, Text } from '../'

const IconGrid = styled('div')`
  display: flex;
  flex-wrap: wrap;
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

const IconContainerUI = styled.div`
  display: inline-block;

  &:hover {
    border: 1px solid ${getColor('grey.400')};
    border-radius: 3px;
  }
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
    24
  )

  const state = select(
    'state',
    {
      default: 'default',
      error: 'error',
      success: 'success',
      warning: 'warning',
    },
    'default'
  )
  const shade = select(
    'shade',
    {
      default: 'default',
      subtle: 'subtle',
      muted: 'muted',
      faint: 'faint',
      extraMuted: 'extraMuted',
    },
    'default'
  )
  const muted = boolean('muted', false)
  const withCaret = boolean('withCaret', false)

  const icons = Object.keys(iconList).map(i => (
    <WrapperUI key={i}>
      <IconWrapper>
        <IconContainerUI>
          <Icon
            name={i}
            key={i}
            size={size}
            center
            state={state}
            shade={shade}
            muted={muted}
            withCaret={withCaret}
          />
        </IconContainerUI>
      </IconWrapper>
      <TextWrapper size="12">{i}</TextWrapper>
    </WrapperUI>
  ))

  return <IconGrid>{icons}</IconGrid>
}
