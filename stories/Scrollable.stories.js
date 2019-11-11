import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'
import { createSpec, faker } from '@helpscout/helix'
import { Card, Image, Scrollable } from '../src/index'
import styled from 'styled-components'
import baseStyles from '../src/styles/resets/baseStyles.css.js'

const ContentSpec = createSpec({
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
})

const stories = storiesOf('Scrollable', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <Card style={{ height: 400 }} seamless>
    <Scrollable
      onScroll={action('onScroll')}
      fade={boolean('fade', true)}
      fadeBottom={boolean('fadeBottom', true)}
      rounded={boolean('rounded', true)}
    >
      <Card.Block>
        <Image
          src="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
          alt="Not now, Arctic Puffin!"
          title="Not now, Arctic Puffin!"
        />
        {ContentSpec.generate(20).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
      </Card.Block>
    </Scrollable>
  </Card>
))

const MainContainer = styled('div')`
  width: ${props => (props.fullWidth ? '100%' : '300px')};
  box-sizing: border-box;
  height: 300px;
  background: dodgerblue;
`
const WideElement = styled('div')`
  width: ${props => (props.fullWidth ? '700px' : '450px')};
  height: 200px;
  padding: 10px;
  margin-top: 30px;
  background: plum;
`

stories.add('Horizontal', () => (
  <div>
    <MainContainer className="MainContainer">
      <Scrollable
        onScroll={action('onScroll')}
        fadeLeft={boolean('fadeLeft', true)}
        fadeRight={boolean('fadeRight', true)}
      >
        Fader on both sides
        <WideElement>This box is wider than the container at 450px</WideElement>
      </Scrollable>
    </MainContainer>
  </div>
))

stories.add('Horizontal window resize', () => (
  <MainContainer className="MainContainer" fullWidth>
    <Scrollable fadeLeft fadeRight>
      This container is 100% wide
      <WideElement fullWidth>
        This box is 700px, resize the window to see effect
      </WideElement>
    </Scrollable>
  </MainContainer>
))

stories.add('scroll it all', () => (
  <MainContainer className="MainContainer" style={{ height: '400px' }}>
    <Scrollable
      fadeLeft={boolean('fadeLeft', true)}
      fadeRight={boolean('fadeRight', true)}
      fadeBottom={boolean('fadeBottom', true)}
      fade={boolean('fade', true)}
    >
      <WideElement style={{ height: '600px' }}>
        {ContentSpec.generate(7).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
      </WideElement>
    </Scrollable>
  </MainContainer>
))
