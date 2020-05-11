import React from 'react'
import { Flexy, Text, StatusBadge, Avatar, AvatarList } from '../index'
import AvatarSpec from '../../utilities/specs/avatarList.specs'

export function metaHeader() {
  return (
    <Flexy align="top">
      <Flexy.Block>
        <Text faint size="12">
          Last updated 1 day ago
        </Text>
      </Flexy.Block>
      <Flexy.Item>
        <StatusBadge count={20} status={'new'} />
      </Flexy.Item>
    </Flexy>
  )
}

export function footer() {
  return (
    <AvatarList max={5} size="sm" stack={true}>
      {AvatarSpec.generate(5).map(avatar => {
        const { name, image } = avatar
        return <Avatar image={image} key={name} name={name} status={null} />
      })}
    </AvatarList>
  )
}
