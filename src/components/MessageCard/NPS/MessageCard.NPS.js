import React, { useRef } from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  ActionUI,
  CONTENT_CLASS_NAME,
  MainContentUI,
  NPSMessageCardWrapperUI,
  PoweredByUI,
} from './MessageCard.NPS.styles'
import { NPSQuestion } from './MessageCard.NPSQuestion'
import { MessageCardContext } from '../utils/MessageCard.context'
import { noop } from '../utils/MessageCard.utils'
import { useContentTransitions } from './MessageCard.NPS.hooks'

/**
 * This component, expect for just displaying MessageCard version of NPS survey, handles animations coordination.
 * Since some elements that are animated are located outside this component, it wasn't possible to use just CSS
 *
 * The main logic handlers are located in `useContentTransitions` hook and it provides several variables to manage styling:
 * - state - can be one of: initial, selected, submitted, confirmed - see below for state explanation
 * - currentHeight - used to set specific height on Card element
 * - isTransitioning - helper flag that is used to disabled scroll when transition/animation is in progress
 *
 * State explanation:
 * "initial" is set at component mount and doesn't do anything special - there is no way to get back to it
 * "selected" is set when user clicks on some NPS score - this is used to know when to change card height to fit content properly
 * "submitted" is set after successful submission of response has been made - this is used to start "hiding content" animation
 * "confirmed" is set after content was hidden and is used to resize card and show confirmation message (this state is not triggered by any user action)
 *
 * All of this because of the required timing of all animations and the fact that the action itself is provided as a prop
 * (to keep it consistent with "standard" MessageCard API and to re-use as much of existing code as possible, mainly MessageCardSurvey component)
 *
 * Below is description of how the animations look like.
 *
 * With feedback form:
 *
 *                                2. (increased height)   3. (labels removed,      4. (button slides up)
 *  1.                                                        input slides up)
 * --------------                   -------------           -------------           -------------
 * |  QUESTION  |   Select score    | QUESTION  |   (time)  | QUESTION  |   (time)  | QUESTION  |
 * |  SCORES    |  -------------->  | SCORES    |  ------>  | SCORES    | ------->  | SCORES    |  -------|
 * |  LABELS    |                   | LABELS    |           | INPUT     |           | INPUT     |         |
 * --------------                   |           |           |           |           | BUTTON    |         v
 *                                  -------------           -------------           -------------
 *
 * User clicks a button to send:
 *
 *  5. (spinner displayed)     6. (slide down content)     7. (decrease height)     8. (show confirmation text)
 * -------------                    -------------           -------------           -----------------
 * | QUESTION  |  submit finished   |           |   (time)  |           |   (time)  | CONFIRMATION  |
 * | SCORES    | ---------------->  |           |  ------>  ------------- ------->  -----------------
 * | INPUT     |                    |           |
 * | BUTTON    |                    |           |
 * -------------                    -------------
 *
 *
 * If there is no feedback form, the difference is that "selected" state is never set, and a few steps are skipped (2, 3 and 4).
 * After selecting a score, submit is in progress, no content change is made, and after it's finished, proceed starting with step 6.
 *
 */
export const NPSMessageCard = React.memo(
  React.forwardRef(
    (
      {
        children,
        question,
        className,
        action,
        poweredLink,
        variables = [],
        withContentAnimations,
        ...rest
      },
      ref
    ) => {
      const getClassName = () => {
        return classNames('c-NPSMessageCard', className)
      }
      const cardRef = useRef(null)
      const {
        state,
        setState,
        currentHeight,
        isTransitioning,
      } = useContentTransitions(cardRef, withContentAnimations)

      const onSelectionWithComment = () => setState('selected')
      const onSuccessfulSubmit = () => setState('submitted')

      const confirmed = state === 'confirmed'

      const contextValue = {
        onSelectionWithComment,
        onSuccessfulSubmit,
        canShowConfirmationMessage: !withContentAnimations || confirmed,
      }

      return (
        <MessageCardContext.Provider value={contextValue}>
          <NPSMessageCardWrapperUI
            className={getClassName()}
            ref={ref}
            nodeRef={cardRef}
            $height={currentHeight}
            $isTransitioning={isTransitioning}
            $withContentAnimations={withContentAnimations}
            {...rest}
            footer={
              <PoweredByUI>
                <a href={poweredLink} target="_blank" rel="noreferrer">
                  Powered by Help Scout
                </a>
              </PoweredByUI>
            }
          >
            {() => (
              <MainContentUI
                hide={state === 'submitted'}
                confirmed={confirmed}
                className={CONTENT_CLASS_NAME}
                $withContentAnimations={withContentAnimations}
              >
                {!confirmed && (
                  <NPSQuestion question={question} variables={variables} />
                )}
                {action && (
                  <ActionUI
                    data-cy="beacon-nps-message-action-wrapper"
                    $withContentAnimations={withContentAnimations}
                  >
                    {action()}
                  </ActionUI>
                )}
              </MainContentUI>
            )}
          </NPSMessageCardWrapperUI>
        </MessageCardContext.Provider>
      )
    }
  )
)

NPSMessageCard.defaultProps = {
  align: 'right',
  animationSequence: '',
  'data-cy': 'NPSMessageCard',
  in: true,
  isMobile: false,
  isWithBoxShadow: true,
  onShow: noop,
  withAnimation: false,
  withContentAnimations: true,
}

NPSMessageCard.propTypes = {
  /** Render-prop that is placed in the CTA section of the Message. */
  action: PropTypes.func,
  /** Apply styles for left or right-aligned Message. */
  align: PropTypes.oneOf(['left', 'right']),
  /** Question of the Message. */
  question: PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** Programatically triggering the animation. */
  in: PropTypes.bool,
  /** Adds mobile styles */
  isMobile: PropTypes.bool,
  /** Adds a box shadow. */
  isWithBoxShadow: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback invoked when the MessageCard is show to the user. */
  onShow: PropTypes.func,
  /** Enable animations when showing the Message. */
  withAnimation: PropTypes.bool,
  /** List of variables that can be highlighted inside Message. */
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string,
    })
  ),
  /** Question of the Message. */
  poweredLink: PropTypes.string,
  /** Determines if MessageCard should have animated content changes - useful for disabling when is Message preview. */
  withContentAnimations: PropTypes.bool,
}

export default NPSMessageCard
