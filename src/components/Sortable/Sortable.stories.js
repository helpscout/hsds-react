import React from 'react'
import { Card, Sortable, SidebarCollapsibleCard } from '../index'

export default {
  component: Sortable,
  title: 'Components/Structural/Sortable',
}

export const Default = () => (
  <Sortable>
    <Card>Jacobim Mugatu</Card>
    <Card>Lord Business</Card>
    <Card>Brennan Huff</Card>
  </Sortable>
)

Default.story = {
  name: 'default',
}

export const Sidebar = () => (
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
)

Sidebar.story = {
  name: 'sidebar',
}
