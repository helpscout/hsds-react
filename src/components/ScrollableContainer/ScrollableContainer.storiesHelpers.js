import React, { useState } from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import ScrollableContainer from './ScrollableContainer'
import Button from '../Button'
import classNames from 'classnames'

export const ScrollableContainerUI = styled(ScrollableContainer)`
  border-radius: 6px;
  margin: 0px auto;
  background-color: #e5e9ec;
`

export const HeaderUI = styled('header')`
  display: flex;
  align-items: center;
  height: 75px;
  padding: 0 30px;
  background-color: #fff;
  transition: height 0.2s ease-in-out;

  h1 {
    transition: font-size 0.3s ease-in-out;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: ${getColor('charcoal.700')};
    margin: 0;
  }

  &.small {
    height: 40px;

    h1 {
      font-size: 16px;
    }
  }
`

export const BodyUI = styled('div')`
  padding: 10px 30px;
  background-color: #e5e9ec;
`

export const FooterUI = styled('footer')`
  min-height: 75px;
  padding: 20px 30px;
  background-color: #fff;

  button {
    width: 100%;
  }
`

const BGUI = styled('div')`
  width: 100%;
  margin: -1rem;
  background-color: #e5e5f7;
  background-size: 10px 10px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
`

const InputUI = styled('input')`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  padding: 5px 3px;
`
export const SimpleBarExample = function () {
  const [isTopScrolled, setIsTopScrolled] = useState(null)

  return (
    <BGUI>
      <ScrollableContainerUI
        id="main"
        withSimpleBar
        width="70%"
        height="100vh"
        shadows={{ initial: 'none' }}
        onScrollableSectionsStateChange={({ isTopScrolled }) => {
          setIsTopScrolled(isTopScrolled)
        }}
        header={
          <HeaderUI
            className={classNames(isTopScrolled && 'small')}
            data-testprop="This gets passed"
          >
            <h1>Heading</h1>
          </HeaderUI>
        }
        body={
          <BodyUI className="TESTING" data-testprop="This gets passed">
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
        }
        footer={
          <ScrollableContainer
            shadows={{ initial: 'none' }}
            width="100%"
            height="200px"
            withSimpleBar
            body={
              <BodyUI style={{ background: 'white' }}>
                <InputUI
                  type="text"
                  name="hello"
                  id="hello"
                  placeholder="first input..."
                  style={{ marginTop: '20px' }}
                />
                <br />
                <InputUI
                  type="text"
                  name="hello"
                  id="hello2"
                  placeholder="another input here..."
                />
                <br />
                <InputUI
                  type="text"
                  name="hello"
                  id="hello3"
                  placeholder="another input here..."
                />
                <br />
                <InputUI
                  type="text"
                  name="hello"
                  id="hello4"
                  placeholder="last input..."
                />
                <br />
              </BodyUI>
            }
            footer={
              <FooterUI>
                <Button kind="primary">Action!</Button>
              </FooterUI>
            }
          />
        }
      />
    </BGUI>
  )
}
