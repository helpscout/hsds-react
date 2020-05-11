import React from 'react'
import { mount, shallow } from 'enzyme'
import Toolbar from './Toolbar'
import Block from './Toolbar.Block'
import Item from './Toolbar.Item'
import Shadow from './Toolbar.Shadow'
import Flexy from '../Flexy'

describe('Toolbar ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Toolbar className={customClass} />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass(customClass)).toBe(true)
  })
})

describe('Toolbar Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Toolbar>
        <div className="mugatu">That Hansel!</div>
      </Toolbar>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(1)
  })
})

describe('Toolbar Flexy', () => {
  test('Is constructed using Flexy', () => {
    const wrapper = mount(<Toolbar />)
    const o = wrapper.find(Flexy)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-Toolbar')).toBe(true)
  })

  test('Passes props to Flexy', () => {
    const wrapper = mount(<Toolbar just="right" />)
    const o = wrapper.find(Flexy)

    expect(o.prop('just')).toBe('right')
  })
})

describe('Toolbar Placement', () => {
  test('Has a top placement by default', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-placement-top')).toBe(true)
    expect(o.hasClass('is-placement-bottom')).not.toBe(true)
  })

  test('Can define a bottom placement', () => {
    const wrapper = shallow(<Toolbar placement="bottom" />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-placement-top')).not.toBe(true)
    expect(o.hasClass('is-placement-bottom')).toBe(true)
  })
})

describe('Toolbar Shadow', () => {
  test('Does not have a shadow, by default', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find(Toolbar.Shadow)

    expect(o.length).toBe(0)
  })

  test('Can add a shadow', () => {
    const wrapper = shallow(<Toolbar shadow />)
    const o = wrapper.find(Toolbar.Shadow)

    expect(o.length).toBe(1)
  })

  test('Passes placement style to shadow ', () => {
    const wrapper = shallow(<Toolbar shadow placement="bottom" />)
    const o = wrapper.find(Toolbar.Shadow)

    expect(o.html()).toContain('is-placement-bottom')
  })
})

describe('Toolbar seamless', () => {
  test('Does not have a seamless style by default', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-seamless')).not.toBe(true)
  })

  test('Can apply seamless styles', () => {
    const wrapper = shallow(<Toolbar seamless />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-seamless')).toBe(true)
  })
})

describe('Toolbar Theme', () => {
  test('Has a default theme', () => {
    const wrapper = shallow(<Toolbar />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-theme-default')).toBe(true)
    expect(o.hasClass('is-theme-note')).not.toBe(true)
  })

  test('Can define a note theme', () => {
    const wrapper = shallow(<Toolbar theme="note" />)
    const o = wrapper.find('.c-Toolbar')

    expect(o.hasClass('is-theme-default')).not.toBe(true)
    expect(o.hasClass('is-theme-note')).toBe(true)
  })
})

describe('Toolbar Sub-components', () => {
  test('Has correct sub-components', () => {
    expect(Toolbar.Block).toBeTruthy()
    expect(Toolbar.Item).toBeTruthy()
    expect(Toolbar.Shadow).toBeTruthy()
  })
})

describe('Toolbar.Block ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(
      <Block>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )

    expect(wrapper.hasClass('c-ToolbarBlock')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(
      <Block className={customClass}>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Toolbar.Block Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Block>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(1)
  })
})

describe('Toolbar.Block Childless', () => {
  test('Renders nothing', () => {
    const wrapper = shallow(<Block />)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })

  test('Renders nothing with null children', () => {
    const wrapper = shallow(<Block>{null}</Block>)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })
})

describe('Toolbar.Block Flexy', () => {
  test('Is constructed using Flexy.Block', () => {
    const wrapper = shallow(
      <Block>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )

    const o = wrapper.find(Flexy.Block)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-ToolbarBlock')).toBe(true)
  })
})

describe('Toolbar.Item ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(
      <Item>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )

    expect(wrapper.hasClass('c-ToolbarItem')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(
      <Item className={customClass}>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Toolbar.Item Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Item>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(1)
  })
})

describe('Toolbar.Item Childless', () => {
  test('Renders nothing', () => {
    const wrapper = shallow(<Item />)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })

  test('Renders nothing with null children', () => {
    const wrapper = shallow(<Item>{null}</Item>)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })
})

describe('Toolbar.Item Flexy', () => {
  test('Is constructed using Flexy.Item', () => {
    const wrapper = shallow(
      <Item>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )

    const o = wrapper.find(Flexy.Item)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-ToolbarItem')).toBe(true)
  })
})

describe('Toolbar.Shadow ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Shadow />)

    expect(wrapper.hasClass('c-ToolbarShadow')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Shadow className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Toolbar.Shadow Children', () => {
  test('Does not render children', () => {
    const wrapper = shallow(
      <Shadow>
        <div className="mugatu">That Hansel!</div>
      </Shadow>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(0)
  })
})

describe('Toolbar.Shadow Placement', () => {
  test('Has a top placement by default', () => {
    const wrapper = shallow(<Shadow />)

    expect(wrapper.hasClass('is-placement-top')).toBe(true)
    expect(wrapper.hasClass('is-placement-bottom')).not.toBe(true)
  })

  test('Can define a bottom placement', () => {
    const wrapper = shallow(<Shadow placement="bottom" />)

    expect(wrapper.hasClass('is-placement-top')).not.toBe(true)
    expect(wrapper.hasClass('is-placement-bottom')).toBe(true)
  })
})
