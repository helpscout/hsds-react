export type AttachmentProp = {
  id: string
  imageUrl: string
  mime: string
  name: string
  size: number | string
  url: string
}

export type AttachmentTheme = 'default' | 'preview'

export type AttachmentContext = {
  theme: AttachmentTheme
}
