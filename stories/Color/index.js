import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  darken as darkenFn,
  lighten as lightenFn,
  optimalTextColor
} from '../../src/utilities/color'

const stories = storiesOf('Utilities/Color', module)

const Color = props => {
  const {
    color,
    lighten,
    darken
  } = props

  const hex = color.indexOf('#') === 0 ? color : `#${color}`

  const background = lighten
    ? lightenFn(hex, lighten) : darken
    ? darkenFn(hex, darken)
    : hex

  const styles = {
    background,
    color: optimalTextColor(background),
    display: 'inline-block',
    margin: 5,
    padding: 5,
    width: 80,
    textAlign: 'center'
  }

  const amount = lighten || darken || 0

  return (
    <div style={styles}>
      {background}<br />
      ({amount})
    </div>
  )
}

stories.add('lighten', () => {
  return (
    <div>
      <div>
        {[...Array(101)].map((c, index) => {
          return (
            <Color color='003300' lighten={index} key={`c-${index}`} />
          )
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return (
            <Color color='330000' lighten={index} key={`c-${index}`} />
          )
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return (
            <Color color='000033' lighten={index} key={`c-${index}`} />
          )
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return (
            <Color color='ff0000' lighten={index} key={`c-${index}`} />
          )
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return (
            <Color color='00ff00' lighten={index} key={`c-${index}`} />
          )
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return (
            <Color color='0000ff' lighten={index} key={`c-${index}`} />
          )
        })}
      </div>
    </div>
  )
})

stories.add('darken', () => {
  return (
    <div>
      {[...Array(101)].map((c, index) => {
        return (
          <Color color='ffdd44' darken={index} key={`c-${index}`} />
        )
      })}
    </div>
  )
})
