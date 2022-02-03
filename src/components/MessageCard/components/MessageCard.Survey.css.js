import styled from 'styled-components'
import { getColor } from '../../../styles/utilities/color'

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
  transition: transform 0.2s ease-in-out;
  width: 42px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    transform: scale(1.3);
  }

  &.is-selected {
    border: 2px solid ${getColor('blue.500')};
  }
`

export const FeedbackFormUI = styled('form')`
  margin-top: 16px;

  label {
    color: ${getColor('charcoal.500')};
    display: block;
    margin-bottom: 6px;
  }

  .c-Button {
    height: 54px;
    margin-top: 15px;
    width: 100%;
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
