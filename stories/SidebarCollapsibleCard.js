import React from 'react'
import { storiesOf } from '@storybook/react'
import { SidebarCollapsibleCard } from '../src/index.js'

storiesOf('SidebarCollapsibleCard', module)
  .add('default', () => (
    <div>
      <SidebarCollapsibleCard title='Profile'>
        Buddy the Elf
      </SidebarCollapsibleCard>

      <SidebarCollapsibleCard title='Status'>
        Happy!
      </SidebarCollapsibleCard>
    </div>
  ))
  .add('open', () => (
    <SidebarCollapsibleCard title='Profile' isOpen>
      Buddy the Elf
    </SidebarCollapsibleCard>
  ))
  .add('custom heading', () => {
    const headerMarkup = (
      <div style={{fontSize: 40}}>Giant Custom Header!</div>
    )
    return (
      <SidebarCollapsibleCard header={headerMarkup} isOpen>
        Buddy the Elf
      </SidebarCollapsibleCard>
    )
  })
