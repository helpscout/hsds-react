import React from 'react'
import { mount } from 'enzyme'
import Accordion, { AccordionContext } from '../Accordion'
import Section, { SectionContext } from '../Accordion.Section'
import Title, { classNameStrings as classNames } from '../Accordion.Title'
import Keys from '../../../constants/Keys'
import { MemoryRouter as Router } from 'react-router-dom'

const wrap = fn => Component => fn(<Router>{Component}</Router>)
const mountWithRouter = wrap(mount)

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Title />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(classNames.baseComponentClassName)).toBe(true)
    expect(el.hasClass(classNames.isOpenClassName)).toBe(false)
    expect(el.hasClass(classNames.isPageClassName)).toBe(false)
    expect(el.hasClass(classNames.isSeamlessClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeLgClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeMdClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeSmClassName)).toBe(false)
    expect(el.hasClass(classNames.isSizeXsClassName)).toBe(false)
  })

  test('Applies custom className if specified', () => {
    const className = 'kustom'
    const wrapper = mount(<Title className={className} />)
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass(className)).toBe(true)
  })

  test('Applies a className to indicate that the Title is in an open section', () => {
    const wrapper = mount(
      <Accordion openSectionIds={['1']}>
        <Section id={'1'}>
          <Title />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isOpenClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Title is in a seamless accordion', () => {
    const wrapper = mount(
      <Accordion isSeamless>
        <Section>
          <Title />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isSeamlessClassName)).toBe(true)
  })

  test('Applies a className to indicate that the Title is in the specified size accordion', () => {
    ;['xs', 'sm', 'md'].forEach(size => {
      const wrapper = mount(
        <Accordion size={size}>
          <Section>
            <Title />
          </Section>
        </Accordion>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      expect(o.hasClass(`is-${size}`)).toBe(true)
    })
  })

  test('Applies a className to indicate that the Title is in an Accordion embedded in a page', () => {
    const wrapper = mount(
      <Accordion isPage>
        <Section>
          <Title />
        </Section>
      </Accordion>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
    expect(o.hasClass(classNames.isPageClassName)).toBe(true)
  })
})

describe('setSectionState', () => {
  test('Attempts to open the section by uuid when clicked', () => {
    const spy = jest.fn()
    const uuid = 'test'
    const wrapper = mount(
      <AccordionContext.Provider value={{ setSectionState: spy }}>
        <Section>
          <SectionContext.Provider value={{ uuid }}>
            <Title />
          </SectionContext.Provider>
        </Section>
      </AccordionContext.Provider>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)

    o.simulate('click')

    expect(spy).toBeCalledWith(uuid, true)
  })

  test('Dont call the setSectionState method if the onClick event is prevented when clicked', () => {
    const spy = jest.fn()
    const uuid = 'test'
    const wrapper = mount(
      <AccordionContext.Provider value={{ setSectionState: spy }}>
        <Section>
          <SectionContext.Provider value={{ uuid }}>
            <Title onClick={e => e.stopPropagation()} />
          </SectionContext.Provider>
        </Section>
      </AccordionContext.Provider>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)

    o.simulate('click')

    expect(spy).not.toBeCalled()
  })

  test('Attempts to close the open section by uuid when clicked', () => {
    // here
    const spy = jest.fn()
    const uuid = 'test'
    const wrapper = mount(
      <AccordionContext.Provider
        value={{ setSectionState: spy, openSections: [uuid] }}
      >
        <Section id={uuid}>
          <Title />
        </Section>
      </AccordionContext.Provider>
    )
    const o = wrapper.find(`div.${classNames.baseComponentClassName}`)

    o.simulate('click')
    expect(spy).toBeCalledWith(uuid, false)
  })

  test('Attempts to open the section by uuid when the enter or space key is pressed', () => {
    // here
    ;[Keys.ENTER, Keys.SPACE].forEach(keyCode => {
      const spy = jest.fn()
      const uuid = 'test'
      const wrapper = mount(
        <AccordionContext.Provider value={{ setSectionState: spy }}>
          <Section>
            <SectionContext.Provider value={{ uuid }}>
              <Title />
            </SectionContext.Provider>
          </Section>
        </AccordionContext.Provider>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      o.simulate('keydown', { keyCode })
      expect(spy).toBeCalledWith(uuid, true)
    })
  })

  test('Attempts to close the open section by uuid when the enter or space key is pressed', () => {
    // here
    ;[Keys.ENTER, Keys.SPACE].forEach(keyCode => {
      const spy = jest.fn()
      const uuid = 'test'
      const wrapper = mount(
        <AccordionContext.Provider
          value={{ setSectionState: spy, openSections: [uuid] }}
        >
          <Section id={uuid}>
            <Title />
          </Section>
        </AccordionContext.Provider>
      )
      const o = wrapper.find(`div.${classNames.baseComponentClassName}`)
      o.simulate('keydown', { keyCode })
      expect(spy).toBeCalledWith(uuid, false)
    })
  })
})

describe('Link', () => {
  test('Renders a link, if to is defined', () => {
    const wrapper = mountWithRouter(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title to="/" />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`a.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-link')).toBeTruthy()
  })

  test('Renders a link, if href is defined', () => {
    const wrapper = mountWithRouter(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title href="/" />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`a.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-link')).toBeTruthy()
  })

  test('Adjusts caret size, if link', () => {
    const wrapper = mountWithRouter(<Title />)
    let icon = wrapper.find('Icon').first()

    expect(icon.prop('size')).toBe(14)

    wrapper.setProps({ href: '/' })
    icon = wrapper.find('Icon').first()

    expect(icon.prop('size')).toBe(14)
  })
})

describe('isOpen', () => {
  test('Renders open styles, if defined', () => {
    const wrapper = mountWithRouter(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`div.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-open')).toBeTruthy()
  })

  test('Always render non-open styles, if isLink', () => {
    const wrapper = mountWithRouter(
      <SectionContext.Provider value={{ isOpen: true }}>
        <Title to="/" />
      </SectionContext.Provider>
    )
    const el = wrapper.find(`a.${classNames.baseComponentClassName}`)

    expect(el.hasClass('is-open')).toBeFalsy()
  })
})

describe('Events', () => {
  test('onClick callback works', () => {
    const spy = jest.fn()
    const wrapper = mountWithRouter(<Title onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback works for links', () => {
    const spy = jest.fn()
    const wrapper = mountWithRouter(<Title onClick={spy} to="/" />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('dragHandle', () => {
  test('Does not render drag handle if not sortable', () => {
    const wrapper = mount(<Title />)
    expect(wrapper.find('.c-SortableDragHandle')).toHaveLength(0)
  })

  test('Does render drag handle if sortable', () => {
    const wrapper = mount(
      <AccordionContext.Provider value={{ isSortable: true }}>
        <Title />
      </AccordionContext.Provider>
    )
    const handle = wrapper.find('.c-SortableDragHandle')
    expect(handle.length).toBeTruthy()
    expect(handle.first().hasClass('drag-handle')).toBe(true)
  })

  test('Conditionally applies a className to indicate that the drag handle is in a page', () => {
    const wrapper = mount(
      <AccordionContext.Provider value={{ isPage: true, isSortable: true }}>
        <Title />
      </AccordionContext.Provider>
    )
    expect(
      wrapper
        .find('.c-SortableDragHandle')
        .first()
        .hasClass(classNames.isPageClassName)
    ).toBe(true)
  })
})
