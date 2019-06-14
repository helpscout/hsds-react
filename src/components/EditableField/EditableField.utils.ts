export const COMPONENT_KEY = 'EditableField'

export function getFieldIndex(name: string) {
  return Number(name.split('_')[1])
}
