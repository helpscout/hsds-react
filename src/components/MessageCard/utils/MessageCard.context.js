import { createContext, useContext } from 'react'
import { noop } from './MessageCard.utils'

const defaultContext = {
  onSelectionWithComment: noop,
  onSuccessfulSubmit: noop,
  canShowConfirmationMessage: true,
}

/**
 * This context can be used to "hook" into different stages of provided action interaction.
 * Its value should be set on the variant of Message Card (standard, NPS, etc.) and is to be called/set inside action
 *
 * This was necessary to introduce, to be able to perform some actions on user interaction - for example fire animation when NPS score has been selected.
 * The reason why it cannot be done directly at the moment is that action is not part of the MessageCard itself, but is provided as a prop, so those 2 are disconnected from each other
 */
export const MessageCardContext = createContext(defaultContext)

export const useMessageCardContext = () => {
  const context = useContext(MessageCardContext) || {}
  return {
    ...defaultContext,
    ...context,
  }
}
