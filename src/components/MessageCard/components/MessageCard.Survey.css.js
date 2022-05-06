import styled, { css } from 'styled-components'
import { focusRing } from '../../../styles/mixins/focusRing.css'
import { getColor } from '../../../styles/utilities/color'
import Button from '../../Button'
import RateAction from '../../RateAction'

const defaultTransition = css`
  transition: all 0.2s ease-in-out;
`

export const SurveyUI = styled('div')`
  background: ${getColor('grey.200')};
  border-radius: 5px;
  margin: 0px -16px -16px -16px;
  padding: 14px 15px;
  position: relative;
`

export const SurveyOptionsUI = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EmojiButtonUI = styled('button')`
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 22px;
  margin-left: 10px;
  height: 42px;
  width: 42px;
  ${defaultTransition};

  ${focusRing};
  --focusRingOffset: -3px;
  --focusRingRadius: 50%;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    transform: scale(1.3);
  }

  &:after {
    content: '';
    border-radius: 50%;
    border: 2px solid ${getColor('grey.600')};
    display: none;
    height: 46px;
    left: -2px;
    pointer-events: none;
    position: absolute;
    top: -2px;
    width: 46px;
    ${defaultTransition};

    @keyframes HSDSRateActionSelected {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  &.is-selected {
    transform: scale(1.3);

    &:after {
      animation: HSDSRateActionSelected 200ms
        cubic-bezier(0.39, 0.575, 0.565, 1) both;
      display: block;
    }
  }

  &.is-md {
    height: 24px;
    width: 24px;
    font-size: 12px;

    &:after {
      height: 28px;
      width: 28px;
    }
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const RateActionUI = styled(RateAction)`
  margin-left: 10px !important;

  &.c-RateAction {
    ${defaultTransition};

    svg {
      ${defaultTransition};
    }

    &:after {
      ${defaultTransition};
    }
  }

  &:first-child {
    margin-left: 0;
  }
`

export const FeedbackFormUI = styled('form')`
  margin-top: 16px;
`

export const FeedbackLabelUI = styled('label')`
  color: ${getColor('charcoal.500')};
  display: block;
  margin-bottom: 6px;
`

export const SubmitFeedbackFormButtonUI = styled(Button)`
  &.is-size-xxl {
    --buttonMinWidth: 100%;
    margin-top: 15px;
  }
`

export const SpinnerContainerUI = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  color: ${getColor('charcoal.500')};
`

export const ConfirmationMessageUI = styled('div')`
  color: ${getColor('charcoal.500')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 0;
  text-align: center;

  .c-Icon {
    color: ${getColor('green.500')};
  }
`
