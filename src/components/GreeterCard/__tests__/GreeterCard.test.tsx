import * as React from 'react'
import { mount, render } from 'enzyme'
import { GreeterCard } from '../GreeterCard'
import {
  TitleUI,
  SubtitleUI,
  BodyUI,
  ActionUI,
} from '../styles/GreeterCard.css'
import { Animate } from '../../index'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<GreeterCard />)
    const el = wrapper.find('.c-GreeterCard')

    expect(el.length).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<GreeterCard className={customClassName} />)
    const el = wrapper.find('.c-GreeterCard')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Align', () => {
  test('Has default alignment of right', () => {
    const wrapper = mount(<GreeterCard />)
    const el = wrapper.find('div.c-GreeterCard')

    expect(el.getDOMNode().classList.contains('is-align-right')).toBeTruthy()
  })

  test('Can change alignment styles, if specified', () => {
    const wrapper = mount(<GreeterCard align="left" />)
    const el = wrapper.find('div.c-GreeterCard')

    expect(el.getDOMNode().classList.contains('is-align-left')).toBeTruthy()
  })
})

describe('Animation', () => {
  test('Can customize animationSequence', () => {
    const wrapper = mount(<GreeterCard animationSequence="scale" />)
    const o = wrapper.find(Animate)

    expect(o.prop('sequence')).toBe('scale')
  })

  test('Can customize animationEasing', () => {
    const wrapper = mount(<GreeterCard animationEasing="linear" />)
    const o = wrapper.find(Animate)

    expect(o.prop('easing')).toBe('linear')
  })

  test('Can customize animationDuration', () => {
    const wrapper = mount(<GreeterCard animationDuration={123} />)
    const o = wrapper.find(Animate)

    expect(o.prop('duration')).toBe(123)
  })
})

describe('Body', () => {
  test('Does not render body if is not passed down as a prop', () => {
    const wrapper = mount(<GreeterCard />)
    const o = wrapper.find(BodyUI)

    expect(o.length).toBe(0)
  })

  test('Renders body if it is passed down as a prop', () => {
    const wrapper = mount(<GreeterCard body="Santa!" />)
    const o = wrapper.find(BodyUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('Title', () => {
  test('Does not render title if is not passed down as a prop', () => {
    const wrapper = mount(<GreeterCard />)
    const o = wrapper.find(TitleUI)

    expect(o.length).toBe(0)
  })

  test('Renders title if it is passed down as a prop', () => {
    const wrapper = mount(<GreeterCard title="Santa!" />)
    const o = wrapper.find(TitleUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('Subtitle', () => {
  test('Does not render subtitle if is not passed down as a prop', () => {
    const wrapper = mount(<GreeterCard />)
    const o = wrapper.find(SubtitleUI)

    expect(o.length).toBe(0)
  })

  test('Renders subtitle if it is passed down as a prop', () => {
    const wrapper = mount(<GreeterCard subtitle="Santa!" />)
    const o = wrapper.find(SubtitleUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('Action', () => {
  test('Does not render action if is not passed down as a prop', () => {
    const wrapper = mount(<GreeterCard />)
    const o = wrapper.find(ActionUI)

    expect(o.length).toBe(0)
  })

  test('Renders action if it is passed down as a prop', () => {
    const action = () => <div>Click here</div>
    const wrapper = mount(<GreeterCard action={action} />)
    const o = wrapper.find(ActionUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Click here')
  })

  test('Should remove the box shadow', () => {
    const wrapper = mount(<GreeterCard isNoBoxShadow={true} />)
    const el = wrapper.find('div.c-GreeterCard')

    expect(el.getDOMNode().classList.contains('is-no-box-shadow')).toBeTruthy()
  })
})
