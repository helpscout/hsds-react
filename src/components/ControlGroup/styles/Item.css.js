import styled from 'styled-components'

export const config = {
  borderRadius: 3,
  borderWidth: 1,
}

export const ItemUI = styled('div')`
  margin-top: 0;
  min-width: 0;
  position: relative;
  width: auto;

  & + *:not(:first-child) {
    margin-left: -${config.borderWidth}px;

    .c-Button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  & + *:not(:last-child) {
    .c-Button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &:first-child {
    .c-Button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &.is-block {
    flex: 1;
    max-width: 100%;
  }
`

export default ItemUI
