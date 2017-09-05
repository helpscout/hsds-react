import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card, FormGroup, Grid, Input } from '../src/index.js'

storiesOf('Grid', module)
  .add('default', () => (
    <Grid>
      <Grid.Col size='8, 6@lg'>
        <Card hover>Hello</Card>
      </Grid.Col>
      <Grid.Col size='4, 6@lg'>
        <Card hover>There</Card>
      </Grid.Col>
    </Grid>
  ))
  .add('form', () => (
    <form>
      <FormGroup.Grid>
        <Grid.Col size='4'>
          <Input.Static align='right'>First name</Input.Static>
        </Grid.Col>
        <Grid.Col size='8'>
          <Input placeholder='Ron Burgandy' autoFocus />
        </Grid.Col>
      </FormGroup.Grid>

      <FormGroup.Grid>
        <Grid.Col size='4'>
          <Input.Static align='right'>Last name</Input.Static>
        </Grid.Col>
        <Grid.Col size='8'>
          <Input placeholder='Is the best' />
        </Grid.Col>
      </FormGroup.Grid>
    </form>
  ))
