import React from 'react'
import { shallow } from 'enzyme'
import PreviewCard from '..'
import { baseComponentTest } from '../../../tests/helpers/components'
import { Card, Heading, Text } from '../../'

const baseComponentOptions = {
  className: 'c-PreviewCard',
}

baseComponentTest(PreviewCard, baseComponentOptions)

describe('Card', () => {
  test('Extends Card component', () => {
    const wrapper = shallow(<PreviewCard />)
    const o = wrapper.find(Card)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard')).toBeTruthy()
  })
})

describe('Title', () => {
  test('Does not render a title by default', () => {
    const wrapper = shallow(<PreviewCard />)
    const o = wrapper.find(Heading)
    const p = wrapper.find('.c-PreviewCard__title')

    expect(o.length).not.toBeTruthy()
    expect(p.length).not.toBeTruthy()
  })

  test('Renders a title, if defined', () => {
    const wrapper = shallow(<PreviewCard title="Mugatu" />)
    const o = wrapper.find(Heading)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard__title')).toBeTruthy()
    expect(o.node.props.children).toBe('Mugatu')
  })
})

describe('Text', () => {
  test('Renders children in a Text component', () => {
    const wrapper = shallow(<PreviewCard title="Mugatu">Relax</PreviewCard>)
    const o = wrapper.find(Text)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard__content')).toBeTruthy()
    expect(o.node.props.children).toBe('Relax')
  })
})
