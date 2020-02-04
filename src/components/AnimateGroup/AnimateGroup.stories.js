import React from 'react'
import { storiesOf } from '@storybook/react'
import { Animate, AnimateGroup, Card } from '../index'

const stories = storiesOf('Utilities/AnimateGroup', module)

stories.add('default', () => (
  <div>
    <p>Stagger fade in</p>
    <AnimateGroup stagger>
      <Animate sequence="fade">
        <div>Fade in</div>
      </Animate>
      <Animate sequence="fade left">
        <div>Fade in + left</div>
      </Animate>
      <Animate sequence="fade">
        <div>Fade in</div>
      </Animate>
      <Animate sequence="fade left">
        <div>Fade in + left</div>
      </Animate>
    </AnimateGroup>
  </div>
))

stories.add('expand', () => (
  <div>
    <p>Stagger fade in</p>
    <div style={{ margin: 'auto', width: '80%' }}>
      <Card>
        <div>Card</div>
      </Card>
      <AnimateGroup stagger>
        <Animate sequence="fade up">
          <Card>
            <div>Expand, Up</div>
          </Card>
        </Animate>
        <Animate sequence="expand fade scale">
          <Card>
            <div>Expand, Fade, Scale</div>
          </Card>
        </Animate>
        <Animate sequence="expand fade left">
          <Card>
            <div>Expand, Fade, Left</div>
          </Card>
        </Animate>
        <Animate sequence="expand fade right">
          <Card>
            <div>Expand, Fade, Right</div>
          </Card>
        </Animate>
        <Animate sequence="expand fade down">
          <Card>
            <div>Expand, Fade, Down</div>
          </Card>
        </Animate>
      </AnimateGroup>
      <Card>
        <div>Card</div>
      </Card>
    </div>
  </div>
))

stories.add('sequence', () => (
  <div>
    <p>Sequence defined by Group</p>
    <AnimateGroup stagger sequence="fade left">
      <Animate>
        <div>Element</div>
      </Animate>
      <Animate>
        <div>Element</div>
      </Animate>
      <Animate>
        <div>Element</div>
      </Animate>
      <Animate>
        <div>Element</div>
      </Animate>
      <Animate>
        <div>Element</div>
      </Animate>
    </AnimateGroup>
  </div>
))
