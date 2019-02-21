import React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import { SectionHeadingUI, SectionUI } from '../SideNavigation.css'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.Section />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__Section')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation.Section className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })

  test('Applies withPadding classname', () => {
    const wrapper = mount(<SideNavigation.Section withPadding={true} />)

    expect(
      wrapper.getDOMNode().classList.contains('is-with-padding')
    ).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <SideNavigation.Section>
        <div className="child">Hello</div>
      </SideNavigation.Section>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Heading', () => {
  test('Renders heading component', () => {
    const title = 'Folders'
    const wrapper = mount(<SideNavigation.Section title={title} />)
    const el = wrapper.find(SectionHeadingUI)

    expect(el.text()).toContain(title)
  })
})

describe('Collapsing', () => {
  test('Does not render section if collapsed', () => {
    const wrapper = mount(<SideNavigation.Section collapsed={true} />)

    expect(wrapper.find(SectionUI)).toHaveLength(0)
  })
  test('Renders section if collapsed but set as main section', () => {
    const wrapper = mount(
      <SideNavigation.Section collapsed={true} main={true} />
    )

    expect(wrapper.find(SectionUI)).toHaveLength(1)
  })
})
