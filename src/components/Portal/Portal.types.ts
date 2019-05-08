export type PortalProps = {
  className?: string
  exact?: boolean
  id?: string
  renderTo?: string | Object
  onBeforeOpen: (...args: any[]) => void
  onOpen: (...args: any[]) => void
  onBeforeClose: (...args: any[]) => void
  onClose: (...args: any[]) => void
  path?: string
  timeout: number
}
