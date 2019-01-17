import React from 'react'
import { mount } from 'enzyme'
import TagList from '../TagList'
import { Icon, Inline, Overflow, Tag } from '../../index'

jest.useFakeTimers()

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<TagList />)

    expect(wrapper.getDOMNode().classList.contains('c-TagList')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<TagList className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Only renders Tag children content', () => {
    const wrapper = mount(
      <TagList>
        <Tag />
        <div className="child">Hello</div>
      </TagList>
    )

    expect(wrapper.find(Tag).length).toBe(1)
    expect(wrapper.find('.child').length).toBe(0)
  })
})

describe('Inline', () => {
  test('Renders content within Inline', () => {
    const wrapper = mount(
      <TagList>
        <Tag />
      </TagList>
    )
    const inline = wrapper.find(Inline)
    const inlineItem = wrapper.find(Inline.Item)
    const tag = inlineItem.find(Tag)

    expect(inline.length).toBe(1)
    expect(inlineItem.length).toBe(1)
    expect(tag.length).toBe(1)
  })
})

describe('isRemovable', () => {
  test('Is not enabled by default', () => {
    const wrapper = mount(
      <TagList>
        <Tag />
      </TagList>
    )
    const o = wrapper.find('Tag')

    expect(o.props().isRemovable).toBe(false)
  })

  test('Makes inner tags removable, if specified', () => {
    const wrapper = mount(
      <TagList isRemovable>
        <Tag />
      </TagList>
    )
    const o = wrapper.find('Tag')

    expect(o.props().isRemovable).toBe(true)
  })
})

describe('onRemove', () => {
  test('Fires callback from tag, if specified', () => {
    const spy = jest.fn()
    const mockOnBeforeRemovePromise = () => ({ then: cb => cb() })

    const wrapper = mount(
      <TagList
        onBeforeRemove={mockOnBeforeRemovePromise}
        onRemove={spy}
        isRemovable
      >
        <Tag id={1} />
        <Tag id={2} />
      </TagList>
    )
    const o = wrapper.find(Tag).first()
    const icon = o.find(Icon)

    icon.simulate('click')

    jest.runOnlyPendingTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('Overflow', () => {
  test('Does not contain content in Overflow by default', () => {
    const wrapper = mount(
      <TagList>
        <Tag />
      </TagList>
    )
    const o = wrapper.find(Overflow)

    expect(o.length).toBe(0)
  })

  test('Wraps content in Overflow, if specified', () => {
    const wrapper = mount(
      <TagList overflowFade>
        <Tag />
      </TagList>
    )
    const o = wrapper.find(Overflow)
    const tag = o.find(Tag)

    expect(o.length).toBe(1)
    expect(tag.length).toBe(1)
  })
})
