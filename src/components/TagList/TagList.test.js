import React from 'react'
import { mount } from 'enzyme'
import TagList from './TagList'
import { Icon, Inline, Overflow, Tag } from '../index'
import { ClearAllUI, TagListUI } from './TagList.css'

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

  test('Does set the size prop on the Inline component', () => {
    const wrapper = mount(
      <TagList size="md">
        <Tag id={1} />
      </TagList>
    )
    const inline = wrapper.find(Inline)
    expect(inline.props().size).toBe('md')
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
    const o = wrapper.find('.c-Tag__iconWrapper')

    expect(o.exists()).toBe(true)
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

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('onRemoveAll', () => {
  test('Fires callback from clearAll button, if specified', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <TagList onRemoveAll={spy} isRemovable clearAll>
        <Tag id={1} />
        <Tag id={2} />
      </TagList>
    )

    wrapper.find(ClearAllUI).simulate('click')
    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('clearAll', () => {
  test('Adds a clearAll button if more than one tag', () => {
    const wrapper = mount(
      <TagList clearAll>
        <Tag id={1} />
        <Tag id={2} />
      </TagList>
    )
    const o = wrapper.find(ClearAllUI).first()
    expect(o.length).toBeTruthy()
  })

  test('Does not Add a clearAll button if list contains less or equal than one tag', () => {
    const wrapper = mount(
      <TagList clearAll>
        <Tag id={1} />
      </TagList>
    )
    const o = wrapper.find(ClearAllUI).first()
    expect(o.length).toBeFalsy()
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

  test('Does add a className to show all tags', () => {
    const wrapper = mount(
      <TagList showAll>
        <Tag />
      </TagList>
    )
    expect(wrapper.find(TagListUI).first().prop('className')).toContain(
      'is-showingAll'
    )
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
