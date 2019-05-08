import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card, Sortable, SidebarCollapsibleCard } from '../src/index'

storiesOf('Sortable', module)
  .add('default', () => (
    <Sortable>
      <Card>Jacobim Mugatu</Card>
      <Card>Lord Business</Card>
      <Card>Brennan Huff</Card>
    </Sortable>
  ))
  .add('sidebar', () => (
    <Sortable
      useDragHandle
      hideDragHandles
      style={{ padding: 10, background: '#f1f3f5' }}
    >
      <SidebarCollapsibleCard title="Zoolander 2">
        <dl>
          <dt>Character</dt>
          <dd>Jacobim Mugatu</dd>
          <dt>Year</dt>
          <dd>2016</dd>
        </dl>
      </SidebarCollapsibleCard>
      <SidebarCollapsibleCard title="The Lego Movie">
        <dl>
          <dt>Character</dt>
          <dd>Lord Business</dd>
          <dt>Year</dt>
          <dd>2014</dd>
        </dl>
      </SidebarCollapsibleCard>
      <SidebarCollapsibleCard title="Step Brothers">
        <dl>
          <dt>Character</dt>
          <dd>Brennan Huff</dd>
          <dt>Year</dt>
          <dd>2008</dd>
        </dl>
      </SidebarCollapsibleCard>
    </Sortable>
  ))
