import styled from 'styled-components'

export const DragHandleUI = styled.div`
  cursor: row-resize;

  /* Bug fix for Firefox
   https://github.com/clauderic/react-sortable-hoc/issues/321 */
  @-moz-document url-prefix() {
    display: inline-block;
    z-index: 3;
  }
`
