import React from 'react'
import { AvatarGrid, Avatar } from '../../../src/index'
import { wait } from '../test-helpers'

describe('AvatarGrid', () => {
  it('should display up to 5 Avatars in a single line', () => {
    mount(
      <AvatarGrid>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGrid>
    )

    const el = $('.c-Avatar')
    const grid = $('.c-AvatarGrid')

    expect(grid.height()).toBeGreaterThanOrEqual(el.height())
    expect(grid.height()).toBeLessThan(el.height() * 2)
  })

  it('should display more than 5 Avatars on multiple lines', () => {
    mount(
      <AvatarGrid>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGrid>
    )

    const el = $('.c-Avatar')
    const grid = $('.c-AvatarGrid')

    expect(grid.height()).toBeGreaterThan(el.height())
    expect(grid.height()).toBeGreaterThanOrEqual(el.height() * 2)
  })
})
