export const COMPONENT_KEY = 'EditableTextarea'

/* istanbul ignore next */
export function scrollToTop(textArea) {
  textArea.scrollTo &&
    textArea.scrollTop > 0 &&
    textArea.scrollTo({ top: 0, behavior: 'smooth' })
}
