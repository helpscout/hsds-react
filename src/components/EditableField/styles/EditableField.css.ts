import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const EditableFieldUI = styled('div')`
  ${baseStyles};
  position: relative;
  margin-bottom: 20px;
`

export const EditableFieldLabelUI = styled('label')``

export const LabelTextUI = styled('span')`
  ${baseStyles};
  display: block;
  margin-bottom: 5px;
  font-size: 13px;
  color: rebeccapurple;
`

export const FieldStaticValueUI = styled('span')`
  ${baseStyles};
  position: relative;
  color: plum;
  width: 100%;
  display: block;
  height: 25px;
  line-height: 25px;
  padding: 0px 0px 6px;
  font-size: 16px;
  font-family: sans-serif;
  z-index: 2;
  pointer-events: none;

  .is-editing & {
    z-index: 1;
  }
`

export const FieldInputUI = styled('input')`
  ${baseStyles};
  position: absolute;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid transparent;
  height: 25px;
  line-height: 27px;
  padding: 3px 0px;
  letter-spacing: 0;
  color: transparent;
  font-family: sans-serif;
  z-index: 1;

  &:hover {
    cursor: pointer;
    border-bottom: 2px dotted slategray;
  }

  .is-editing & {
    z-index: 2;
    color: black;
    border-bottom: 2px solid dodgerblue !important;
  }
`

export const FieldContentUI = styled('div')`
  ${baseStyles};
  position: relative;
  margin-bottom: 10px;

  &:hover .Field__actions {
    opacity: 1;
    cursor: pointer;
  }
`
export const FieldActionsUI = styled('div')`
  ${baseStyles};
  position: absolute;
  right: 0;
  z-index: 3;
  opacity: 0;

  .is-editing & {
    opacity: 1;
    cursor: pointer;
  }
`
export const FieldButtonUI = styled('button')`
  ${baseStyles};
  font-family: monospace;
  display: inline-block;
  text-align: center;
  border: 1px solid silver;
  color: slategray;
  border-radius: 2px;
  height: 20px;
  width: 20px;
  padding: 0;
  background-color: transparent;
  margin: 0;
  vertical-align: middle;
  margin-left: 5px;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`

// .Field__button--delete:focus,
// .Field__button--delete:hover {
//   color: red;
//   border: 1px solid red;
// }

// .Field__button--copy:focus,
// .Field__button--copy:hover {
//   color: LightSeaGreen;
//   border: 1px solid LightSeaGreen;
// }

// .Field__button--visit {
//   text-decoration: none;
//   line-height: 20px;
// }

/* 
============================================
EDITING
============================================
*/
