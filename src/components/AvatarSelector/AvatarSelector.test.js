import React from 'react'
import { mount } from 'enzyme'
import AvatarSelector from './AvatarSelector'
import { IconAssignUI } from './AvatarSelector.css'
import Icon from '../Icon'
import Avatar from '../Avatar'

describe('AvatarSelector', () => {
  it('should render caret down', () => {
    const wrapper = mount(<AvatarSelector isOpen={false} initials="JP" />)
    const iconwrapper = wrapper.find(Icon).first()
    expect(iconwrapper.props().name).toEqual('caret-down')
  })

  it('should render caret up', () => {
    const wrapper = mount(<AvatarSelector isOpen={true} initials="JP" />)
    const iconwrapper = wrapper.find(Icon).first()
    expect(iconwrapper.props().name).toEqual('caret-up')
  })

  it('should render the IconAssignUI when there is no image', () => {
    const wrapper = mount(<AvatarSelector image="" />)
    const avatarWrapper = wrapper.find(Avatar)
    const IconAssign = wrapper.find(IconAssignUI)
    expect(avatarWrapper.length).toEqual(0)
    expect(IconAssign.length).toEqual(1)
  })

  it('should render the Avatar when image is present', () => {
    const wrapper = mount(
      <AvatarSelector image="https://i1.sndcdn.com/avatars-000004519473-4xktxg-t500x500.jpg" />
    )
    const avatarWrapper = wrapper.find(Avatar)
    const IconAssign = wrapper.find(IconAssignUI)
    expect(avatarWrapper.length).toEqual(1)
    expect(IconAssign.length).toEqual(0)
  })
})
