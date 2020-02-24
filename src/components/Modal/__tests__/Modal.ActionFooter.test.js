import * as React from 'react'
import { mount } from 'enzyme'
import ActionFooter from '../Modal.ActionFooter'
import { Toolbar } from '../../index'
import { MODAL_KIND } from '../Modal.utils'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<ActionFooter />)
    const o = wrapper.find('.c-ModalActionFooter').first()

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<ActionFooter className={customClass} />)
    const o = wrapper.find('.c-ModalActionFooter').first()

    expect(o.hasClass(customClass)).toBe(true)
  })

  test('Applies kind = branded className if specified', () => {
    const kindClass = 'is-branded'
    const wrapper = mount(<ActionFooter kind={MODAL_KIND.BRANDED} />)
    const o = wrapper.find('.c-ModalActionFooter').first()

    expect(o.hasClass(kindClass)).toBe(true)
  })

  test('Applies kind = alert className if specified', () => {
    const kindClass = 'is-alert'
    const wrapper = mount(<ActionFooter kind={MODAL_KIND.ALERT} />)
    const o = wrapper.find('.c-ModalActionFooter').first()

    expect(o.hasClass(kindClass)).toBe(true)
  })

  test('Applies kind = sequence className if specified', () => {
    const kindClass = 'is-sequence'
    const wrapper = mount(<ActionFooter kind={MODAL_KIND.SEQUENCE} />)
    const o = wrapper.find('.c-ModalActionFooter').first()

    expect(o.hasClass(kindClass)).toBe(true)
  })

  test('Applies state = danger className if specified', () => {
    const stateClass = 'is-danger'
    const wrapper = mount(
      <ActionFooter kind={MODAL_KIND.ALERT} state={'danger'} />
    )
    const o = wrapper.find('.c-ModalActionFooter').first()

    expect(o.hasClass(stateClass)).toBe(true)
  })
})

describe('Toolbar', () => {
  test('Is composed of Toolbar', () => {
    const wrapper = mount(<ActionFooter />)
    const o = wrapper.find(Toolbar).first()

    expect(o.length).toBe(1)
  })

  test('Has correct Toolbar placement', () => {
    const wrapper = mount(<ActionFooter />)
    const o = wrapper.find(Toolbar).first()

    expect(o.props().placement).toBe('bottom')
  })

  test('Can pass props to Toolbar', () => {
    const wrapper = mount(<ActionFooter shadow seamless />)
    const o = wrapper.find(Toolbar).first()

    expect(o.props().seamless).toBe(true)
    expect(o.props().shadow).toBe(true)
  })
})

describe('Buttons', () => {
  test('Renders Primary Button', () => {
    const clickSpy = jest.fn()
    const buttonText = 'Primary'
    const wrapper = mount(
      <ActionFooter primaryButtonText={buttonText} onPrimaryClick={clickSpy} />
    )
    const o = wrapper.find('.c-ButtonV2.is-primary').first()

    expect(o.length).toBe(1)
    expect(o.text()).toBe(buttonText)

    o.simulate('click')
    expect(clickSpy).toHaveBeenCalled()
  })

  test('Renders Secondary Button', () => {
    const clickSpy = jest.fn()
    const buttonText = 'Secondary'
    const wrapper = mount(
      <ActionFooter
        secondaryButtonText={buttonText}
        onSecondaryClick={clickSpy}
      />
    )
    const o = wrapper.find('.c-ButtonV2.is-secondary').first()

    expect(o.length).toBe(1)
    expect(o.text()).toBe(buttonText)

    o.simulate('click')
    expect(clickSpy).toHaveBeenCalled()
  })

  test('Renders Alert style Secondary Button', () => {
    const clickSpy = jest.fn()
    const buttonText = 'Secondary'
    const wrapper = mount(
      <ActionFooter
        kind={MODAL_KIND.ALERT}
        secondaryButtonText={buttonText}
        onSecondaryClick={clickSpy}
      />
    )
    const o = wrapper.find('.c-ButtonV2.is-secondary').first()

    expect(o.length).toBe(1)
    expect(o.text()).toBe(buttonText)

    o.simulate('click')
    expect(clickSpy).toHaveBeenCalled()
  })

  test('Renders default Cancel Button', () => {
    const clickSpy = jest.fn()
    const buttonText = 'Cancel'
    const wrapper = mount(
      <ActionFooter cancelText={buttonText} onCancel={clickSpy} />
    )
    const o = wrapper.find('.c-ButtonV2.is-default').first()

    expect(o.length).toBe(1)
    expect(o.text()).toBe(buttonText)

    o.simulate('click')
    expect(clickSpy).toHaveBeenCalled()
  })

  test('Hides default Cancel Button if specified', () => {
    const wrapper = mount(<ActionFooter showDefaultCancel={false} />)
    const o = wrapper.find('.c-ButtonV2.is-default').first()

    expect(o.length).toBeFalsy()
  })
})
