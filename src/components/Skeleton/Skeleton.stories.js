import React from 'react'
import { FormGroup, Flexy, Skeleton } from '../index'

export default {
  component: Skeleton,
  title: 'Components/Skeleton',
}

export const Default = () => (
  <div style={{ width: 300 }}>
    <Flexy>
      <Flexy.Item>
        <Skeleton.Avatar size="lg" />
      </Flexy.Item>
      <Flexy.Block>
        <Skeleton.Heading width="70%" />
        <Skeleton.Text width="40%" />
      </Flexy.Block>
    </Flexy>
    <Skeleton.Paragraph />
  </div>
)

Default.story = {
  name: 'default',
}

export const WithoutAnimations = () => (
  <div style={{ width: 300 }}>
    <Flexy>
      <Flexy.Item>
        <Skeleton.Avatar size="lg" withAnimations={false} />
      </Flexy.Item>
      <Flexy.Block>
        <Skeleton.Heading width="70%" withAnimations={false} />
        <Skeleton.Text width="40%" withAnimations={false} />
      </Flexy.Block>
    </Flexy>
    <Skeleton.Paragraph withAnimations={false} />
  </div>
)

WithoutAnimations.story = {
  name: 'without animations',
}

export const _Avatar = () => (
  <div>
    <Skeleton.Avatar size="lg" />
    <Skeleton.Avatar size="md" />
    <Skeleton.Avatar size="sm" />
  </div>
)

_Avatar.story = {
  name: 'avatar',
}

export const _Heading = () => (
  <div>
    <Skeleton.Heading width="70%" />
  </div>
)

_Heading.story = {
  name: 'heading',
}

export const Form = () => (
  <div style={{ width: 300 }}>
    <FormGroup>
      <Skeleton.Control size="sm" style={{ marginBottom: 5 }} />
      <Skeleton.Control size="sm" />
    </FormGroup>
    <FormGroup>
      <Skeleton.Control />
    </FormGroup>
  </div>
)

Form.story = {
  name: 'form',
}

export const _Image = () => (
  <div style={{ width: 300 }}>
    <Skeleton.Image />
  </div>
)

_Image.story = {
  name: 'image',
}

export const _Paragraph = () => (
  <div>
    <Skeleton.Paragraph />
  </div>
)

_Paragraph.story = {
  name: 'paragraph',
}

export const ParagraphWithHeading = () => (
  <div>
    <Skeleton.Heading />
    <Skeleton.Paragraph />
  </div>
)

ParagraphWithHeading.story = {
  name: 'Paragraph with heading',
}

export const ParagraphWithSmallHeading = () => (
  <div>
    <Skeleton.Heading size="sm" />
    <Skeleton.Paragraph />
  </div>
)

ParagraphWithSmallHeading.story = {
  name: 'paragraph with small heading',
}

export const _Text = () => (
  <div>
    <Skeleton.Text width="70%" />
  </div>
)

_Text.story = {
  name: 'text',
}
