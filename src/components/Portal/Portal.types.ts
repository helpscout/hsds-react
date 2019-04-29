export interface PortalProps {
  className?: string
  exact?: boolean
  id?: string
  renderTo?: string | Object
  onBeforeOpen: () => void
  onOpen: () => void
  onBeforeClose: (fn?) => void
  onClose: () => void
  path?: string
  timeout: number
}
