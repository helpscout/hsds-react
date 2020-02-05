import React from 'react'
import { Animate, AnimateGroup, Card } from '../index'

export default {
  component: AnimateGroup,
  title: 'Utilities/AnimateGroup',
}

export const Default = () => (
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
)

Default.story = {
  name: 'default',
}

export const Expand = () => (
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
)

Expand.story = {
  name: 'expand',
}

export const Sequence = () => (
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
)

Sequence.story = {
  name: 'sequence',
}
