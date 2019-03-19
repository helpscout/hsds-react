import React from 'react'
import { storiesOf } from '@storybook/react'

import baseStyles from '../src/styles/resets/baseStyles.css.js'
import styled from '../src/components/styled'

import { HorizontalScroller } from '../src/index.js'

const stories = storiesOf('HorizontalScroller', module)

const WithMarginBottom = styled('div')`
  box-sizing: border-box;
  margin-bottom: 30px;
`

const MainContainer = styled('div')`
  ${baseStyles} width: ${props => (props.fullWidth ? '100%' : '300px')};
  box-sizing: border-box;
  height: 300px;
  background: dodgerblue;
`
const WideElement = styled('div')`
  ${baseStyles} width: ${props => (props.fullWidth ? '700px' : '450px')};
  height: 200px;
  padding: 10px;
  margin-top: 30px;
  background: plum;
`

stories.add('default', () => (
  <MainContainer className="MainContainer">
    <HorizontalScroller sides="both">
      This container is 300px wide
      <WideElement>This box is wider than the container at 450px</WideElement>
    </HorizontalScroller>
  </MainContainer>
))

stories.add('sides', () => (
  <div>
    <WithMarginBottom>
      <MainContainer className="MainContainer">
        <HorizontalScroller sides="both">
          Strip on both sides <br />
          This container is 300px wide
          <WideElement>
            This box is wider than the container at 450px
          </WideElement>
        </HorizontalScroller>
      </MainContainer>
    </WithMarginBottom>
    <WithMarginBottom>
      <MainContainer className="MainContainer2">
        <HorizontalScroller
          scrollableElementClassName="MainContainer2"
          sides="right"
        >
          Strip on right side only <br />
          This container is 300px wide
          <WideElement>
            This box is wider than the container at 450px
          </WideElement>
        </HorizontalScroller>
      </MainContainer>
    </WithMarginBottom>
    <WithMarginBottom>
      <MainContainer className="MainContainer3">
        <HorizontalScroller
          scrollableElementClassName="MainContainer3"
          sides="left"
        >
          Strip on left side only <br />
          This container is 300px wide
          <WideElement>
            This box is wider than the container at 450px
          </WideElement>
        </HorizontalScroller>
      </MainContainer>
    </WithMarginBottom>
  </div>
))

stories.add('window resize', () => (
  <MainContainer className="MainContainer" fullWidth>
    <HorizontalScroller>
      This container is 100% wide
      <WideElement fullWidth>
        This box is 700px, resize the window to see effect
      </WideElement>
    </HorizontalScroller>
  </MainContainer>
))

stories.add('with custom background', () => (
  <MainContainer className="MainContainer">
    <HorizontalScroller
      background={{
        from: 'rgba(50, 50, 50, 0)',
        to: 'rgba(50, 50, 50, 0.6)',
      }}
    >
      This container is 300px wide
      <WideElement>This box is wider than the container at 450px</WideElement>
    </HorizontalScroller>
  </MainContainer>
))

stories.add('with custom width', () => (
  <MainContainer className="MainContainer">
    <HorizontalScroller
      stripWidth="100px"
      background={{
        from: 'rgba(140,140,140,0)',
        to: 'rgba(123,0,123,0.5)',
      }}
    >
      This container is 300px wide
      <WideElement>This box is wider than the container at 450px</WideElement>
    </HorizontalScroller>
  </MainContainer>
))

stories.add('debug on', () => (
  <MainContainer className="MainContainer">
    <HorizontalScroller debug>
      This container is 300px wide
      <WideElement>This box is wider than the container at 450px</WideElement>
    </HorizontalScroller>
  </MainContainer>
))
