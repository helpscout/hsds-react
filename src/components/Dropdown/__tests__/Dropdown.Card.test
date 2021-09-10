import React from 'react'
import { mount } from 'enzyme'
import { DropdownCard as Card } from '../Dropdown.Card'
import { hasClass } from '../../../tests/helpers/enzyme'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Card />)

    expect(hasClass(wrapper, 'c-DropdownCard')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Card className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Card>
        <div className="ron">Ron</div>
      </Card>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('ref', () => {
  test('Can set an ref to a DOM node', () => {
    const spy = jest.fn()
    mount(<Card cardRef={spy} />)

    expect(spy).toHaveBeenCalled()
  })
})

describe('Dimensions', () => {
  test('Can set dimension props', () => {
    const dimensions = {
      minHeight: 60,
      minWidth: 300,
      maxHeight: 260,
      maxWidth: 600,
    }
    const wrapper = mount(<Card {...dimensions} />)
    const el = wrapper.find('Card').first()
    const styles = el.prop('style')

    expect(styles.minHeight).toBe(60)
    expect(styles.minWidth).toBe(300)
    expect(styles.maxHeight).toBe(260)
    expect(styles.maxWidth).toBe(600)
  })
})
