import React from 'react'
import { mount } from 'enzyme'
import Grid from '..'
import Container from '../Container'
import Row from '../Row'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Grid />)

    expect(wrapper.hasClass('c-Grid')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Grid className="mugatu" />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = mount(
      <Grid>
        <div className="mugatu" />
      </Grid>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })

  test('Contains Container + Row by default', () => {
    const wrapper = mount(
      <Grid>
        <div className="mugatu" />
      </Grid>
    )

    const c = wrapper.find(Container)
    const r = wrapper.find(Row)

    expect(c.length).toBeTruthy()
    expect(r.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = mount(<Grid style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Variants', () => {
  test('Correctly renders fluid variant', () => {
    const wrapper = mount(<Grid isFluid />)
    const o = wrapper.find(Container)

    expect(o.hasClass('c-Container')).toBeTruthy()
    expect(o.hasClass('is-fluid')).toBeTruthy()
    expect(o.hasClass('is-responsive')).not.toBeTruthy()

    wrapper.unmount()
  })
})
