import React from 'react'
import { mount } from 'enzyme'
import Header from '../Header'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Header />)

    expect(wrapper.hasClass('c-PageHeader')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Header className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not renders child content', () => {
    const wrapper = mount(<Header>Channel 4</Header>)

    expect(wrapper.text()).not.toBe('Channel 4')
  })
})

describe('Title', () => {
  test('Can render a title', () => {
    const wrapper = mount(<Header title="Channel 4" />)

    expect(wrapper.text()).toContain('Channel 4')
  })

  test('Can render a subtitle', () => {
    const wrapper = mount(<Header title="Channel 4" subtitle="News team" />)

    expect(wrapper.text()).toContain('Channel 4')
    expect(wrapper.text()).toContain('News team')
  })
})

describe('Border', () => {
  test('Renders a border', () => {
    const wrapper = mount(<Header title="Channel 4" />)

    expect(wrapper.hasClass('is-withBorder')).toBe(true)
  })

  test('Can not render a border, if specified', () => {
    const wrapper = mount(<Header title="Channel 4" withBorder={false} />)

    expect(wrapper.hasClass('is-withBorder')).toBe(false)
  })
})

describe('Responsive', () => {
  test('Renders responsive styles, if specified', () => {
    const wrapper = mount(<Header isResponsive={true} />)

    expect(wrapper.hasClass('is-responsive')).toBe(true)
  })

  test('Does not render responsive styles, if specified', () => {
    const wrapper = mount(<Header isResponsive={false} />)

    expect(wrapper.hasClass('is-responsive')).toBe(false)
  })
})

describe('withBottomMargin', () => {
  test('Renders withBottomMargin styles, if specified', () => {
    const wrapper = mount(<Header withBottomMargin={true} />)

    expect(wrapper.hasClass('is-withBottomMargin')).toBe(true)
  })

  test('Does not render withBottomMargin styles, if specified', () => {
    const wrapper = mount(<Header withBottomMargin={false} />)

    expect(wrapper.hasClass('is-withBottomMargin')).toBe(false)
  })
})
