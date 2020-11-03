import React, { useState } from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'
import Depth from './Depth'

export const ContainerWithDepth = styled(Depth).attrs(props => ({
  level: props.level,
}))`
  display: flex;
  width: 300px;
  padding: 50px;
  justify-content: space-between;
`

const SwitcherUI = styled('div')`
  display: flex;
  position: absolute;
  width: 140px;
  bottom: 20px;
  left: 50%;
  margin-left: -70px;

  button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    overflow: hidden;
    text-indent: -9000px;
    border-radius: 50%;
    margin: 0 4px;
    border: 2px solid white;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }
`

export const InteractiveContainer = ({ children, columns = 1 }) => {
  const [bg, setBg] = useState(getColor('grey.200'))

  return (
    <BoxContainerUI bg={bg} columns={columns}>
      {children}
      <SwitcherUI>
        <button
          style={{ background: 'white' }}
          onClick={() => {
            setBg('white')
          }}
        >
          white
        </button>
        <button
          style={{ background: getColor('grey.200') }}
          onClick={() => {
            setBg(getColor('grey.200'))
          }}
        >
          grey.200
        </button>
        <button
          style={{ background: getColor('grey.300') }}
          onClick={() => {
            setBg(getColor('grey.300'))
          }}
        >
          grey.300
        </button>
        <button
          style={{ background: getColor('charcoal.700') }}
          onClick={() => {
            setBg(getColor('charcoal.700'))
          }}
        >
          charcoal.700
        </button>
        <button
          style={{ background: getColor('blue.700') }}
          onClick={() => {
            setBg(getColor('blue.700'))
          }}
        >
          blue.700
        </button>
      </SwitcherUI>
    </BoxContainerUI>
  )
}

export const BoxContainerUI = styled('div')`
  position: relative;
  display: grid;
  grid-template-columns: ${({ columns }) =>
    `repeat(${columns}, ${columns === 1 ? '250px' : '1fr'})`};
  grid-gap: 20px;
  justify-items: center;
  justify-content: center;
  padding: 20px 20px 60px;
  border-radius: 5px;
  margin: 20px 0 30px;
  font-family: ${AKTIV_FONT_FAMILY};
  background: ${({ bg }) => bg};
`

export const BoxWithDepthUI = styled(Depth)`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${getColor('charcoal.500')};
  font-size: 15px;
`

export const RelatedLink = styled('a')`
  display: inline-block;
  margin: 2px 5px 2px 0;
  padding: 4px 10px 4px 35px;
  border-radius: 4px;
  background: #f1f3f5;
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 10px center;
  text-decoration: none;
  font-family: ${AKTIV_FONT_FAMILY};
  font-size: 14px;
  color: #1292ee;

  &:hover {
    color: #0077cc;
    background-color: #d6edff;
    text-decoration: underline;
  }

  &.figma {
    background-image: url('https://static.figma.com/app/icon/1/favicon.png');
  }

  &.storybook {
    background-image: url('https://storybook.js.org/images/logos/icon-storybook.png');
  }
`
