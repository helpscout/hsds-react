import * as React from 'react'
import { mount } from 'enzyme'
import Content from '../Page.Content'
import { PageContext } from '../Page'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Content />)

    expect(wrapper.getDOMNode().classList.contains('c-PageContent')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Content className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = mount(<Content>Channel 4</Content>)

    expect(wrapper.text()).toBe('Channel 4')
  })

  test('Can render child component', () => {
    const wrapper = mount(
      <Content>
        <div className="ron">Channel 4</div>
      </Content>
    )

    expect(wrapper.find('div.ron').length).toBe(1)
  })
})

describe('Responsive', () => {
  test('Renders responsive styles, if specified', () => {
    const wrapper = mount(
      <PageContext.Provider value={{ isResponsive: true }}>
        <Content />
      </PageContext.Provider>
    )

    expect(
      wrapper
        .find(Content)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(true)
  })

  test('Does not render responsive styles, if specified', () => {
    const wrapper = mount(
      <PageContext.Provider value={{ isResponsive: false }}>
        <Content />
      </PageContext.Provider>
    )

    expect(
      wrapper
        .find(Content)
        .getDOMNode()
        .classList.contains('is-responsive')
    ).toBe(false)
  })
})
