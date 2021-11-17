import 'simplebar/dist/simplebar.min.css'
import styled from 'styled-components'
import React, { useRef } from 'react'
import { getColor } from '../../styles/utilities/color'
import ScrollableContainer from './ScrollableContainer'
import Button from '../Button'
import SimpleBar from 'simplebar-react'

export const ScrollableContainerUI = styled(ScrollableContainer)`
  border-radius: 6px;
  margin: 50px auto;
  background-color: #e5e9ec;
`

export const HeaderUI = styled('header')`
  height: 75px;
  padding: 20px 30px;
  background-color: #fff;

  h1 {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: ${getColor('charcoal.700')};
  }
`

export const BodyUI = styled('div')`
  padding: 10px 30px;
  background-color: #e5e9ec;
`
export const FooterUI = styled('footer')`
  height: 75px;
  padding: 20px 30px;
  background-color: #fff;

  button {
    width: 100%;
  }
`

export const SimpleBarExample = function () {
  return (
    <ScrollableContainerUI
      enableSimpleBarSupport
      header={
        <HeaderUI className="TESTING" data-testprop="This gets passed">
          <h1>Heading</h1>
        </HeaderUI>
      }
      body={
        <SimpleBar
          style={{ maxHeight: 300 }}
          className="TESTING"
          data-testprop="This gets passed"
        >
          <BodyUI>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
            <p>
              Ullamco reprehenderit in irure officia dolore anim eiusmod labore
              duis ea laborum ex. Reprehenderit consequat officia ea id ex
              exercitation et sit et. Velit velit aliqua occaecat quis occaecat.
              Enim incididunt est velit pariatur adipisicing labore dolore anim
              cillum.
            </p>
          </BodyUI>
        </SimpleBar>
      }
      footer={
        <FooterUI>
          <Button kind="primary">Action!</Button>
        </FooterUI>
      }
    />
  )
}
