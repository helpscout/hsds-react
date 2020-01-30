import React from 'react'
import { mount } from 'enzyme'
import Accordion, { AccordionContext } from '../Accordion'
import Section, {
  classNameStrings as classNames,
  SectionContext,
} from '../Accordion.Section'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Section />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.baseComponentClassName)).toBe(true)
    expect(el.hasClass(classNames.isOpenClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Section className={className} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(className)).toBe(true)
  })

  test('Applies a className to indicate that the Section is open', () => {
    const wrapper = mount(<Section isOpen />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isOpenClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Section is in a seamless Accordion', () => {
    const wrapper = mount(
      <Accordion isSeamless>
        <Section />
      </Accordion>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })
})

describe('Uuid', () => {
  test('Has a unique id', cb => {
    mount(
      <Section>
        <SectionContext.Consumer>
          {({ uuid }) => {
            expect(uuid).toContain('AccordionSection')
            cb()
          }}
        </SectionContext.Consumer>
      </Section>
    )
  })
})

describe('isOpen', () => {
  test('Renders open styles, if defined', () => {
    const uuid = 'myuuid'
    const sections = { [uuid]: true }
    const wrapper = mount(
      <AccordionContext.Provider value={{ sections }}>
        <Section id={uuid} />
      </AccordionContext.Provider>
    )
    const el = wrapper.find(Section)

    expect(el.getDOMNode().classList.contains('is-open')).toBeTruthy()
  })

  test('Always render non-open styles, if isLink', () => {
    const uuid = 'myuuid'
    const sections = { [uuid]: true }
    const wrapper = mount(
      <AccordionContext.Provider value={{ sections }}>
        <Section isLink={true} id={uuid} />
      </AccordionContext.Provider>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.getDOMNode().classList.contains('is-open')).toBeFalsy()
  })
})
