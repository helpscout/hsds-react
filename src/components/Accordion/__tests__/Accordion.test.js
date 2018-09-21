import React from 'react'
import { mount } from 'enzyme'
import Accordion, { classNameStrings as classNames } from '../Accordion'
import Section, { classNameStrings as sectionClassNames } from '../Section'
import Title, { classNameStrings as titleClassNames } from '../Title'
import Body, { classNameStrings as bodyClassNames } from '../Body'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Accordion />)
    expect(wrapper.hasClass(classNames.baseComponentClassName)).toBe(true)
    expect(wrapper.hasClass(classNames.isAllowMulipleClassName)).toBe(false)
    expect(wrapper.hasClass(classNames.isPageClassName)).toBe(false)
    expect(wrapper.hasClass(classNames.isSeamlessClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Accordion className={className} />)
    expect(wrapper.hasClass(className)).toBe(true)
  })

  test(`Applies a className to indicate that the Accordion allows multiple 
        sections to be open simultaneously`, () => {
    const wrapper = mount(<Accordion allowMultiple />)
    expect(wrapper.hasClass(classNames.isAllowMultipleClassName)).toBe(true)
  })

  test(`Applies a className to indicate that the Accordion is mounted inside
        of a Page component`, () => {
    const wrapper = mount(<Accordion isPage />)
    expect(wrapper.hasClass(classNames.isPageClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Accordion is seamless', () => {
    const wrapper = mount(<Accordion isSeamless />)
    expect(wrapper.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render child component', () => {
    const wrapper = mount(
      <Accordion>
        <Section />
      </Accordion>
    )
    expect(
      wrapper.find(`.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
  })

  test('Can render multiple child components', () => {
    const wrapper = mount(
      <Accordion>
        <Section />
        <Section />
        <Section />
      </Accordion>
    )
    expect(
      wrapper.find(`.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(3)
  })

  test('Can render sub-components', () => {
    const wrapper = mount(
      <Accordion>
        <Section>
          <Title />
          <Body />
        </Section>
      </Accordion>
    )
    expect(
      wrapper.find(`.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
    expect(
      wrapper.find(`.${titleClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
    expect(wrapper.find(`.c-Collapsible`)).toHaveLength(1)
  })
})
