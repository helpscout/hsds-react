import React from 'react'
import { storiesOf } from '@storybook/react'
import { Animate, AnimateGroup, Card } from '../../src/index.js'

const stories = storiesOf('AnimateGroup', module)

const customHeightSequence = {
  onMount: {
    height: 0,
    overflow: 'hidden'
  },
  onEntering: (node) => {
    const el = node.childNodes[0]
    return {
      height: [0, el.offsetHeight * 2, el.offsetHeight]
    }
  },
  onExit: (node) => {
    const el = node.childNodes[0]
    return {
      height: [el.offsetHeight, 0]
    }
  }
}

stories.add('default', () => (
  <div>
    <p>Stagger fade in</p>
    <AnimateGroup stagger staggerDelay={500}>
      <Animate sequence='fade'>
        <div>Fade in</div>
      </Animate>
      <Animate sequence='fade left'>
        <div>Fade in + left</div>
      </Animate>
      <Animate sequence='fade'>
        <div>Fade in</div>
      </Animate>
      <Animate sequence='fade left'>
        <div>Fade in + left</div>
      </Animate>
    </AnimateGroup>
  </div>
))

stories.add('expand', () => (
  <div>
    <p>Stagger fade in</p>
    <div style={{ margin: 'auto', width: '80%'}}>
      <Card>
        <div>Card</div>
      </Card>
      <AnimateGroup stagger staggerDelay={700}>
        <Animate sequence='expand' duration={700}>
          <Card>
            <div>Expand</div>
          </Card>
        </Animate>
        <Animate sequence='expand fade scale' duration={700}>
          <Card>
            <div>Expand, Fade, Scale</div>
          </Card>
        </Animate>
        <Animate sequence='expand fade left' duration={700}>
          <Card>
            <div>Expand, Fade, Left</div>
          </Card>
        </Animate>
        <Animate sequence='expand fade right' duration={700}>
          <Card>
            <div>Expand, Fade, Right</div>
          </Card>
        </Animate>
      </AnimateGroup>
      <Card>
        <div>Card</div>
      </Card>
    </div>
  </div>
))
