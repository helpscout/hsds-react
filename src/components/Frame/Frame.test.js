import React from 'react'
import { mount } from 'enzyme'
import cy from '@helpscout/cyan'
import styled, { __PRIVATE__ } from 'styled-components'
import FrameComponent from './index'

const { masterSheet } = __PRIVATE__

const getStyleProp = (node, prop = 'display') =>
  window.getComputedStyle(node)[prop]

const resetStyleTags = () => {
  masterSheet.names = new Map()
  masterSheet.clearTag()
}

function getClassListAsString(wrappedComponent) {
  return wrappedComponent.getDOMNode().classList.toString()
}

function getEmotionClassName(wrappedComponent) {
  const classList = getClassListAsString(wrappedComponent).split(' ')
  return classList.find(c => c.includes('css-'))
}

describe('Frame', () => {
  afterEach(() => {
    resetStyleTags()
  })

  test('Can render without children', () => {
    const wrapper = mount(<FrameComponent />)
    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can render a single child', () => {
    const wrapper = mount(
      <FrameComponent>
        <div className="singleChild" />
      </FrameComponent>
    )
    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can render a multiple children', () => {
    const wrapper = mount(
      <FrameComponent>
        <div />
        <div />
        <div />
      </FrameComponent>
    )

    expect(wrapper.instance()).toBeTruthy()
  })

  // TODO: fix test
  // test('Does not affect styles if no iFrame is present', () => {
  //   const Compo = styled('span')`
  //     color: red;
  //   `
  //   const wrapper = mount(
  //     <FrameComponent>
  //       <Compo />
  //     </FrameComponent>
  //   )
  //   const el = wrapper.find('span').getNode()

  //   expect(getStyleProp(el, 'color')).toBe('red')
  // })

  // TODO: fix test
  // test('Can extend/merge styles within an iFrame', () => {
  //   const One = styled('span')`
  //     color: red;
  //   `

  //   const Two = styled(One)`
  //     background: white;
  //     padding: 20px;
  //   `

  //   const wrapper = mount(
  //     <FrameComponent>
  //       <div>
  //         <One className="one" />
  //         <Two className="two" />
  //       </div>
  //     </FrameComponent>
  //   )

  //   const first = wrapper.find('.one')
  //   const second = wrapper.find('.two')

  //   const firstClassList = getClassListAsString(first).split(' ')
  //   const secondClassList = getClassListAsString(second).split(' ')

  //   expect(firstClassList.length).toBe(secondClassList.length)
  //   expect(getEmotionClassName(first)).not.toEqual(getEmotionClassName(second))
  // })
})
