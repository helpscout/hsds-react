import React from 'react'
import { storiesOf } from '@storybook/react'
import { ArticleCard, Card, CardList } from '../src/index.js'

storiesOf('CardList', module)
  .add('default', () => (
    <CardList>
      <Card>One</Card>
      <Card>Two</Card>
      <Card>Three</Card>
      <Card>Four</Card>
      <Card>Five</Card>
    </CardList>
  ))
  .add('ArticleCard', () => (
    <CardList>
      <ArticleCard title="Hello one" content="One" />
      <ArticleCard title="Hello two" content="Two" />
      <ArticleCard title="Hello three" content="Three" />
    </CardList>
  ))
  .add('Animation Props', () => (
    <CardList animationDelay={500} animationStagger={300}>
      <Card>One</Card>
      <Card>Two</Card>
      <Card>Three</Card>
    </CardList>
  ))
