import * as React from 'react'
import { mount } from 'enzyme'
import StatusDot from './StatusDot'
import { Icon } from '../index'
import { StatusDotUI } from './StatusDot.css'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<StatusDot />)

    expect(wrapper.getDOMNode().classList.contains('c-StatusDot')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<StatusDot className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('BorderColor', () => {
  test('Does not have custom borderColor by default', () => {
    const wrapper = mount(<StatusDot />)
    const comp = wrapper.find(StatusDotUI)

    expect(comp.props().style.borderColor).toBeFalsy()
  })

  test('Can customize borderColor style', () => {
    const wrapper = mount(<StatusDot borderColor="red" />)
    const comp = wrapper.find(StatusDotUI)

    expect(comp.props().style.borderColor).toBe('red')
  })

  test('Can customize borderColor style + add custom style', () => {
    const wrapper = mount(
      <StatusDot borderColor="red" style={{ margin: 10 }} />
    )
    const comp = wrapper.find(StatusDotUI)
    const styles = comp.props().style

    expect(styles.borderColor).toBe('red')
    expect(styles.margin).toBe(10)
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = mount(<StatusDot />)
    const o = wrapper.find(Icon)

    expect(wrapper.getDOMNode().classList.contains('is-icon')).not.toBe(true)
    expect(o.length).toBe(0)
  })

  test('Can render icon, if defined', () => {
    const wrapper = mount(<StatusDot icon="tick" />)
    const o = wrapper.find(Icon)

    expect(wrapper.getDOMNode().classList.contains('is-icon')).toBeTruthy()
    expect(o.length).toBe(1)
    expect(o.props().name).toBe('tick')
  })
})

describe('Inline', () => {
  test('Is not inline by default', () => {
    const wrapper = mount(<StatusDot />)

    expect(wrapper.getDOMNode().classList.contains('is-inline')).not.toBe(true)
  })

  test('Can render inline styles, if defined', () => {
    const wrapper = mount(<StatusDot inline />)

    expect(wrapper.getDOMNode().classList.contains('is-inline')).toBeTruthy()
  })
})

describe('OuterBorderColor', () => {
  test('Does not have custom outerBorderColor by default', () => {
    const wrapper = mount(<StatusDot />)
    const comp = wrapper.find(StatusDotUI)

    expect(comp.props().style.boxShadow).toBeFalsy()
  })

  test('Can customize outerBorderColor style', () => {
    const wrapper = mount(<StatusDot outerBorderColor="red" />)
    const comp = wrapper.find(StatusDotUI)

    expect(comp.props().style.boxShadow).toContain('red')
  })

  test('Can customize outerBorderColor style + add custom style', () => {
    const wrapper = mount(
      <StatusDot outerBorderColor="red" style={{ margin: 10 }} />
    )
    const comp = wrapper.find(StatusDotUI)
    const styles = comp.props().style

    expect(styles.boxShadow).toContain('red')
    expect(styles.margin).toBe(10)
  })
})

describe('Size', () => {
  test('Has a default size', () => {
    const wrapper = mount(<StatusDot />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBe(true)
  })

  test('Can render size styles, if defined', () => {
    const wrapper = mount(<StatusDot size="md" />)

    expect(wrapper.getDOMNode().classList.contains('is-md')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-sm')).not.toBeTruthy()
  })
})

describe('Status', () => {
  test('Has an online status by default', () => {
    const wrapper = mount(<StatusDot />)

    expect(wrapper.getDOMNode().classList.contains('is-online')).toBe(true)
  })

  test('Can render status styles, if defined', () => {
    const wrapper = mount(<StatusDot status="offline" />)

    expect(wrapper.getDOMNode().classList.contains('is-offline')).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('is-online')
    ).not.toBeTruthy()
  })
})

describe('Unread', () => {
  test('Is not unread by default', () => {
    const wrapper = mount(<StatusDot />)

    expect(wrapper.instance().props.isUnread).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-unread')).toBe(false)
  })

  test('Can add unread styles, if defined', () => {
    const wrapper = mount(<StatusDot isUnread />)

    expect(wrapper.instance().props.isUnread).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('is-unread')).toBe(true)
  })
})

describe('Title', () => {
  test('Provides a tooltip title by default', () => {
    const wrapper = mount(<StatusDot status="online" />)
    const title = wrapper
      .find('[title]')
      .first()
      .props().title

    expect(title).toBe('Is online')
  })

  test('Title can be customized', () => {
    const wrapper = mount(<StatusDot status="online" title="OMG! ONLINE" />)
    const title = wrapper
      .find('[title]')
      .first()
      .props().title

    expect(title).toBe('OMG! ONLINE')
  })
})

describe('Children', () => {
  test('Does not renders child content', () => {
    const wrapper = mount(
      <StatusDot>
        <div className="child">Hello</div>
      </StatusDot>
    )
    const el = wrapper.find('div.child')

    expect(el.length).toBe(0)
  })
})
