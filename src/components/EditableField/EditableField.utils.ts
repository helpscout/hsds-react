export const COMPONENT_KEY = 'EditableField'

export const ACTION_ICONS = {
  delete: 'cross-medium',
  link: 'link',
}

export function getFieldIndex(name: string): number {
  return Number(name.split('_')[1])
}

export function generateUniqueName(name: string, index?: number): string {
  return `${name}_${index || 0}`
}

export const deleteAction = {
  name: 'delete',
}
