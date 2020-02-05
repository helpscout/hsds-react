import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import {
  ArticleCard,
  Flexy,
  Text,
  StatusBadge,
  Avatar,
  AvatarStack,
  Icon,
} from '../index'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'

export default {
  component: ArticleCard,
  title: 'Components/ArticleCard',
}

const fixtures = AvatarSpec.generate(5)
const avatarsMarkup = fixtures.map(avatar => {
  const { name, image } = avatar
  return <Avatar image={image} key={name} name={name} status={null} />
})

const baseGuide = {
  position: 'absolute',
  width: '100%',
  zIndex: 1000,
}

export const guides = [
  {
    ...baseGuide,
    height: 20,
  },
  {
    ...baseGuide,
    height: 22,
    top: 'none',
    bottom: 0,
  },
  {
    ...baseGuide,
    height: '100%',
    width: 20,
  },
  {
    ...baseGuide,
    height: '100%',
    left: 'none',
    right: 0,
    width: 20,
  },
  {
    ...baseGuide,
    height: 5,
    top: 'none',
    color: 'blue',
    bottom: -4,
  },
]

export function makeGuides(guides) {
  return guides.map((guide, key) => <Guide key={key} {...guide} />)
}

const ArticleSpec = createSpec({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
})

const article = ArticleSpec.generate()

export const Default = () => {
  const { content, title } = article

  const metaHeaderConfig = boolean('metaHeader', false)
  const footerConfig = boolean('footer', false)
  const consecutive = boolean('Multiple Cards', false)

  const props = {
    content: text('content', content),
    href: text('href', '#'),
    title: text('title', title),
    isHovered: boolean('isHovered', false),
    metaHeader: metaHeaderConfig && metaHeader(),
    footer: footerConfig && footer(),
  }

  return (
    <div style={{ position: 'relative' }}>
      <GuideContainer position="absolute" width="100%" height="100%">
        {makeGuides(guides)}
      </GuideContainer>
      <ArticleCard {...props} />
      {consecutive && <ArticleCard {...props} />}
    </div>
  )
}

export const Content = () => {
  const content = (
    <Flexy>
      <Flexy.Block>
        <Text size={13} weight="500">
          Open me
        </Text>
      </Flexy.Block>
      <Flexy.Item>
        <Icon name="minimize" shade="extraMuted" />
      </Flexy.Item>
    </Flexy>
  )

  return <ArticleCard content={content} />
}

function metaHeader() {
  return (
    <Flexy align="top">
      <Flexy.Block>
        <Text faint size="12">
          Last updated 1 day ago
        </Text>
      </Flexy.Block>
      <Flexy.Item>
        <StatusBadge count={20} status={'new'} />
      </Flexy.Item>
    </Flexy>
  )
}

function footer() {
  return (
    <AvatarStack max={5} size="sm" version={2}>
      {avatarsMarkup}
    </AvatarStack>
  )
}
