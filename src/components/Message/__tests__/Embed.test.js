import React from 'react'
import { mount } from 'enzyme'
import Embed from '../Embed'
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
    const o = wrapper.find(`.${cx}`)
    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Should not have a theme className by default', () => {
    const wrapper = mount(<Embed />)
    const o = wrapper.find(`.${cx}`)
    expect(o.props().className).not.toContain('is-theme')
  })

  test('Adds className based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Embed />
      </Message.Provider>
    )
    const o = wrapper.find(`.${cx}`)
    expect(o.props().className).toContain('is-theme-embed')
  })
})

describe('Content', () => {
  test('Renders html inside component', () => {
    const wrapper = mount(<Embed html={html} />)
    const o = wrapper.find(`.${cx}`)
    expect(o.html()).toContain(html)
  })
})

describe('Display name', () => {
  test('Has a display name', () => {
    expect(Embed.displayName).toEqual('Styled(Message.Embed)')
  })
})
