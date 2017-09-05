import React from 'react'
import { shallow } from 'enzyme'
import Grid from '../Grid'
import { default as GridComponent } from '../../Grid'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = shallow(<Grid />)

    expect(wrapper.hasClass('c-FormGroup')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = shallow(<Grid className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders the Grid component', () => {
    const wrapper = shallow(
      <Grid>
        <div className='mugatu' />
      </Grid>
    )

    const o = wrapper.find(GridComponent)

    expect(o.length).toBeTruthy()
  })

  test('Can render child components', () => {
    const wrapper = shallow(
      <Grid>
        <div className='mugatu' />
      </Grid>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = shallow(<Grid style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})
