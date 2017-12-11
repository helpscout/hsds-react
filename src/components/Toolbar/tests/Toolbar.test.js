import React from 'react'
import { shallow } from 'enzyme'
import Toolbar from '../Toolbar'
import { Flexy } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Toolbar className={customClass} />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Toolbar>
        <div className='mugatu'>That Hansel!</div>
      </Toolbar>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(1)
  })
})

describe('Flexy', () => {
  test('Is constructed using Flexy', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find(Flexy)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-Toolbar')).toBe(true)
  })

  test('Passes props to Flexy', () => {
    const wrapper = shallow(<Toolbar just='right' />)
    const o = wrapper.find(Flexy)

    expect(o.prop('just')).toBe('right')
  })
})

describe('Placement', () => {
  test('Has a top placement by default', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-placement-top')).toBe(true)
    expect(o.hasClass('is-placement-bottom')).not.toBe(true)
  })

  test('Can define a bottom placement', () => {
    const wrapper = shallow(<Toolbar placement='bottom' />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-placement-top')).not.toBe(true)
    expect(o.hasClass('is-placement-bottom')).toBe(true)
  })
})

describe('Shadow', () => {
  test('Does not have a shadow, by default', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find(Toolbar.Shadow)

    expect(o.length).toBe(0)
  })

  test('Can add a shadow', () => {
    const wrapper = shallow(<Toolbar shadow />)
    const o = wrapper.find(Toolbar.Shadow)

    expect(o.length).toBe(1)
  })

  test('Passes placement style to shadow ', () => {
    const wrapper = shallow(<Toolbar shadow placement='bottom' />)
    const o = wrapper.find(Toolbar.Shadow)

    expect(o.html()).toContain('is-placement-bottom')
  })
})

describe('seamless', () => {
  test('Does not have a seamless style by default', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-seamless')).not.toBe(true)
  })

  test('Can apply seamless styles', () => {
    const wrapper = shallow(<Toolbar seamless />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-seamless')).toBe(true)
  })
})

describe('Theme', () => {
  test('Has a default theme', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-theme-default')).toBe(true)
    expect(o.hasClass('is-theme-note')).not.toBe(true)
  })

  test('Can define a note theme', () => {
    const wrapper = shallow(<Toolbar theme='note' />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-theme-default')).not.toBe(true)
    expect(o.hasClass('is-theme-note')).toBe(true)
  })
})

describe('Sub-components', () => {
  test('Has correct sub-components', () => {
    expect(Toolbar.Block).toBeTruthy()
    expect(Toolbar.Item).toBeTruthy()
    expect(Toolbar.Shadow).toBeTruthy()
  })
})
