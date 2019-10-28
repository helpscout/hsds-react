export const EMPTY_VALUE = ''

export const OPERATION: { CREATE: string; DELETE: string; UPDATE: string } = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}

export const CAUSE: {
  BLUR: string
  ENTER: string
  OPTION_SELECTION: string
  DELETE_ACTION: string
} = {
  BLUR: 'BLUR',
  ENTER: 'ENTER',
  OPTION_SELECTION: 'OPTION_SELECTION',
  DELETE_ACTION: 'DELETE_ACTION',
}

export const ACTION_ICONS = {
  delete: 'cross-small',
  link: 'new-window',
  plus: 'plus-small',
  valueOption: 'chevron-down',
}

export const FIELDTYPES = {
  text: 'text',
  email: 'email',
  url: 'url',
  tel: 'tel',
  number: 'number',
  textarea: 'textarea',
}

export const FIELDSIZES = { md: 'md', lg: 'lg' }

export const FIELDSTATES = {
  default: 'default',
  error: 'error',
  warning: 'warning',
}
