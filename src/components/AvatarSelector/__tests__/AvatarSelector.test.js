import React from 'react'
import { mount, shallow } from 'enzyme'
import AvatarSelector from '../AvatarSelector'
import {
  AvatarSelectorUI,
  AvatarSelectorWrapperUI,
  AvatarUI,
  IconAssignUI,
  IconCaretUI,
} from '../styles/AvatarSelector.css.js'

describe('AvatarSelector', () => {
  it('should render caret down', () => {
    const wrapper = mount(<AvatarSelector isOpen={false} />)
    const Icon = wrapper.find(IconCaretUI)
    expect(Icon.props().name).toEqual('caret-down')
  })

  it('should render caret up', () => {
    const wrapper = mount(<AvatarSelector isOpen={true} />)
    const Icon = wrapper.find(IconCaretUI)
    expect(Icon.props().name).toEqual('caret-up')
  })

  it('should render the IconAssignUI', () => {
    const wrapper = mount(<AvatarSelector image="" />)
    const Avatar = wrapper.find(AvatarUI)
    const IconAssign = wrapper.find(IconAssignUI)
    expect(Avatar.length).toEqual(0)
    expect(IconAssign.length).toEqual(1)
  })

  it('should render the AvatarUI', () => {
    const wrapper = mount(
      <AvatarSelector image="https://i1.sndcdn.com/avatars-000004519473-4xktxg-t500x500.jpg" />
    )
    const Avatar = wrapper.find(AvatarUI)
    const IconAssign = wrapper.find(IconAssignUI)
    expect(Avatar.length).toEqual(1)
    expect(IconAssign.length).toEqual(0)
  })
})
