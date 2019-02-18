import React from 'react'
import { storiesOf } from '@storybook/react'
import { SideNavigation } from '../src/index.js'
import styled from '../src/components/styled'

const stories = storiesOf('SideNavigation', module)

stories.add('default', () => <SideNavigation />)
