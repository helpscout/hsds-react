export const COMPONENT_KEY = {
  Modal: 'Modal',
  Header: 'ModalHeader',
  HeaderV2: 'ModalHeaderV2',
  Body: 'ModalBody',
  Content: 'ModalContent',
  ActionFooter: 'ModalActionFooter',
  Footer: 'ModalFooter',
  Overlay: 'ModalOverlay',
}

export const MODAL_KIND = {
  ALERT: 'alert',
  DEFAULT: 'default',
  BRANDED: 'branded',
  SEQUENCE: 'sequence',
}

export const getModalKindClassName = kind => {
  switch (kind) {
    case MODAL_KIND.ALERT:
      return 'is-alert'
    case MODAL_KIND.BRANDED:
      return 'is-branded'
    case MODAL_KIND.SEQUENCE:
      return 'is-sequence'
    default:
      return 'is-default'
  }
}
