import React from 'react'
import { mount } from 'enzyme'
import Tooltip, { TooltipContext } from './index'
import Tippy from '@tippyjs/react/headless'

jest.mock('@tippyjs/react/headless', () => {
  const Tippy = ({ children }) => <div>{children}</div>
  return Tippy
})

describe('classNames', () => {
  test('Can accept custom className', () => {
    const wrapper = mount(
      <Tooltip className="derek">
        <div />
      </Tooltip>
    )

    expect(wrapper.hasClass('derek')).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Tooltip title="Pop">
        <div className="ron" />
      </Tooltip>
    )
    const el = wrapper.find('.ron')

    expect(el.length).toBeTruthy()
  })

  test('Wraps the chidlren with a span', () => {
    const wrapper = mount(
      <Tooltip title="Pop">
        <div className="ron" />
      </Tooltip>
    )

    expect(wrapper.find('.TooltipTrigger').first().hasClass('ron')).toBeFalsy()
  })

  test('Can render directly a children', () => {
    const wrapper = mount(
      <Tooltip title="Pop" withTriggerWrapper={false}>
        <div className="ron" />
      </Tooltip>
    )

    expect(wrapper.find('.TooltipTrigger').hasClass('ron')).toBeTruthy()
  })
})

describe('Tippy', () => {
  test('Renders a Tippy component', () => {
    const wrapper = mount(<Tooltip title="Tippy" />)
    const pop = wrapper.find(Tippy)

    expect(pop.length).toBeTruthy()
  })

  test('Renders a Pop component via renderContent', () => {
    const wrapper = mount(<Tooltip renderContent={() => <div />} />)
    const pop = wrapper.find(Tippy)

    expect(pop.length).toBeTruthy()
  })

  test('Passes props to internal Tippy component', () => {
    const props = {
      placement: 'bottom',
      triggerOn: 'click',
      title: 'Pop',
    }
    const wrapper = mount(<Tooltip {...props} />)
    const pop = wrapper.find(Tippy).props()

    expect(pop.placement).toBe(props.placement)
    expect(pop.triggerOn).toBe(props.trigger)
  })

  test('Passes interactive props when closeOnContentClick is false', () => {
    const props = {
      placement: 'bottom',
      triggerOn: 'click',
      title: 'Pop',
      closeOnContentClick: false,
    }
    const wrapper = mount(<Tooltip {...props} />)
    const pop = wrapper.find(Tippy).props()
    expect(pop.interactive).toBeTruthy()
    expect(pop.interactiveBorder).toBeTruthy()
  })

  test('Passes isOpen props to Tippy', () => {
    const props = {
      placement: 'bottom',
      triggerOn: 'click',
      title: 'Pop',
      isOpen: true,
    }
    const wrapper = mount(<Tooltip {...props} />)
    const pop = wrapper.find(Tippy).props()
    expect(pop.showOnCreate).toBeTruthy()
  })

  test('Forces z-index', () => {
    const props = {
      title: 'Pop',
      zIndex: 1243,
    }
    const wrapper = mount(<Tooltip {...props} />)
    const pop = wrapper.find(Tippy).props()
    expect(pop.zIndex).toBe(1243)
  })

  test.only("Controlled component should'nt pass down trigger and showOnCreate props ", () => {
    const props = {
      placement: 'bottom',
      triggerOn: 'click',
      title: 'Pop',
      visible: true,
    }
    const wrapper = mount(<Tooltip {...props} />)
    const pop = wrapper.find(Tippy).props()
    expect(pop.showOnCreate).toBeFalsy()
    expect(pop.trigger).toBeFalsy()
  })
})

describe('Context', () => {
  test('Overwrite z-index with context', () => {
    const props = {
      title: 'Pop',
    }
    const wrapper = mount(
      <TooltipContext.Provider value={{ zIndex: 1234 }}>
        <Tooltip {...props} />
      </TooltipContext.Provider>
    )
    const pop = wrapper.find(Tippy).props()
    expect(pop.zIndex).toBe(1234)
  })
})
