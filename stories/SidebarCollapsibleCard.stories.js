import React from 'react'
import { storiesOf } from '@storybook/react'
import { Sortable, SidebarCollapsibleCard } from '../src/index'

storiesOf('SidebarCollapsibleCard', module)
  .add('default', () => (
    <div>
      <SidebarCollapsibleCard title="Profile">
        Buddy the Elf
      </SidebarCollapsibleCard>

      <SidebarCollapsibleCard title="Status">Happy!</SidebarCollapsibleCard>
    </div>
  ))
  .add('open', () => (
    <SidebarCollapsibleCard title="Profile" isOpen>
      Buddy the Elf
    </SidebarCollapsibleCard>
  ))
  .add('custom heading', () => {
    const headerMarkup = (
      <div style={{ fontSize: 40 }}>Giant Custom Header!</div>
    )
    return (
      <SidebarCollapsibleCard header={headerMarkup} isOpen>
        Buddy the Elf
      </SidebarCollapsibleCard>
    )
  })
  .add('sidebar', () => (
    <Sortable
      useDragHandle
      hideDragHandles
      style={{ padding: 10, background: '#f1f3f5' }}
      pressDelay={100}
    >
      <SidebarCollapsibleCard title="Zoolander 2" id="001">
        <dl>
          <dt>Character</dt>
          <dd>Jacobim Mugatu</dd>
          <dt>Year</dt>
          <dd>2016</dd>
        </dl>
      </SidebarCollapsibleCard>
      <SidebarCollapsibleCard title="The Lego Movie" id="002">
        <dl>
          <dt>Character</dt>
          <dd>Lord Business</dd>
          <dt>Year</dt>
          <dd>2014</dd>
        </dl>
      </SidebarCollapsibleCard>
      <SidebarCollapsibleCard title="Step Brothers" id="003">
        <dl>
          <dt>Character</dt>
          <dd>Brennan Huff</dd>
          <dt>Year</dt>
          <dd>2008</dd>
        </dl>
      </SidebarCollapsibleCard>
    </Sortable>
  ))
