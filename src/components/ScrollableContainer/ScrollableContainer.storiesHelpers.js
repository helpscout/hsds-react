import React, { useLayoutEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import { getColor } from '../../styles/utilities/color'
import ScrollableContainer from './ScrollableContainer'
import Button from '../Button'
import classNames from 'classnames'
import useFancyAnimationScroller from '../../hooks/useFancyAnimationScroller'

export const ScrollableContainerUI = styled(ScrollableContainer)`
  border-radius: 6px;
  margin: 0px auto;
  background-color: #e5e9ec;
`

export const HeaderUI = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  padding: 0 30px;
  background-color: #fff;

  h1 {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: ${getColor('charcoal.700')};
    margin: 0;
    transition: font-size 0.2s cubic-bezier(0.5, 1, 0.89, 1);
  }

  &.small {
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
  width: calc(100% + 2rem);
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

function useConvoLayoutEffect(containerRef) {
  const MIN_BODY_HEIGHT = 280
  const INITIAL_FOOTER_HEIGHT = 200
  const [footerHeight, setFooterHeight] = useState(`${INITIAL_FOOTER_HEIGHT}px`)

  useLayoutEffect(() => {
    calculateFooterHeight(containerRef.current)

    const debounced = debounce(
      () => calculateFooterHeight(containerRef.current),
      50
    )

    window.addEventListener('resize', debounced)

    return () => {
      window.removeEventListener('resize', debounced)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function calculateFooterHeight(containerNode) {
    if (containerNode) {
      const {
        containerHeight,
        rootHeaderHeight,
        rootBodyHeight,
        rootFooterBodyHeight,
        rootFooterFooterHeight,
      } = getHeights(containerNode)

      if (rootBodyHeight >= MIN_BODY_HEIGHT) {
        const spaceAvailable =
          containerHeight - rootHeaderHeight - MIN_BODY_HEIGHT
        const maxSize = rootFooterFooterHeight + rootFooterBodyHeight
        const newFooterHeight =
          spaceAvailable >= maxSize ? maxSize : spaceAvailable

        setFooterHeight(`${newFooterHeight}px`)
      } else {
        setFooterHeight(`${INITIAL_FOOTER_HEIGHT}px`)
      }
    }
  }

  return [footerHeight]
}

function getHeights(containerNode) {
  const rootHeader = containerNode.querySelector(
    ':scope > .ScrollableContainer__header'
  )
  const rootFooter = containerNode.querySelector(
    ':scope > .ScrollableContainer__footer'
  )
  const rootBody = containerNode.querySelector(
    ':scope > .ScrollableContainer__body'
  )
  const rootFooterBody = rootFooter.querySelector('.simplebar-content')
  const rootFooterFooter = rootFooter.querySelector(
    '.ScrollableContainer__footer'
  )

  return {
    containerHeight: containerNode.getBoundingClientRect().height,
    rootHeaderHeight: rootHeader.getBoundingClientRect().height,
    rootBodyHeight: rootBody.getBoundingClientRect().height,
    rootFooterBodyHeight: rootFooterBody.getBoundingClientRect().height,
    rootFooterFooterHeight: rootFooterFooter.getBoundingClientRect().height,
  }
}

export const SimpleBarExample = function () {
  const containerRef = useRef(null)
  const [footerHeight] = useConvoLayoutEffect(containerRef)
  const [handleScroll] = useFancyAnimationScroller({
    container: containerRef,
    selectors: {
      scrollable: '.simplebar-content-wrapper',
      target: '.top-header',
    },
    classNames: {
      scrollTopReached: 'small',
    },
    targets: {
      from: 75,
      to: 40,
    },
  })
  return (
    <BGUI>
      <ScrollableContainerUI
        ref={containerRef}
        withSimpleBar
        width="70%"
        height="100vh"
        shadows={{ initial: 'none' }}
        onScroll={handleScroll}
        withResizeObservers={{
          header: true,
          footer: true,
        }}
        header={
          <HeaderUI
            className={classNames('top-header')}
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
          </BodyUI>
        }
        footer={
          <ScrollableContainer
            className="top-footer"
            shadows={{ initial: 'none' }}
            width="100%"
            height={footerHeight}
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
                <Button theme="blue">Action!</Button>
              </FooterUI>
            }
          />
        }
      />
    </BGUI>
  )
}
