import React from 'react'
import { findDOMNode } from 'react-dom'
import { mount } from 'enzyme'
import Form from './Form'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Form />)

    expect(wrapper.getDOMNode().classList.contains('c-Form')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'schrute'
    const wrapper = mount(<Form className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const text = 'Hello'
    const wrapper = mount(
      <Form>
        <div className="child">{text}</div>
      </Form>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain(text)
  })
})

describe('Actions', () => {
  test('submits the Form on click of the save button', () => {
    const wrapper = mount(<Form />)
    const el = wrapper.find('.c-Form').hostNodes()
    const spy = jest.fn()

    el.simulate('submit', { preventDefault: spy })

    expect(spy).toHaveBeenCalled()
  })

  test('Renders only a save button by default with default text', () => {
    const wrapper = mount(<Form />)
    const el = wrapper.find('.save-button').hostNodes()

    expect(el.text()).toContain('Save')
    expect(wrapper.find('button').length).toEqual(1)
  })

  test('Renders a save button with custom text if specified', () => {
    const text = 'Save Entry'
    const wrapper = mount(<Form saveText={text} />)
    const el = wrapper.find('.save-button').hostNodes()

    expect(el.text()).toEqual(text)
  })

  test('Renders a cancel button if specified', () => {
    const wrapper = mount(<Form onCancel={() => {}} />)

    const el = wrapper.find('.cancel-button').hostNodes()

    expect(el.text()).toEqual('Cancel')
    expect(wrapper.find('button').length).toEqual(2)
  })

  test('Renders a delete button if specified', () => {
    const wrapper = mount(<Form onDestroy={() => {}} />)
    const el = wrapper.find('.delete-button').hostNodes()

    expect(el.text()).toEqual('Delete')
    expect(wrapper.find('button').length).toEqual(2)
  })

  test('Renders buttons from left to right by default', () => {
    const wrapper = mount(<Form />)

    expect(wrapper.find('.is-right').hostNodes()).toHaveLength(1)
    expect(wrapper.find('.is-left').hostNodes()).toHaveLength(0)
  })

  test('Renders buttons right to left when specified', () => {
    const wrapper = mount(<Form actionDirection="left" />)

    expect(wrapper.find('.is-right').hostNodes()).toHaveLength(0)
    expect(wrapper.find('.is-left').hostNodes()).toHaveLength(1)
  })

  test('renders buttons with no tabIndex by default', () => {
    const wrapper = mount(<Form onCancel={() => {}} onDestroy={() => {}} />)
    ;['cancel', 'delete', 'save'].forEach(action =>
      expect(getAttribute(wrapper, `.${action}-button`, 'tabIndex')).toBeNull()
    )
  })

  test('renders buttons with negative tabIndex when actionFocusable is false', () => {
    const wrapper = mount(
      <Form actionTabbable={false} onCancel={() => {}} onDestroy={() => {}} />
    )
    ;['cancel', 'delete', 'save'].forEach(action =>
      expect(getAttribute(wrapper, `.${action}-button`, 'tabIndex')).toEqual(
        '-1'
      )
    )
  })

  test('renders buttons with custom props when applied', () => {
    const wrapper = mount(
      <Form
        actionTabbable={false}
        cancelButtonProps={{ loading: true }}
        destroyButtonProps={{ loading: true }}
        onCancel={() => {}}
        onDestroy={() => {}}
        saveButtonProps={{ loading: true }}
      />
    )

    expect(wrapper.find('.is-loading').hostNodes()).toHaveLength(3)
  })
})

function getAttribute(wrapper, selector, attribute) {
  return findDOMNode(wrapper.instance())
    .querySelector(selector)
    .getAttribute(attribute)
}
