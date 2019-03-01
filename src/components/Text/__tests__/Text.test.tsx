import * as React from 'react'
import { mount } from 'enzyme'
import Text from '../Text'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Text className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Text>Gator</Text>)

    expect(wrapper.text()).toBe('Gator')
  })
})

describe('Shade', () => {
  test('Add shade styles if applied', () => {
    const wrapper = mount(<Text shade="muted" />)

    expect(wrapper.getDOMNode().classList.contains('is-shade-muted')).toBe(true)
  })
})

describe('Styles', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Text />)

    expect(wrapper.getDOMNode().classList.contains('c-Text')).toBe(true)
  })

  test('Applies sizing styles if specified', () => {
    const wrapper13 = mount(<Text size="13" />)
    const wrapper20 = mount(<Text size="20" />)

    expect(wrapper13.getDOMNode().classList.contains('is-13')).toBe(true)
    expect(wrapper20.getDOMNode().classList.contains('is-20')).toBe(true)
  })

  test('Applies allCaps styles if specified', () => {
    const wrapper = mount(<Text allCaps />)

    expect(wrapper.getDOMNode().classList.contains('is-all-caps')).toBe(true)
  })

  test('Applies disableSelect styles if specified', () => {
    const wrapper = mount(<Text disableSelect />)

    expect(wrapper.getDOMNode().classList.contains('is-disableSelect')).toBe(
      true
    )
  })

  test('Applies muted styles if specified', () => {
    const wrapper = mount(<Text muted />)

    expect(wrapper.getDOMNode().classList.contains('is-shade-muted')).toBe(true)
  })

  test('Applies subtle styles if specified', () => {
    const wrapper = mount(<Text subtle />)

    expect(wrapper.getDOMNode().classList.contains('is-subtle')).toBe(true)
  })

  test('Applies faint styles if specified', () => {
    const wrapper = mount(<Text faint />)

    expect(wrapper.getDOMNode().classList.contains('is-faint')).toBe(true)
  })

  test('Applies truncation styles if specified', () => {
    const wrapper = mount(<Text truncate />)

    expect(wrapper.getDOMNode().classList.contains('is-truncate')).toBe(true)
  })

  test('Applies center styles if specified', () => {
    const wrapper = mount(<Text center />)

    expect(wrapper.getDOMNode().classList.contains('is-center')).toBe(true)
  })

  test('Applies link-style styles if specified', () => {
    const wrapper = mount(<Text linkStyle />)

    expect(wrapper.getDOMNode().classList.contains('is-linkStyle')).toBe(true)
  })

  test('Applies line-height inherit styles if specified', () => {
    const wrapper = mount(<Text lineHeightInherit />)

    expect(
      wrapper.getDOMNode().classList.contains('is-lineHeightInherit')
    ).toBe(true)
  })

  test('Applies line-height reset styles if specified', () => {
    const wrapper = mount(<Text lineHeightReset />)

    expect(wrapper.getDOMNode().classList.contains('is-lineHeightReset')).toBe(
      true
    )
  })

  test('Applies word-wrap reset styles if specified', () => {
    const wrapper = mount(<Text wordWrap />)

    expect(wrapper.getDOMNode().classList.contains('is-wordWrap')).toBe(true)
  })

  test('Applies weight styles if specified', () => {
    const wrapper = mount(<Text weight={200} />)

    expect(wrapper.getDOMNode().classList.contains('is-200')).toBe(true)
  })

  test('Applies noUnderline styles if specified', () => {
    const wrapper = mount(<Text noUnderline />)

    expect(wrapper.getDOMNode().classList.contains('is-noUnderline')).toBe(true)
  })

  test('Applies isPlainLink styles if specified', () => {
    const wrapper = mount(<Text isPlainLink />)

    expect(wrapper.getDOMNode().classList.contains('is-plainLink')).toBe(true)
  })
})

describe('States', () => {
  test('Applies error styles if specified', () => {
    const wrapper = mount(<Text state="error" />)

    expect(wrapper.getDOMNode().classList.contains('is-error')).toBe(true)
  })

  test('Applies success styles if specified', () => {
    const wrapper = mount(<Text state="success" />)

    expect(wrapper.getDOMNode().classList.contains('is-success')).toBe(true)
  })

  test('Applies warning styles if specified', () => {
    const wrapper = mount(<Text state="warning" />)

    expect(wrapper.getDOMNode().classList.contains('is-warning')).toBe(true)
  })
})
