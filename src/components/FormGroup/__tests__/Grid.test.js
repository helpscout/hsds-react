import React from 'react'
import { mount } from 'enzyme'
import Grid from '../Grid'
import { default as GridComponent } from '../../Grid'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Grid />)

    expect(wrapper.hasClass('c-FormGroupGrid')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Grid className="mugatu" />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders the Grid component', () => {
    const wrapper = mount(
      <Grid>
        <div className="mugatu" />
      </Grid>
    )

    const o = wrapper.find(GridComponent)

    expect(o.length).toBeTruthy()
  })

  test('Can render child components', () => {
    const wrapper = mount(
      <Grid>
        <div className="mugatu" />
      </Grid>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
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
