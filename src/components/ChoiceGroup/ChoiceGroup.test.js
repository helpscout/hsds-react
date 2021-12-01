import React from 'react'
import { mount } from 'enzyme'
import ChoiceGroup from './ChoiceGroup'
import FormGroup from '../FormGroup'
import Checkbox from '../Checkbox'
import Radio from '../Radio'

describe('ChoiceGroup', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<ChoiceGroup className={customClass} />)

      expect(wrapper.prop('className')).toContain(customClass)
    })
  })

  describe('Children', () => {
    test('Renders child content', () => {
      const wrapper = mount(
        <ChoiceGroup>
          <Radio />
        </ChoiceGroup>
      )
      const el = wrapper.find(Radio)

      expect(el.length).toBeTruthy()
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
    })

    test('Can trigger onChange callback', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy}>
          <Radio value="1" />
          <Radio value="2" />
          <Radio value="3" />
        </ChoiceGroup>
      )
      const input = wrapper.find('.c-Radio').first().find('input')

      input.simulate('change', { target: { checked: true } })

      expect(spy).toHaveBeenCalledWith(['1'])
    })

    test('Can trigger onEnter callback', () => {
      const enterSpy = jest.fn()
      const changeSpy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onEnter={enterSpy} onChange={changeSpy}>
          <Radio value="1" />
          <Radio value="2" />
          <Radio value="3" />
        </ChoiceGroup>
      )
      const input = wrapper.find('.c-Radio').first().find('input')

      input.simulate('keydown', { key: 'Enter' })

      expect(enterSpy).toHaveBeenCalled()
      expect(changeSpy).toHaveBeenCalled()
    })

    test('Can trigger onEnter callback with space', () => {
      const enterSpy = jest.fn()
      const changeSpy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onEnter={enterSpy} onChange={changeSpy}>
          <Radio value="1" />
          <Radio value="2" />
          <Radio value="3" />
        </ChoiceGroup>
      )
      const input = wrapper.find('.c-Radio').first().find('input')

      input.simulate('keyup', { key: ' ' })

      expect(enterSpy).toHaveBeenCalled()
      expect(changeSpy).toHaveBeenCalled()
    })
  })

  describe('MultiSelect', () => {
    test('Has multi-select className, if applicable', () => {
      const wrapper = mount(
        <ChoiceGroup value="katinka">
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const o = wrapper.find('div.c-ChoiceGroup')

      expect(o.hasClass('is-multi-select')).toBeTruthy()
    })

    test('Does not have multiSelect className, if applicable', () => {
      const wrapper = mount(
        <ChoiceGroup value="katinka" multiSelect={false}>
          <Radio value="derek" />
          <Radio value="hansel" />
          <Radio value="mugatu" />
        </ChoiceGroup>
      )
      const o = wrapper.find('div.c-ChoiceGroup')

      expect(o.hasClass('is-multi-select')).not.toBeTruthy()
    })

    test('Can multiSelect', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find(Checkbox).at(0).find('input')
      const input2 = wrapper.find(Checkbox).at(1).find('input')
      const input3 = wrapper.find(Checkbox).at(2).find('input')

      input.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek'])

      input2.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek', 'hansel'])

      input3.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek', 'hansel', 'mugatu'])
    })

    test('multiSelect can be turned off', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy} multiSelect={false}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find(Checkbox).at(0).find('input')
      const input2 = wrapper.find(Checkbox).at(1).find('input')
      const input3 = wrapper.find(Checkbox).at(2).find('input')

      input.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith('derek')

      input2.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith('hansel')

      input3.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith('mugatu')
    })

    test('returns empty array if deselected item with mutliSelect off', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy} multiSelect={false}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find(Checkbox).at(0).find('input')

      input.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith('derek')

      input.simulate('change', { target: { checked: false } })
      expect(spy).toHaveBeenCalledWith([])
    })
  })

  describe('multiSelectLimit', () => {
    test('limitReached is false when multiSelect is disabled', () => {
      const wrapper = mount(
        <ChoiceGroup multiSelect={false}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )

      expect(wrapper.state('limitReached')).toBeFalsy()
    })

    test('limitReached is false when multiSelect is enabled and value length is less than the multiSelectLimit', () => {
      const wrapper = mount(
        <ChoiceGroup multiSelectLimit={2} value={['derek']}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const el = wrapper.find('div.c-ChoiceGroup')

      expect(wrapper.state('limitReached')).toBeFalsy()
      expect(el.hasClass('limit-reached')).toBeFalsy()
    })

    test('limitReached is true when multiSelect is enabled and value length is equal than the multiSelectLimit', () => {
      const wrapper = mount(
        <ChoiceGroup multiSelectLimit={2} value={['derek', 'hansel']}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const el = wrapper.find('div.c-ChoiceGroup')

      expect(wrapper.state('limitReached')).toBeTruthy()
      expect(el.hasClass('limit-reached')).toBeTruthy()
    })

    test('limitReached updates base on selectedValue length', () => {
      const wrapper = mount(
        <ChoiceGroup multiSelectLimit={3}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
          <Checkbox value="john" />
          <Checkbox value="paul" />
        </ChoiceGroup>
      )
      const input = wrapper.find(Checkbox).at(0).find('input')
      const input2 = wrapper.find(Checkbox).at(1).find('input')
      const input3 = wrapper.find(Checkbox).at(2).find('input')

      input.simulate('change', { target: { checked: true } })
      expect(wrapper.state('limitReached')).toBeFalsy()
      expect(
        wrapper.find('.c-ChoiceGroup').first().hasClass('limit-reached')
      ).toBeFalsy()

      input2.simulate('change', { target: { checked: true } })
      expect(wrapper.state('limitReached')).toBeFalsy()
      expect(
        wrapper.find('.c-ChoiceGroup').first().hasClass('limit-reached')
      ).toBeFalsy()

      input3.simulate('change', { target: { checked: true } })
      expect(wrapper.state('limitReached')).toBeTruthy()
      expect(
        wrapper.find('.c-ChoiceGroup').first().hasClass('limit-reached')
      ).toBeTruthy()

      input2.simulate('change', { target: { checked: false } })
      expect(wrapper.state('limitReached')).toBeFalsy()
      expect(
        wrapper.find('.c-ChoiceGroup').first().hasClass('limit-reached')
      ).toBeFalsy()
    })

    test('limitReached updates base on selectedValue length (using keyboard)', () => {
      const wrapper = mount(
        <ChoiceGroup multiSelectLimit={3}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
          <Checkbox value="john" />
          <Checkbox value="paul" />
        </ChoiceGroup>
      )

      const input = wrapper.find(Checkbox).at(0).find('input')
      const input2 = wrapper.find(Checkbox).at(1).find('input')
      const input3 = wrapper.find(Checkbox).at(2).find('input')

      input.simulate('keyup', { key: ' ' })
      expect(wrapper.state('limitReached')).toBeFalsy()

      input2.simulate('keyup', { key: ' ' })
      expect(wrapper.state('limitReached')).toBeFalsy()

      input3.simulate('keyup', { key: ' ' })
      expect(wrapper.state('limitReached')).toBeTruthy()

      input2.simulate('keyup', { key: ' ' })
      expect(wrapper.state('limitReached')).toBeFalsy()
    })
  })

  describe('Name', () => {
    test('Applies name to child Choice components', () => {
      const wrapper = mount(
        <ChoiceGroup name="MUGATU">
          <Radio />
          <Radio />
          <Radio />
        </ChoiceGroup>
      )

      expect(wrapper.find('input').first().props().name).toBe('MUGATU')
    })
  })

  describe('Value', () => {
    test('Does not check any Choices if value does not match', () => {
      const wrapper = mount(
        <ChoiceGroup value="katinka">
          <Radio value="derek" />
          <Radio value="hansel" />
          <Radio value="mugatu" />
        </ChoiceGroup>
      )
      const radios = wrapper.find('input')

      expect(radios.get(0).props.checked).toBeFalsy()
      expect(radios.get(1).props.checked).toBeFalsy()
      expect(radios.get(2).props.checked).toBeFalsy()
    })

    test('Checks a Choice if value matches', () => {
      const wrapper = mount(
        <ChoiceGroup value="hansel">
          <Radio value="derek" />
          <Radio value="hansel" />
          <Radio value="mugatu" />
        </ChoiceGroup>
      )
      const radios = wrapper.find('input')

      expect(radios.get(0).props.checked).toBeFalsy()
      expect(radios.get(1).props.checked).toBeTruthy()
      expect(radios.get(2).props.checked).toBeFalsy()
    })

    test('Deselects checked value on click', () => {
      const values = ['derek', 'hansel']
      const wrapper = mount(
        <ChoiceGroup value={values}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find('input')

      input.first().simulate('change')

      expect(wrapper.state().selectedValue).not.toContain('derek')
      expect(wrapper.state().selectedValue).toContain('hansel')
    })
  })

  describe('Style', () => {
    test('Can render responsive styles', () => {
      const wrapper = mount(<ChoiceGroup isResponsive />)
      const el = wrapper.find('div.c-ChoiceGroup')

      expect(el.hasClass('is-responsive')).toBe(true)
    })
  })
})
