import styled from 'styled-components'

import { COLOURS, SIZES } from '../EditableField/EditableField.utils'
import { FONT_FAMILY } from '@hsds/utils-fonts'

const { field, focusIndicator, floatingLabel } = SIZES

export const ComponentUI = styled('div')`
  width: 100%;
  max-width: 100%;
  margin-bottom: 40px;
`

export const EditableTextareaUI = styled('div')`
  box-sizing: border-box;
  position: relative;
  display: flex;
  border-bottom: 1px dashed ${COLOURS.invisible};

  &::after {
    content: '';
    box-sizing: border-box;
    display: block;
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: ${focusIndicator.active};
    background-color: ${({ focusIndicatorColor }) => focusIndicatorColor};
    transform-origin: bottom left;
    transform: scaleX(1);
    transition: transform 0.3s ease;
    z-index: 3;
    will-change: transform;
  }

  &.is-readonly:after {
    transform: scaleX(0);
  }

  &.is-readonly {
    &:not(.with-placeholder) {
      border-bottom: 1px dashed ${COLOURS.invisible};
      &:hover {
        border-bottom: 1px dashed ${COLOURS.mask.border};
      }
    }
    textarea {
      cursor: text;
      background-color: #fff;

      &::placeholder {
        color: ${COLOURS.mask.placeholder.regular};
      }
    }
  }

  &.with-placeholder.is-readonly {
    .field:not(.is-hidden):not(.EditableTextarea__Textarea) {
      display: block;
      overflow: visible;
      width: 100%;

      span {
        border-bottom: 1px dashed ${COLOURS.mask.border};
        display: inline-block;
        height: 20px;
      }

      &:hover {
        cursor: pointer;
        span {
          border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.hover};
        }
      }
    }
  }

  &.is-readonly.is-clamped::before {
    content: '';
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: calc(100% - 10px);
    height: 50px;
    ${({ overflowCueColor }) =>
      `background: -moz-linear-gradient(
        top,
        ${overflowCueColor} 0%,
        rgba(255, 255, 255, 0) 100%
      );
      background: -webkit-linear-gradient(
        top,
        ${overflowCueColor} 0%,
        rgba(255, 255, 255, 0) 100%
      );
      background: linear-gradient(
        to top,
        ${overflowCueColor} 0%,
        rgba(255, 255, 255, 0) 100%
      )`};
    left: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 3;
  }

  .field {
    align-items: stretch;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
    border: 0;
    margin: 0;
    padding: 0 10px 0 0;
    color: ${COLOURS.input.regular};
    font-family: ${FONT_FAMILY};
    font-size: ${field.font.medium};
    line-height: 20px;
    outline: none;
    resize: none;
    overflow: hidden;
    box-shadow: none;
    scrollbar-width: thin;

    &:not(.is-hidden):not(.is-inline):not(.EditableTextarea__Textarea) {
      border-bottom: 1px solid transparent;
    }

    &.is-hidden {
      display: none;
    }

    &.is-inline {
      display: inline-block;
      height: 20px;
      width: auto;
      padding: 0;
      color: ${COLOURS.mask.placeholder.regular};
      border-bottom: 1px solid transparent;
    }
  }

  .EditableTextarea__Textarea {
    &.is-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      border: 0;
      transform: scaleX(0.1);
      transform-origin: top left;

      &::placeholder {
        color: ${COLOURS.invisible};
      }
    }

    &:hover,
    &:focus {
      overflow-y: auto;
      overscroll-behavior-y: contain;
    }

    &::placeholder {
      color: ${COLOURS.mask.placeholder.disabled};
    }

    .with-floatingLabels & {
      &::placeholder {
        color: ${({ inputValue }) =>
          `${inputValue ? COLOURS.invisible : COLOURS.input.placeholder}`};
      }
    }

    ::-webkit-scrollbar {
      width: 7px;
      background: rgba(0, 0, 0, 0);
      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.25);
      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 100px;
    }
  }
`

export const MaskUI = styled('div')`
  &.EditableTextarea__Mask {
    will-change: transform, font-size;
    transition-property: transform, font-size;
    transition-timing-function: linear;
    transition-duration: 0.2s;

    .with-floatingLabels & {
      display: block;
      opacity: ${({ inputValue }) => `${inputValue ? '1' : '0'}`};
      transform: ${({ inputValue }) => `translateY(${inputValue ? -15 : 0}px)`};
      transform-origin: center left;
      position: ${({ inputValue }) =>
        `${inputValue ? 'absolute' : 'relative'}`};
      z-index: 5;
      top: 0;
      left: 0;
      font-family: ${FONT_FAMILY};
      font-size: ${({ inputValue }) =>
        `${inputValue ? floatingLabel.font.medium : field.font.medium}`};
      color: ${COLOURS.input.placeholder};
    }

    .with-floatingLabels .is-readonly & {
      opacity: 1;
    }
  }
`
