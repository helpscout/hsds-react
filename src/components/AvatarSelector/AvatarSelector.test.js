import React from 'react'
import { mount } from 'enzyme'
import AvatarSelector from './AvatarSelector'
import {
  AvatarWrapperUI,
  IconAssignUI,
  IconCaretUI,
} from './AvatarSelector.css'

describe('AvatarSelector', () => {
  it('should render caret down', () => {
    const wrapper = mount(<AvatarSelector isOpen={false} />)
    const Icon = wrapper.find(IconCaretUI).find('Icon')
    expect(Icon.props().name).toEqual('caret-down')
  })

  it('should render caret up', () => {
    const wrapper = mount(<AvatarSelector isOpen={true} />)
    const Icon = wrapper.find(IconCaretUI).find('Icon')
    expect(Icon.props().name).toEqual('caret-up')
  })

  it('should render the IconAssignUI', () => {
    const wrapper = mount(<AvatarSelector image="" />)
    const Avatar = wrapper.find('Avatar')
    const IconAssign = wrapper.find(IconAssignUI)
    expect(Avatar.length).toEqual(0)
    expect(IconAssign.length).toEqual(1)
  })

  it('should render the AvatarUI', () => {
    const wrapper = mount(
      <AvatarSelector image="https://i1.sndcdn.com/avatars-000004519473-4xktxg-t500x500.jpg" />
    )
    const Avatar = wrapper.find('Avatar')
    const IconAssign = wrapper.find(IconAssignUI)
    expect(Avatar.length).toEqual(1)
    expect(IconAssign.length).toEqual(0)
  })
})
