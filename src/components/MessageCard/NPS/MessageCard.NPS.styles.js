import styled, { css } from 'styled-components'
import {
  ConfirmationMessageUI,
  FeedbackFormUI,
  FeedbackLabelUI,
  SpinnerContainerUI,
  SubmitFeedbackFormButtonUI,
  SurveyUI,
} from '../components/survey/MessageCard.Survey.styles'
import { messageVariablePill } from '../utils/MessageCard.utils.styles'
import { messageVariableClassName } from '../utils/MessageCard.utils'
import { MessageCardContentUI } from '../MessageCard.styles'
import { ScoreLabelsUI } from '../components/survey/MessageCard.Survey.NPS.styles'
import MessageCardWrapper from '../MessageCard.Wrapper'
import { makeFontFamily } from '../../../styles/utilities/font'
import { getColor } from '../../../styles/utilities/color'
import { focusRing } from '../../../styles/mixins/focusRing.css'

const interFontFamily = makeFontFamily('Inter')

const instantAnimationConditions = css`
  @media screen and (prefers-reduced-motion: reduce) {
    animation-duration: 0ms;
    animation-delay: 0ms;
    transition: all 0ms;
  }

  ${({ $withContentAnimations }) =>
    !$withContentAnimations &&
    css`
      animation-duration: 0ms;
      animation-delay: 0ms;
      transition: all 0ms;
    `}
`

export const HIDE_CONTENT_ANIMATION_NAME = 'hideContent'
export const POWERED_BY_HEIGHT = 24
export const CONFIRMATION_TEXT_HEIGHT = 66
export const CONTENT_CLASS_NAME = 'nps-content'

export const PoweredByUI = styled.div`
  flex-shrink: 0;
  height: ${POWERED_BY_HEIGHT}px;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  background-color: ${getColor('grey.200')};

  font-weight: 400;
  font-size: 10px;
  line-height: 20px;

  color: ${getColor('charcoal.400')};

  & > a {
    text-decoration: none;
    color: inherit;
    line-height: 14px;

    ${focusRing};
    --focusRingOffset: -3px;
    --focusRingRadius: 2px;

    &:hover {
      color: ${getColor('blue.600')};
    }
  }
`

export const NPSMessageCardWrapperUI = styled(MessageCardWrapper)`
  ${interFontFamily};
  position: relative;
  width: 484px;
  min-height: 110px;

  @media (max-width: 484px) {
    width: 100%;
  }

  height: ${({ $height }) => $height !== undefined && $height + 'px'};

  ${MessageCardContentUI} {
    max-width: 484px;
    padding: 30px 30px 0;
    ${({ $isTransitioning }) => $isTransitioning && 'overflow: hidden'};
  }

  transition: height 250ms;
  ${instantAnimationConditions};

  &.is-align-right ${PoweredByUI} {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 4px;
  }

  &.is-align-left ${PoweredByUI} {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 8px;
  }

  &.is-mobile {
    width: 100%;

    ${MessageCardContentUI} {
      margin: auto;
    }

    .c-Button.c-NPSScore {
      height: 30px;
      margin-top: 0;
    }

    .c-Button {
      margin-top: 15px;
      font-size: 14px;
      height: 50px;
    }
  }
`

export const QuestionUI = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: ${getColor('charcoal.700')};

  p {
    margin: 0;
  }

  ${messageVariablePill};

  .${messageVariableClassName} {
    &__text {
      font-weight: 500;
    }
  }
`

export const ContentUI = styled.div`
  position: relative;
`

export const MainContentUI = styled.div`
  ${({ hide }) => {
    return (
      hide &&
      css`
        animation: ${HIDE_CONTENT_ANIMATION_NAME} 250ms forwards;
        ${instantAnimationConditions};
      `
    )
  }};

  ${({ confirmed }) => {
    return (
      confirmed &&
      css`
        opacity: 1 !important; // needed to force with important because otherwise animation with "forwards" is overwriting here
        transform: translateY(0) !important;
      `
    )
  }} @keyframes ${HIDE_CONTENT_ANIMATION_NAME} {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(24px);
    }
  }
`

export const ActionUI = styled.div`
  padding-bottom: 10px;

  & ${SurveyUI} {
    background-color: transparent;
    padding: 12px 0 0 0;
    margin: 0;
  }

  & ${ScoreLabelsUI} {
    ${({ $withContentAnimations }) =>
      $withContentAnimations &&
      css`
        &.is-hidden {
          overflow: hidden;

          animation: hideLabels 300ms forwards;
          animation-delay: 150ms;

          ${instantAnimationConditions};

          @keyframes hideLabels {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px);
              height: 0;
              padding: 0;
            }
          }
        }
      `}
  }

  & ${FeedbackFormUI} {
    margin-top: 20px;
    padding-bottom: 20px;
    width: 430px;

    @media (max-width: 484px) {
      width: auto;
    }

    opacity: 0;
    animation: showFormElements 300ms forwards;
    animation-delay: 400ms;
    ${instantAnimationConditions};
  }

  & ${ConfirmationMessageUI} {
    height: ${CONFIRMATION_TEXT_HEIGHT}px;
    margin: -30px -15px -5px;
    font-size: 14px;
    opacity: 0;
    animation: showFormElements 300ms forwards;
    animation-delay: 450ms;
    ${instantAnimationConditions};
  }

  & ${SpinnerContainerUI} {
    width: calc(100% + 15px);
  }

  & ${FeedbackLabelUI} {
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    color: ${getColor('charcoal.700')};
  }

  & ${SubmitFeedbackFormButtonUI} {
    opacity: 0;

    animation: showFormElements 300ms forwards;
    animation-delay: 600ms;
    ${instantAnimationConditions};
  }

  @keyframes showFormElements {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
