import React from 'react'
import { mount } from 'enzyme'
import { Tag } from './Tag'
import { Animate, Icon, Text } from '../index'

jest.useFakeTimers()

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Tag />)
    const o = wrapper.find('.c-Tag')

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Tag className="mugatu" />)
    const o = wrapper.find('.c-Tag').first()

    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Animate', () => {
  test('Renders an Animate component', () => {
    const wrapper = mount(<Tag />)
    const o = wrapper.find(Animate)

    expect(o.length).toBe(1)
  })

  test('Animation duration can be defined', () => {
    const wrapper = mount(<Tag animationDuration={1000} />)
    const o = wrapper.find(Animate)

    expect(o.props().duration).toBe(1000)
  })

  test('Passes "in" state, to Animate', () => {
    const wrapper = mount(<Tag isRemovable />)

    expect(wrapper.find(Animate).props().in).toBe(true)
  })
})

describe('Content', () => {
  test('Wraps children components in <Text> ', () => {
    const wrapper = mount(<Tag>Mugatu</Tag>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Mugatu')
    expect(o.props().size).toBe('12')
  })

  test('Adjusts fontSize when all caps', () => {
    const wrapper12 = mount(<Tag>Mugatu</Tag>)
    const o12 = wrapper12.find(Text)
    expect(o12.props().size).toBe('12')

    const wrapper10 = mount(
      <Tag size="sm" allCaps>
        Mugatu
      </Tag>
    )
    const o10 = wrapper10.find(Text)
    expect(o10.props().size).toBe('11')
  })
})

describe('Remove', () => {
  test('Is not removable by default', () => {
    const wrapper = mount(<Tag />)

    const icon = wrapper.find(Icon)
    expect(icon.length).toBe(0)
  })

  test('Renders remove Icon if isRemovable', () => {
    const wrapper = mount(<Tag isRemovable />)

    const icon = wrapper.find(Icon)
    expect(icon.length).toBe(1)
  })

  test('Renders different icon size if isRemovable', () => {
    const wrapper = mount(<Tag isRemovable size="md" />)

    expect(wrapper.find(Icon).props().size).toBe('24')

    wrapper.setProps({ size: 'sm' })
    expect(wrapper.find(Icon).props().size).toBe('18')
  })

  test('Does not fire callback on unmount', () => {
    const spy = jest.fn()
    const wrapper = mount(<Tag onRemove={spy} />)

    wrapper.unmount()
    expect(spy).not.toHaveBeenCalled()
  })

  test('Fires callback on remove click', () => {
    const spy = jest.fn()
    const mockOnBeforeRemovePromise = () => ({ then: cb => cb() })
    const wrapper = mount(
      <Tag
        onBeforeRemove={mockOnBeforeRemovePromise}
        isRemovable
        onRemove={spy}
        id={1}
        value="Ron"
      />
    )

    const icon = wrapper.find(Icon)
    icon.simulate('click')

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].id).toBe(1)
    expect(spy.mock.calls[0][0].value).toBe('Ron')
  })

  test('Provides onBeforeRemove with id and value', () => {
    const spy = jest.fn()
    const mockOnBeforeRemovePromise = props => {
      spy(props)
      return { then: cb => cb() }
    }
    const wrapper = mount(
      <Tag
        isRemovable
        onBeforeRemove={mockOnBeforeRemovePromise}
        id={1}
        value="Ron"
      />
    )

    const icon = wrapper.find(Icon)
    icon.simulate('click')

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].id).toBe(1)
    expect(spy.mock.calls[0][0].value).toBe('Ron')
  })

  test('Renders spinner when removing', () => {
    const wrapper = mount(<Tag isRemoving={false} isRemovable value="Ron" />)

    expect(wrapper.find('Spinner')).toHaveLength(0)

    wrapper.setProps({ isRemoving: true })
    wrapper.update()
    expect(wrapper.find('Spinner')).toHaveLength(1)
  })

  test('Renders spinner with filled styles, if defined', () => {
    const wrapper = mount(
      <Tag filled isRemoving={false} isRemovable value="Ron" />
    )

    wrapper.setProps({ isRemoving: true })
    wrapper.update()
    expect(wrapper.find('Spinner').hasClass('is-filled')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Has allCaps styles', () => {
    const wrapper = mount(<Tag allCaps />)
    const o = wrapper.find(Text).first()

    expect(o.props().allCaps).toBeTruthy()
    expect(o.props().size).not.toBe('12')
  })

  test('Has color styles', () => {
    const wrapper = mount(<Tag color="red" />)
    const o = wrapper.find('.c-Tag').first()

    expect(o.getDOMNode().classList.contains('is-red')).toBeTruthy()
  })

  test('Has size styles', () => {
    const wrapper = mount(<Tag size="md" />)
    const o = wrapper.find('.c-Tag').first()

    expect(o.getDOMNode().classList.contains('is-md')).toBeTruthy()
  })

  test('Has display styles', () => {
    const wrapper = mount(<Tag display="inlineBlock" />)
    const o = wrapper.find('.c-TagWrapper').first()

    expect(
      o.getDOMNode().classList.contains('is-display-inlineBlock')
    ).toBeTruthy()
  })

  test('Has filled styles', () => {
    const wrapper = mount(<Tag filled />)
    const o = wrapper.find('.c-Tag').first()

    expect(o.getDOMNode().classList.contains('is-filled')).toBeTruthy()
  })

  test('Has pulsing styles', () => {
    const wrapper = mount(<Tag pulsing />)
    const o = wrapper.find('.c-Tag').first()

    expect(o.getDOMNode().classList.contains('is-pulsing')).toBeTruthy()
  })
})

describe('Value', () => {
  test('Renders value as text', () => {
    const wrapper = mount(<Tag value="Ron" />)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Ron')
  })

  test('Renders value instead of children, if defined', () => {
    const wrapper = mount(<Tag value="Ron">Champ</Tag>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Ron')
    expect(o.html()).not.toContain('Mike')
  })
})
