import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  ArticleCard,
  Flexy,
  Text,
  StatusBadge,
  Avatar,
  AvatarStack,
  styled,
} from '../src/index.js'
import AvatarSpec from './AvatarGrid/specs/Avatar'

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

const footer = (
  <AvatarStack max={5} size="sm">
    {avatarsMarkup}
  </AvatarStack>
)

const WrapperUI = styled('div')`
  box-sizing: border-box;
  background: #eee;
  max-width: 350px;
  padding: 12px;
`

const content = `Aspernatur amet et explicabo deserunt veritatis.
  Laudantium eveniet ab quia recusandae.
  Sequi libero fugit aspernatur.
  Qui sit eaque magnam non.
  Velit eius maiores aperiam eaque quia dolorem.
  Debitis distinctio at assumenda non suscipit quasi nam ipsam non.
  Quis accusantium quos quo eum at excepturi.`

const stories = storiesOf('ArticleCard', module)

stories.add('default', () => <ArticleCard content="Hello" />)

stories.add('title', () => <ArticleCard title="Hello title" content="Hello" />)

stories.add('meta header', () => (
  <ArticleCard metaHeader={metaHeader} title="Hello title" content="Hello" />
))

stories.add('footer', () => (
  <ArticleCard footer={footer} title="Hello title" content="Hello" />
))

stories.add('with everything', () => (
  <ArticleCard
    footer={footer}
    metaHeader={metaHeader}
    title="Hello title"
    content={content}
  />
))

stories.add('Link', () => (
  <ArticleCard
    href="#"
    footer={footer}
    metaHeader={metaHeader}
    title="Hello title"
    content={content}
  />
))

stories.add('Consecutive', () => (
  <WrapperUI>
    <ArticleCard href="#" title="Hello title" content={content} />
    <ArticleCard href="#" title="Hello title" content={content} />
  </WrapperUI>
))

stories.add('Consecutive: Everything', () => (
  <WrapperUI>
    <ArticleCard
      href="#"
      footer={footer}
      metaHeader={metaHeader}
      title="Hello title"
      content={content}
    />
    <ArticleCard
      href="#"
      footer={footer}
      metaHeader={metaHeader}
      title="Hello title"
      content={content}
    />
  </WrapperUI>
))
