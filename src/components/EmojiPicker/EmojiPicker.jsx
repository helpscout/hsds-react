import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import DropList from '../DropList'
import Emoji from '../Emoji'
import { IconToggler } from './EmojiPicker.Toggler'
import { EmojiPickerUI, EmojiItemUI } from './EmojiPicker.css'
import { emojiSet } from './emojiSet'

export function EmojiPicker({
  animateOptions = { sequence: 'fade up', duration: 150 },
  className = '',
  'data-cy': dataCy = 'EmojiPicker',
  emojiSize = 'md',
  items = emojiSet,
  onTogglerClick = noop,
  tippyOptions = { placement: 'top-start' },
  toggler = <IconToggler onClick={onTogglerClick} />,
  ...rest
}) {
  return (
    <EmojiPickerUI
      className={classNames('c-EmojiPicker', className)}
      data-cy={dataCy}
      emojiSize={emojiSize}
    >
      <DropList
        animateOptions={animateOptions}
        enableLeftRightNavigation
        items={items}
        tippyOptions={tippyOptions}
        toggler={toggler}
        {...rest}
        renderCustomListItem={({ item }) => {
          return (
            <EmojiItemUI className="c-EmojiPickerItem">
              <Emoji name={item.name} symbol={item.symbol} />
            </EmojiItemUI>
          )
        }}
      />
    </EmojiPickerUI>
  )
}

const itemShape = PropTypes.shape({
  colons: PropTypes.arrayOf(PropTypes.string),
  hoverBackgroundColor: PropTypes.string,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  unified: PropTypes.string,
  value: PropTypes.string.isRequired,
})

EmojiPicker.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** The size of the emoji. */
  emojiSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** An array of emoji objects. */
  items: PropTypes.arrayOf(itemShape),
  /** Callback that fires when the default toggler is clicked */
  onTogglerClick: PropTypes.func,
}

export default EmojiPicker
