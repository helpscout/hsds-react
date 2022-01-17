import React from 'react'
import { mount } from 'enzyme'
import Accordion, { AccordionContext } from '../Accordion'
import Collapsible from '../../Collapsible'
import Section, { SectionContext } from '../Accordion.Section'
import Body, { classNameStrings as classNames } from '../Accordion.Body'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(
      <Accordion duration={0} openSectionIds={[1]}>
        <Section id={1}>
          <Body />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o).toHaveLength(1)
    const el = o.first()
    expect(el.hasClass(classNames.isOpenClassName)).toBe(true)
    expect(el.hasClass(classNames.isPageClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeLgClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeSmClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeXsClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(
      <Accordion isSeamless duration={0} openSectionIds={[1]}>
        <Section id={1}>
          <Body className={className} />
        </Section>
      </Accordion>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`).first()
    expect(el.hasClass(className)).toBe(true)
  })

  test('Applies a className to indicate that the Body is in a seamless accordion', () => {
    const wrapper = mount(
      <Accordion isSeamless duration={0} openSectionIds={[1]}>
        <Section id={1}>
          <Body />
        </Section>
      </Accordion>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`).first()
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Body is in the specified size accordion', () => {
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      const wrapper = mount(
        <Accordion size={size} openSectionIds={[1]}>
          <Section id={1}>
            <Body />
          </Section>
        </Accordion>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      expect(o.hasClass(`is-${size}`)).toBe(true)
    })
  })

  test('Applies a className to indicate that the Body is in an Accordion embedded in a page', () => {
    const wrapper = mount(
      <Accordion isPage openSectionIds={[1]}>
        <Section id={1}>
          <Body />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isPageClassName)).toBe(true)
  })
})

describe('open', () => {
  test('Has no body when closed', () => {
    const wrapper = mount(
      <Accordion duration={0}>
        <Section>
          <Body />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o).toHaveLength(0)
  })

  test('Has body when closed, but preRender set to true', () => {
    const wrapper = mount(
      <Accordion duration={0}>
        <Section>
          <Body preRender />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o).toHaveLength(1)
  })
})

describe('Events', () => {
  test('Fires onOpen callback on open', () => {
    const spy = jest.fn()
    const uuid = 'body001'
    const wrapper = mount(
      <AccordionContext.Provider value={{ onOpen: spy }}>
        <SectionContext.Provider value={{ uuid }}>
          <Body />
        </SectionContext.Provider>
      </AccordionContext.Provider>
    )
    const comp = wrapper.find(Collapsible)

    comp.instance().props.onOpen()

    expect(spy).toHaveBeenCalledWith(uuid)
  })

  test('Fires onClose callback on close', () => {
    const spy = jest.fn()
    const uuid = 'body001'
    const wrapper = mount(
      <AccordionContext.Provider value={{ onClose: spy }}>
        <SectionContext.Provider value={{ uuid }}>
          <Body />
        </SectionContext.Provider>
      </AccordionContext.Provider>
    )
    const comp = wrapper.find(Collapsible)

    comp.instance().props.onClose()

    expect(spy).toHaveBeenCalledWith(uuid)
  })
})
