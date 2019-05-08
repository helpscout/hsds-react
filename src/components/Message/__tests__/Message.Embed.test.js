import * as React from 'react'
import { mount } from 'enzyme'
import Embed from '../Message.Embed'
import LoadingDots from '../../LoadingDots'
import Message from '../Message'

const cx = 'c-MessageEmbed'

const html = '<div><iframe src="https://example.com"></iframe></div>'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Embed />)
    const o = wrapper.find(`.${cx}`)
    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Embed className="mugatu" />)
    const o = wrapper.find(`.${cx}`).first()
    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })

  test('Does not have an is-loading className when there is no iframe inside the HTML', () => {
    const wrapper = mount(<Embed html="<div></div>" />)
    const o = wrapper.find(`.${cx}`).first()
    expect(o.getDOMNode().classList.contains('is-loading')).toBeFalsy()
  })

  test('Has an is-loading className when there is an iframe inside the HTML', () => {
    const wrapper = mount(<Embed html={html} />)
    const o = wrapper.find(`.${cx}`).first()
    expect(o.getDOMNode().classList.contains('is-loading')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Should not have a theme className by default', () => {
    const wrapper = mount(<Embed />)
    const o = wrapper.find(`.${cx}`).first()
    expect(o.getDOMNode().classList.contains('is-theme-embed')).toBe(false)
  })

  test('Adds className based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Embed />
      </Message.Provider>
    )
    const o = wrapper.find(`.${cx}`).first()
    expect(o.getDOMNode().classList.contains('is-theme-embed')).toBe(true)
  })
})

describe('Content', () => {
  test('Renders html inside component', () => {
    const wrapper = mount(<Embed html={html} />)
    const o = wrapper.find(`.${cx}`).first()
    expect(o.html()).toContain(html)
  })

  test('Renders the loading dots when it is loading', () => {
    const wrapper = mount(<Embed html={html} />)
    expect(wrapper.find(LoadingDots)).toHaveLength(1)
  })

  test('Does not render the loading dots when not loading', () => {
    const wrapper = mount(<Embed />)
    expect(wrapper.find(LoadingDots)).toHaveLength(0)
  })
})

describe('Display name', () => {
  test('Has a display name', () => {
    expect(Embed.displayName).toEqual('Styled(Message.Embed)')
  })
})
