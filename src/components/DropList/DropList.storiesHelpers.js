import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import DropList from './index'
import { IconBtn } from './DropList.togglers'
import { createSpec, faker } from '@helpscout/helix'
import { getColor } from '../../styles/utilities/color'
import forEach from '../../styles/utilities/forEach'

const tagsSpec = createSpec({
  id: faker.datatype.uuid(),
  label: faker.lorem.slug(2),
  className: faker.random.arrayElement([
    'is-blue',
    'is-green',
    'is-grey',
    'is-orange',
    'is-purple',
    'is-red',
    'is-yellow',
    'is-teal',
    'is-pink',
  ]),
})

const tag_colors = {
  blue: '#ACE3FF',
  green: '#BCF1CA',
  grey: getColor('grey.500'),
  orange: '#FFBE6B',
  purple: '#DDCCFF',
  red: '#FFAFB1',
  yellow: '#FFE258',
  teal: '#A8F0EC',
  pink: '#FFCAFE',
}

export const WrapperUI = styled('div')`
  display: flex;
  width: 100%;
`
export const CodeViewUI = styled('div')`
  width: 50%;
`

function makeColorStyles() {
  return forEach(tag_colors, (colorName, color) => {
    return `
      &.is-${colorName} span {
        --tagColor: ${color};
      }
    `
  })
}

export const ContainerUI = styled('div')`
  width: 50%;

  &.bordered-tags {
    .DropListItem--groupLabel {
      padding: 0 7px;
    }

    .DropListItem:not(.is-type-inert) {
      padding: 0 7px;
      --tagColor: ${tag_colors.grey};

      ${makeColorStyles()};

      span {
        display: inline-block;
        border: 1px solid var(--tagColor);
        background-color: white;
        color: ${getColor('charcoal.600')};
        border-radius: 3px;
        line-height: 1;
        padding: 6px 8px;
      }

      &.is-selected,
      &.is-highlighted.is-selected {
        color: white;
        background-color: white;

        span {
          color: white;
          border-color: ${getColor('blue.600')};
          background-color: ${getColor('blue.500')};
        }
      }

      &.is-highlighted {
        color: ${getColor('charcoal.800')};
        background-color: white;

        span {
          color: white;
          border-color: ${getColor('blue.600')};
          background-color: ${getColor('blue.500')};
        }
      }
    }
  }
`

export const TagsExample = ({ optimized = true }) => {
  const [storedItems, setStoredItems] = useState([])
  const typedValueRef = useRef('')
  const LIMIT = 50

  function getTags(inputVal) {
    if (optimized) {
      const previousValue = typedValueRef.current

      /**
       * 2) See if we can optimize the search by avoiding fetching more items if we know there are no more
       * a. If we have stored items AND the number of those is less than or equal to the LIMIT
       * b. if we have previous and current values
       * c. => Store the current input value in a ref so we can access it the next time
       * d. => Filter the stored items and resolve the promise
       */
      if (storedItems.length > 0 && storedItems.length <= LIMIT) {
        if (inputVal && previousValue) {
          if (
            previousValue.startsWith(inputVal) ||
            inputVal.startsWith(previousValue)
          ) {
            typedValueRef.current = inputVal

            return Promise.resolve({
              items: storedItems.filter(t => t.label.startsWith(inputVal)),
            })
          }
        }
      }

      /**
       * 3) If we detect a character being deleted for a search we know there are no items, resolve with empty array
       * a. If we have a previous value but NO stored items it means we made a search and returned 0 items
       * b. If the new input value starts with the previous value it means a character was deleted
       * c. => Resolve the promise with the stored items (which is an empty array)
       */
      if (previousValue && !storedItems.length) {
        if (inputVal.startsWith(previousValue)) {
          return Promise.resolve({
            items: storedItems,
          })
        }
      }
    }

    /**
     * 1) Starts here!
     * a. => "Fetch" some tags
     * b. => Store the current input value in a ref so we can access it the next time
     * c. => Also store the items for the same reason
     */
    return new Promise(resolve => {
      const tags = inputVal ? tagsSpec.seed(123).generate(49) : []

      typedValueRef.current = inputVal
      setTimeout(function () {
        const items = tags.filter(t => t.label.startsWith(inputVal))

        setStoredItems(items)
        resolve({ items })
      }, 1000)
    })
  }

  return (
    <WrapperUI>
      <ContainerUI className="bordered-tags">
        <DropList
          variant="combobox"
          clearOnSelect
          inputPlaceholder="Find a tag"
          customEmptyListItems={[
            {
              label: 'No tags found',
              type: 'inert',
              hideOnBlankInputValue: true,
            },
            {
              type: 'divider',
              hideOnBlankInputValue: true,
            },
            {
              label: 'Create tag',
              customizeLabel(inputValue) {
                return `Create ${inputValue} tag`
              },
              type: 'action',
              hideOnBlankInputValue: true,
            },
          ]}
          items={[
            {
              items: tagsSpec
                .seed(23)
                .generate(2)
                .map((i, index) => {
                  if (index === 0) delete i.className
                  return i
                }),
              label: 'Suggested tags',
              type: 'group',
            },
          ]}
          searchFn={getTags}
          toggler={<IconBtn seamless withChevron iconName="tag" />}
        />
      </ContainerUI>
      <CodeViewUI>
        <pre>
          <code>
            Available tags:
            {JSON.stringify(
              tagsSpec
                .seed(123)
                .generate(50)
                .map(t => t.label)
                .sort(),
              null,
              2
            )}
          </code>
        </pre>
      </CodeViewUI>
    </WrapperUI>
  )
}
