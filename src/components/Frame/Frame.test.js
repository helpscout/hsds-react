import React from 'react'
import { mount } from 'enzyme'
import styled from 'styled-components'
import FrameComponent from './index'

const getStyleProp = (node, prop = 'display') =>
  window.getComputedStyle(node)[prop]

describe('Frame', () => {
  let div
  beforeEach(() => {
    window.HSDSPortalWrapperGlobalManager = undefined
    document.body.innerHTML = ''

    div = global.document.createElement('div')
    global.document.body.appendChild(div)
  })

  afterEach(() => {
    if (div) {
      div.remove()
      div = null
    }
    document.body.innerHTML = ''
  })

  test('Can render without children', () => {
    const wrapper = mount(<FrameComponent />, { attachTo: div })
    expect(wrapper.find('iframe').length).toBeTruthy()
  })

  test('Can render a single child', () => {
    const wrapper = mount(
      <FrameComponent>
        <div className="singleChild" />
      </FrameComponent>,
      { attachTo: div }
    )
    expect(wrapper.find('.singleChild').length).toBeTruthy()
  })

  test('Can render a multiple children', () => {
    const wrapper = mount(
      <FrameComponent>
        <div className="element" />
        <div className="element" />
        <div className="element" />
      </FrameComponent>,
      { attachTo: div }
    )

    expect(wrapper.find('.element').length).toBe(3)
  })

  test('Does not affect styles if no iFrame is present', () => {
    const Compo = styled('span')`
      color: red;
    `
    const wrapper = mount(
      <FrameComponent>
        <Compo />
      </FrameComponent>,
      { attachTo: div }
    )
    const el = wrapper.find('span').instance()

    expect(getStyleProp(el, 'color')).toBe('red')
  })
})
