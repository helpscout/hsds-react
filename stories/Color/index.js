import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  darken as darkenFn,
  lighten as lightenFn,
  optimalTextColor,
  getColorShade,
} from '../../src/utilities/color'

const stories = storiesOf('Utilities/Color', module)

const Color = props => {
  const { color, lighten, darken } = props

  const hex = color.indexOf('#') === 0 ? color : `#${color}`

  const background = lighten
    ? lightenFn(hex, lighten)
    : darken
      ? darkenFn(hex, darken)
      : hex

  const styles = {
    background,
    color: optimalTextColor(background),
    display: 'inline-block',
    margin: 5,
    padding: 5,
    width: 80,
    textAlign: 'center',
  }

  const amount = lighten || darken || 0

  return (
    <div style={styles}>
      {background}
      <br />
      ({amount})
    </div>
  )
}

const Shade = props => {
  const { color, lighten, darken } = props

  const hex = color.indexOf('#') === 0 ? color : `#${color}`

  const background = lighten
    ? lightenFn(hex, lighten)
    : darken
      ? darkenFn(hex, darken)
      : hex

  const styles = {
    background,
    borderLeft: `10px solid ${lightenFn(background, 10)}`,
    borderRight: `10px solid ${darkenFn(background, 10)}`,
    boxSizing: 'border-box',
    color: optimalTextColor(background),
    display: 'inline-block',
    margin: 5,
    padding: 5,
    width: 80,
    textAlign: 'center',
  }

  return (
    <div style={styles}>
      {background}
      <br />
      ({getColorShade(background)})
    </div>
  )
}

const ShadeList = props => {
  const { color } = props
  return (
    <div>
      {[...Array(201)].map((c, index) => {
        return (
          <Shade
            color={color}
            lighten={(201 - index) / 2}
            key={`c-l-${index}`}
          />
        )
      })}
      {[...Array(201)].map((c, index) => {
        return <Shade color={color} darken={index / 2} key={`c-${index}`} />
      })}
    </div>
  )
}

stories.add('lighten', () => {
  return (
    <div>
      <div>
        {[...Array(101)].map((c, index) => {
          return <Color color="003300" lighten={index} key={`c-${index}`} />
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return <Color color="330000" lighten={index} key={`c-${index}`} />
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return <Color color="000033" lighten={index} key={`c-${index}`} />
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return <Color color="ff0000" lighten={index} key={`c-${index}`} />
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return <Color color="00ff00" lighten={index} key={`c-${index}`} />
        })}
      </div>
      <div>
        {[...Array(101)].map((c, index) => {
          return <Color color="0000ff" lighten={index} key={`c-${index}`} />
        })}
      </div>
    </div>
  )
})

stories.add('darken', () => {
  return (
    <div>
      {[...Array(101)].map((c, index) => {
        return <Color color="ffdd44" darken={index} key={`c-${index}`} />
      })}
    </div>
  )
})

stories.add('shades', () => {
  return (
    <div>
      <ShadeList color="#8db058" />
      <ShadeList color="#D0021B" />
      <ShadeList color="#F8E71C" />
      <ShadeList color="#F5A623" />
      <ShadeList color="#7ED321" />
      <ShadeList color="#50E3C2" />
      <ShadeList color="#4A90E2" />
      <ShadeList color="#BD10E0" />
      <ShadeList color="#999999" />
      <ShadeList color="#7e80e7" />
    </div>
  )
})
