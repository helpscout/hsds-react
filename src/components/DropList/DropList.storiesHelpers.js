import React, { useRef, useReducer, forwardRef } from 'react'
import styled from 'styled-components'
import DropList from './'

const WrapperUI = styled('div')`
  display: flex;
  flex-direction: row;
  width: 50%;
`
const ItemUI = styled('div')`
  position: relative;
  margin-right: 30px;
`

const TogglerUI = styled('button')`
  position: absolute;
  height: 1px;
  width: 1px;
  min-width: 1px;
  padding: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
`

const InvisibleToggler = forwardRef((props, ref) => {
  return <TogglerUI tabIndex="-1" ref={ref} />
})

const someItems = [
  { label: 'John' },
  { label: 'Juan' },
  { label: 'Joseph' },
  { label: 'Paul' },
  { label: 'Ringo' },
  { label: 'George' },
  { label: 'Bob' },
  { label: 'Jeff' },
  { label: 'David' },
]

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case 'select':
      return {
        ...state,
        value: payload.value,
        isOpen: false,
        items: [],
        highlightedIndex: 0,
        selectedItem: payload.selection,
      }

    case 'cancel':
      return {
        ...state,
        isOpen: false,
        items: [],
        highlightedIndex: 0,
      }

    case 'typing':
      let updatedItems = []

      if (payload.value.length > 2) {
        updatedItems = someItems.filter(
          item =>
            item.label.charAt(0).toLowerCase() ===
            payload.value.charAt(0).toLowerCase()
        )
      }

      return {
        ...state,
        value: payload.value,
        items: updatedItems,
        isOpen: updatedItems.length > 0,
      }

    case 'highlight':
      let updatedIndex = 0

      if (payload.direction === 'up') {
        updatedIndex =
          state.highlightedIndex === 0
            ? state.items.length - 1
            : state.highlightedIndex - 1
      } else if (payload.direction === 'down') {
        updatedIndex =
          state.highlightedIndex >= state.items.length - 1
            ? 0
            : state.highlightedIndex + 1
      }

      return { ...state, highlightedIndex: updatedIndex }

    default:
      return state
  }
}

const DropListAutocomplete = () => {
  const initialState = {
    isOpen: false,
    items: [],
    highlightedIndex: 0,
    value: '',
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const inputRef = useRef(null)

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      dispatch({
        type: 'highlight',
        payload: {
          direction: 'up',
        },
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      dispatch({
        type: 'highlight',
        payload: {
          direction: 'down',
        },
      })
    } else if (e.key === 'Enter') {
      dispatch({
        type: 'select',
        payload: {
          value: state.items[state.highlightedIndex].label,
        },
      })
    } else if (e.key === 'Escape') {
      dispatch({
        type: 'cancel',
      })
    }
  }

  function handleOnChange(e) {
    const { target } = e

    dispatch({
      type: 'typing',
      payload: {
        value: target.value,
      },
    })
  }

  return (
    <ItemUI>
      <input
        type="text"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={state.value}
        ref={inputRef}
      />
      <DropList
        clearOnSelect
        customEmptyList={<span />}
        focusListOnOpen={false}
        focusTogglerOnMenuClose={false}
        highlightIndex={state.highlightedIndex}
        isMenuOpen={state.isOpen}
        items={state.items}
        onSelect={selection => {
          dispatch({
            type: 'select',
            payload: {
              value: selection.label,
            },
          })
        }}
        onOpenedStateChange={isOpen => {
          if (!isOpen) {
            inputRef && inputRef.current.focus()
          }
        }}
        toggler={<InvisibleToggler />}
      />
    </ItemUI>
  )
}

export const DropListTest = () => {
  return (
    <WrapperUI>
      <DropListAutocomplete />
    </WrapperUI>
  )
}
