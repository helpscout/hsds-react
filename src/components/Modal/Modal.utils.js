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
