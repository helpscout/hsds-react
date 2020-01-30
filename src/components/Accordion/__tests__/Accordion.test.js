import React from 'react'
import { mount } from 'enzyme'
import Accordion, { classNameStrings as classNames } from '../Accordion'
import Section, {
  classNameStrings as sectionClassNames,
} from '../Accordion.Section'
import Title, { classNameStrings as titleClassNames } from '../Accordion.Title'
import Body, { classNameStrings as bodyClassNames } from '../Accordion.Body'
import Collapsible from '../../Collapsible'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Accordion />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.length).toBe(1)
    expect(el.hasClass(classNames.isAllowMulipleClassName)).toBe(false)
    expect(el.hasClass(classNames.isPageClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Accordion className={className} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(className)).toBe(true)
  })

  test(`Applies a className to indicate that the Accordion allows multiple
        sections to be open simultaneously`, () => {
    const wrapper = mount(<Accordion allowMultiple />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isAllowMultipleClassName)).toBe(true)
  })

  test(`Applies a className to indicate that the Accordion is mounted inside
        of a Page component`, () => {
    const wrapper = mount(<Accordion isPage />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isPageClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Accordion is seamless', () => {
    const wrapper = mount(<Accordion isSeamless />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(true)
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
      wrapper.find(`div.${sectionClassNames.baseComponentClassName}`)
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
      wrapper.find(`div.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(3)
  })

  test('Can render sub-components', () => {
    const wrapper = mount(
      <Accordion duration={0}>
        <Section isOpen>
          <Title />
          <Body />
        </Section>
      </Accordion>
    )
    expect(
      wrapper.find(`div.${sectionClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
    expect(
      wrapper.find(`div.${titleClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
    expect(
      wrapper.find(`div.${bodyClassNames.baseComponentClassName}`)
    ).toHaveLength(1)
  })
})

describe('State', () => {
  test('It should only track the value of one section if allow multiple is not enabled', () => {
    const wrapper = mount(
      <Accordion>
        <Accordion.Section>
          <Accordion.Title>Title 1</Accordion.Title>
        </Accordion.Section>
        <Accordion.Section>
          <Accordion.Title>Title 2</Accordion.Title>
        </Accordion.Section>
      </Accordion>
    )

    expect(wrapper.find('.is-open').length).toEqual(0)
    wrapper
      .find(Accordion.Title)
      .first()
      .simulate('click')
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .first()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .last()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeFalsy()

    wrapper
      .find(Accordion.Title)
      .last()
      .simulate('click')
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .first()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeFalsy()
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .last()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeTruthy()
  })

  test('It should track the value of multiple sections if allow multiple is enabled', () => {
    const wrapper = mount(
      <Accordion allowMultiple>
        <Accordion.Section>
          <Accordion.Title>Title 1</Accordion.Title>
        </Accordion.Section>
        <Accordion.Section>
          <Accordion.Title>Title 2</Accordion.Title>
        </Accordion.Section>
      </Accordion>
    )

    expect(wrapper.find('.is-open').length).toEqual(0)
    wrapper
      .find(Accordion.Title)
      .first()
      .simulate('click')
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .first()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .last()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeFalsy()

    wrapper
      .find(Accordion.Title)
      .last()
      .simulate('click')
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .first()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .last()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeTruthy()
  })

  test('It should track the value of all programatically opened sections', () => {
    const wrapper = mount(
      <Accordion openSectionIds={[1]}>
        <Accordion.Section id={1}>
          <Accordion.Title>Title 1</Accordion.Title>
        </Accordion.Section>
        <Accordion.Section id={2}>
          <Accordion.Title>Title 2</Accordion.Title>
        </Accordion.Section>
      </Accordion>
    )

    expect(
      wrapper
        .find('.c-Accordion__Section')
        .first()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeTruthy()
    wrapper.setProps({ openSectionIds: [4, 5, 6] })
    expect(
      wrapper
        .find('.c-Accordion__Section')
        .first()
        .getDOMNode()
        .classList.contains('is-open')
    ).toBeFalsy()
  })
})
