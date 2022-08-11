import styled, { css } from 'styled-components'
import { getColor } from '../../../../styles/utilities/color'
import { focusRing } from '../../../../styles/mixins/focusRing.css'
import RateAction from '../../../RateAction'
import Button from '../../../Button'
import { setFontSize } from '../../../../styles/utilities/font'
import { FONT_FAMILY } from '../../../HSDS/GlobalStyle'
import ChoiceGroup from '../../../ChoiceGroup'
import Radio from '../../../Radio'

const defaultTransition = css`
  transition: all 0.2s ease-in-out;
`

export const SurveyUI = styled('div')`
  background: ${getColor('grey.200')};
  border-radius: 5px;
  margin: 0px -16px -16px -16px;
  padding: 15px;
  position: relative;
`

export const SurveyOptionsUI = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EmojiButtonUI = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 22px;
  margin-left: 5px;
  margin-right: 5px;
  height: 42px;
  width: 42px;
  ${defaultTransition};

  ${focusRing};
  --focusRingOffset: 0px;
  --focusRingRadius: 50%;

  &:hover,
  &:focus {
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
    &:after {
      animation: HSDSRateActionSelected 200ms
        cubic-bezier(0.39, 0.575, 0.565, 1) both;
      box-sizing: border-box;
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

    & > span {
      height: auto;
      top: 1px;
    }
  }

  & > span {
    display: block;
    height: 26px;
    position: relative;
  }

  // Native emojis show up off-centered on non-retina screens...
  // Which is why we need to adjust the margin a little bit here.
  @media not screen and (min-device-pixel-ratio: 2),
    not screen and (min-resolution: 192dpi) {
    & > span {
      top: -1px;
    }

    &.is-md {
      font-size: 11px;

      & > span {
        top: 0;
      }
    }
  }
`

export const ImageEmojiUI = styled('img')`
  display: inline-block;
  height: 22px;
  position: relative;
  width: auto;
  ${defaultTransition};

  &.is-md {
    height: 12px;
  }
`

export const RateActionUI = styled(RateAction)`
  margin-left: 5px !important;
  margin-right: 5px !important;

  &.c-RateAction {
    ${defaultTransition};

    ${focusRing};
    --focusRingOffset: 0px;
    --focusRingRadius: 50%;

    svg {
      ${defaultTransition};
    }

    &.is-md {
      svg {
        width: 20px;
        height: 20px;
      }
    }

    &:after {
      box-sizing: border-box;
      ${defaultTransition};
    }

    &.is-active:not(:hover):not(:focus) {
      & {
        transform: none;
      }
    }
  }

  &:first-child {
    margin-left: 0;
  }
`

export const FeedbackFormUI = styled('form')`
  // adding padding and negative margin to compensate, because of focus state of children
  // without this, the outline (box shadow) is cut off on the sides/bottom
  padding: 4px;
  margin: 12px -4px -4px;
  overflow: hidden;
  animation: HeightAnimation 400ms;

  @keyframes HeightAnimation {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 400px;
    }
  }
`

export const FeedbackLabelUI = styled('label')`
  color: ${getColor('charcoal.500')};
  display: block;
  margin-bottom: 10px;
  text-align: center;
`

export const SubmitFeedbackFormButtonUI = styled(Button)`
  &.is-size-xxl {
    --buttonMinWidth: 100%;
    margin-top: 15px;
    width: 100%;

    ${setFontSize(14)};
    font-family: ${FONT_FAMILY};
    line-height: normal !important;
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
  right: 0;
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

export const MultipleChoiceGroupUI = styled(ChoiceGroup)`
  background-color: #fff;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 5px 15px;

  & .c-FormGroupChoice {
    margin-bottom: 0;
  }
`

export const MultipleChoiceRadioUI = styled(Radio)`
  .c-Choice__label-text {
    height: 36px;
    display: flex;
    align-items: center;

    .c-Text {
      font-size: 14px;
      line-height: normal;
      color: ${getColor('charcoal.700')};
    }
  }

  .c-InputBackdropV2 {
    &.is-radio.is-filled {
      background-color: ${getColor('charcoal.300')};
      border-color: ${getColor('charcoal.300')};
    }

    &__focus {
      box-shadow: 0 0 0 2px ${getColor('charcoal.300')};
    }
  }
`
