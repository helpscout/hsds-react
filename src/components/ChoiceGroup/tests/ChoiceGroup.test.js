import React from 'react'
import { mount, shallow } from 'enzyme'
import ChoiceGroup from '..'
import FormGroup from '../../FormGroup'
import Checkbox from '../../Checkbox'
import Radio from '../../Radio'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<ChoiceGroup className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(<ChoiceGroup><Radio /></ChoiceGroup>)
    const el = wrapper.find(Radio)

    expect(el.length).toBeTruthy()
    wrapper.unmount()
  })

  test('Renders multiple child content', () => {
    const wrapper = mount(
      <ChoiceGroup>
        <Radio />
        <Radio />
        <Radio />
      </ChoiceGroup>
    )
    const component = wrapper.find(ChoiceGroup)
    const el = wrapper.find(Radio)

    expect(el.length).toBe(3)
    expect(component.hasClass('is-multi-select')).toBeFalsy()
    wrapper.unmount()
  })

  test('Wraps child component in a FormGroup.Choice', () => {
    const wrapper = mount(
      <ChoiceGroup>
        <Radio />
        <Radio />
        <Radio />
      </ChoiceGroup>
    )
    const formGroup = wrapper.find(FormGroup.Choice)
    const radio = wrapper.find(Radio)

    expect(formGroup.length).toBe(3)
    expect(radio.length).toBe(3)
    expect(formGroup.first().find(Radio).length).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChoiceGroup onBlur={spy}>
        <Radio />
        <Radio />
        <Radio />
      </ChoiceGroup>
    )
    const input = wrapper.find('.c-Radio').first().find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChoiceGroup onFocus={spy}>
        <Radio />
        <Radio />
        <Radio />
      </ChoiceGroup>
    )
    const input = wrapper.find('.c-Radio').first().find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })

  test('Can trigger onChange callback', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChoiceGroup onChange={spy}>
        <Radio value='1' />
        <Radio value='2' />
        <Radio value='3' />
      </ChoiceGroup>
    )
    const input = wrapper.find('.c-Radio').first().find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalledWith(['1'])
    wrapper.unmount()
  })

  test('Can trigger onChange callback for multiSelect', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChoiceGroup onChange={spy}>
        <Checkbox value='1' />
        <Checkbox value='2' />
        <Checkbox value='3' />
      </ChoiceGroup>
    )
    const input = wrapper.find('input')

    input.last().simulate('change')
    expect(spy).toHaveBeenCalledWith(['3'])

    wrapper.unmount()
  })
})

describe('MultiSelect', () => {
  test('Has multi-select className, if applicable', () => {
    const wrapper = mount(
      <ChoiceGroup value='katinka'>
        <Checkbox value='derek' />
        <Checkbox value='hansel' />
        <Checkbox value='mugatu' />
      </ChoiceGroup>
    )
    const o = wrapper.find(ChoiceGroup)

    expect(o.hasClass('is-multi-select')).toBeTruthy()
    wrapper.unmount()
  })

  test('Does not have multiSelect className, if applicable', () => {
    const wrapper = mount(
      <ChoiceGroup value='katinka'>
        <Radio value='derek' />
        <Radio value='hansel' />
        <Radio value='mugatu' />
      </ChoiceGroup>
    )
    const o = wrapper.find(ChoiceGroup)

    expect(o.hasClass('is-multi-select')).not.toBeTruthy()
    wrapper.unmount()
  })

  test('Does not multiSelect for Radio children', () => {
    const wrapper = mount(
      <ChoiceGroup value='katinka'>
        <Radio value='derek' />
        <Radio value='hansel' />
        <Radio value='mugatu' />
      </ChoiceGroup>
    )
    const o = wrapper.find(ChoiceGroup)

    expect(o.node.multiSelect).toBeFalsy()
    wrapper.unmount()
  })

  test('Does auto-multiSelect for Checkbox children', () => {
    const wrapper = mount(
      <ChoiceGroup value='katinka'>
        <Checkbox value='derek' />
        <Checkbox value='hansel' />
        <Checkbox value='mugatu' />
      </ChoiceGroup>
    )
    const o = wrapper.find(ChoiceGroup)

    expect(o.node.multiSelect).toBeTruthy()
    wrapper.unmount()
  })

  test('Can disable multiSelect for Checbox children, if defined', () => {
    const wrapper = mount(
      <ChoiceGroup value='katinka' multiSelect={false}>
        <Checkbox value='derek' />
        <Checkbox value='hansel' />
        <Checkbox value='mugatu' />
      </ChoiceGroup>
    )
    const o = wrapper.find(ChoiceGroup)

    expect(o.node.multiSelect).not.toBeTruthy()
    wrapper.unmount()
  })
})

describe('Name', () => {
  test('Applies name to child Choice components', () => {
    const wrapper = mount(
      <ChoiceGroup name='MUGATU'>
        <Radio />
        <Radio />
        <Radio />
      </ChoiceGroup>
    )

    expect(wrapper.find(Radio).first().props().name).toBe('MUGATU')
    wrapper.unmount()
  })
})

describe('Value', () => {
  test('Does not check any Choices if value does not match', () => {
    const wrapper = mount(
      <ChoiceGroup value='katinka'>
        <Radio value='derek' />
        <Radio value='hansel' />
        <Radio value='mugatu' />
      </ChoiceGroup>
    )
    const radios = wrapper.find(Radio)

    expect(radios.get(0).props.checked).toBeFalsy()
    expect(radios.get(1).props.checked).toBeFalsy()
    expect(radios.get(2).props.checked).toBeFalsy()

    wrapper.unmount()
  })

  test('Checks a Choice if value matches', () => {
    const wrapper = mount(
      <ChoiceGroup value='hansel'>
        <Radio value='derek' />
        <Radio value='hansel' />
        <Radio value='mugatu' />
      </ChoiceGroup>
    )
    const radios = wrapper.find(Radio)

    expect(radios.get(0).props.checked).toBeFalsy()
    expect(radios.get(1).props.checked).toBeTruthy()
    expect(radios.get(2).props.checked).toBeFalsy()

    wrapper.unmount()
  })

  test('Can check multiple values', () => {
    const values = ['derek', 'hansel']
    const wrapper = mount(
      <ChoiceGroup value={values}>
        <Radio value='derek' />
        <Radio value='hansel' />
        <Radio value='mugatu' />
      </ChoiceGroup>
    )
    const radios = wrapper.find(Radio)

    expect(radios.get(0).props.checked).toBeTruthy()
    expect(radios.get(1).props.checked).toBeTruthy()
    expect(radios.get(2).props.checked).toBeFalsy()

    wrapper.unmount()
  })

  test('Deselects checked value on click', () => {
    const values = ['derek', 'hansel']
    const wrapper = mount(
      <ChoiceGroup value={values}>
        <Checkbox value='derek' />
        <Checkbox value='hansel' />
        <Checkbox value='mugatu' />
      </ChoiceGroup>
    )
    const input = wrapper.find('input')

    input.first().simulate('change')

    expect(wrapper.state().selectedValue).not.toContain('derek')
    expect(wrapper.state().selectedValue).toContain('hansel')

    wrapper.unmount()
  })
})
