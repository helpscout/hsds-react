import React, { useState } from 'react'
import styled from 'styled-components'
import DropList from './'
import { SimpleButton } from './DropList.togglers'
import { regularItems } from '../../utilities/specs/dropdown.specs'

const someItems = [
  { label: 'John' },
  { label: 'Paul' },
  { label: 'Ringo' },
  { label: 'George' },
  { label: 'Bob' },
  { label: 'Jeff' },
  { label: 'David' },
]

export const DropListTest = () => {
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex(index === 0 ? 0 : index - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex(index === items.length - 1 ? items.length - 1 : index + 1)
    } else if (e.key === 'Enter') {
      setValue(items[index].label)
      setItems([])
    }
  }

  function handleOnChange(e) {
    const { target } = e

    setValue(target.value)

    if (target.value.length > 2) {
      setItems(
        someItems.filter(
          item =>
            item.label.charAt(0).toLowerCase() ===
            target.value.charAt(0).toLowerCase()
        )
      )
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <DropList
        index={index}
        isMenuOpen={!!items.length}
        items={items}
        focusTogglerOnMenuClose={false}
        focusListOnOpen={false}
        toggler={<SimpleButton text="This is a select" />}
      />
    </div>
  )
}
