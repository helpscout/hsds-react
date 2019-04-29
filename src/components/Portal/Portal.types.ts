export type PortalProps = {
  className?: string
  exact?: boolean
  id?: string
  renderTo?: string | Object
  onBeforeOpen: () => void
  onOpen: () => void
  onBeforeClose: () => void
  onClose: () => void
  path?: string
  timeout: number
}
