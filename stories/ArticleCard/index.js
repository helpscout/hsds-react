import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  ArticleCard,
  Flexy,
  Text,
  StatusBadge,
  Avatar,
  AvatarStack,
} from '../../src/index.js'
import AvatarSpec from '../AvatarGrid/specs/Avatar'

const badge = (
  <Flexy.Item>
    <StatusBadge count={20} status={'new'} />
  </Flexy.Item>
)

const metaHeader = (
  <Flexy align="top">
    <Flexy.Block>
      <Text faint size="12">
        Last updated 1 day ago
      </Text>
    </Flexy.Block>
    {badge}
  </Flexy>
)

const fixtures = AvatarSpec.generate(5)

const avatarsMarkup = fixtures.map(avatar => {
  const { name, image } = avatar
  return (
    <Avatar
      image={image}
      key={name}
      name={name}
      shape="rounded"
      status={null}
    />
  )
})

const footer = <AvatarStack max={5}>{avatarsMarkup}</AvatarStack>

const content = `Aspernatur amet et explicabo deserunt veritatis.
  Laudantium eveniet ab quia recusandae.
  Sequi libero fugit aspernatur.
  Qui sit eaque magnam non.
  Velit eius maiores aperiam eaque quia dolorem.
  Debitis distinctio at assumenda non suscipit quasi nam ipsam non.
  Quis accusantium quos quo eum at excepturi.`

storiesOf('ArticleCard', module)
  .add('default', () => <ArticleCard>Hello</ArticleCard>)
  .add('title', () => <ArticleCard title="Hello title">Hello</ArticleCard>)
  .add('meta header', () => (
    <ArticleCard metaHeader={metaHeader} title="Hello title">
      Hello
    </ArticleCard>
  ))
  .add('footer', () => (
    <ArticleCard footer={footer} title="Hello title">
      Hello
    </ArticleCard>
  ))
  .add('with everything', () => (
    <ArticleCard
      footer={footer}
      metaHeader={metaHeader}
      title="Hello title"
      content={content}
    />
  ))
