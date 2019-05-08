import * as React from 'react'
import { mount } from 'enzyme'
import HsApp from '../HsApp'

import { InnerContentUI } from '../styles/HsApp.css'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<HsApp />)
    expect(wrapper.getDOMNode().classList.contains('c-HsApp')).toBe(true)
  })

  test('Adds/removes className on document.body when mounting/unmounting', () => {
    const wrapper = mount(<HsApp />)
    expect(document.body.classList.contains('with-hsapp-wrapper')).toBe(true)
    wrapper.unmount()
    expect(document.body.classList.contains('with-hsapp-wrapper')).toBe(false)
  })
})

describe('Rendering', () => {
  test('Renders inner wrapper by default', () => {
    const wrapper = mount(<HsApp />)
    expect(wrapper.find(InnerContentUI).length).toBe(1)
  })

  test('Does not render inner wrapper', () => {
    const wrapper = mount(<HsApp withInnerWrapper={false} />)
    expect(wrapper.find(InnerContentUI).length).toBe(0)
  })

  test('Renders custom nav', () => {
    const CustomNav = props => {
      return <span className="customNav" />
    }
    const wrapper = mount(<HsApp navComponent={<CustomNav />} />)
    const HsAppNav = HsApp.Nav
    expect(wrapper.find(HsAppNav).length).toBe(0)
    expect(wrapper.find('.customNav').length).toBe(1)
  })

  test('Renders custom sidenav', () => {
    const CustomSidenav = props => {
      return <span className="customSidenav" />
    }
    const wrapper = mount(<HsApp sidenavComponent={<CustomSidenav />} />)
    const HsAppSidenav = HsApp.Sidenav
    expect(wrapper.find(HsAppSidenav).length).toBe(0)
    expect(wrapper.find('.customSidenav').length).toBe(1)
  })

  test('Renders custom content', () => {
    const CustomContent = props => {
      return <span className="customContent" />
    }
    const wrapper = mount(<HsApp contentComponent={<CustomContent />} />)
    expect(wrapper.find('.customContent').length).toBe(1)
  })

  test('Renders children', () => {
    const ChildrenComponent = props => {
      return <span className="children" />
    }
    const wrapper = mount(
      <HsApp>
        <ChildrenComponent />
      </HsApp>
    )
    expect(wrapper.find('.children').length).toBe(1)
  })
})
