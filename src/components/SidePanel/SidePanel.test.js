import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import SidePanel from './'

jest.useFakeTimers()

describe('Show / no show', () => {
  test('should be shown or hidden using show prop using useAnimatedRender under the hood', () => {
    const { queryByTestId, rerender } = render(<SidePanel />)

    expect(queryByTestId('sidepanel-overlay')).not.toBeInTheDocument()

    rerender(<SidePanel show />)
    fireEvent.animationEnd(queryByTestId('sidepanel-overlay'))

    expect(queryByTestId('sidepanel-overlay')).toBeInTheDocument()
    expect(
      queryByTestId('sidepanel-overlay').classList.contains('element-in')
    ).toBe(true)
    expect(
      queryByTestId('sidepanel-overlay').querySelector('.SidePanel')
    ).toBeInTheDocument()
    expect(document.activeElement).toBe(
      queryByTestId('sidepanel-overlay').querySelector('.SidePanel')
    )

    rerender(<SidePanel show={false} />)
    fireEvent.animationEnd(queryByTestId('sidepanel-overlay'))

    expect(queryByTestId('sidepanel-overlay')).not.toBeInTheDocument()
  })
})

describe('Contents', () => {
  test('SideBar', () => {
    const { container } = render(<SidePanel show />)

    const sidePanel = container.querySelector('.SidePanel')
    expect(sidePanel).toBeInTheDocument()
    expect(sidePanel.tagName).toBe('ASIDE')
  })

  test('Body', () => {
    const { container } = render(
      <SidePanel show>
        <div className="something"></div>
      </SidePanel>
    )

    const body = container.querySelector('.SidePanel__Content')

    expect(body).toBeInTheDocument()
    expect(body.querySelector('div.something')).toBeInTheDocument()
  })
})

describe('Overlay', () => {
  test('should be able to render without overlay', () => {
    const { container, queryByTestId } = render(
      <SidePanel show withOverlay={false} />
    )
    const overlayStyles = window.getComputedStyle(
      queryByTestId('sidepanel-overlay')
    )
    const sidePanelStyles = window.getComputedStyle(
      container.querySelector('.SidePanel')
    )

    expect(
      queryByTestId('sidepanel-overlay').classList.contains('no-overlay')
    ).toBe(true)
    expect(overlayStyles.getPropertyValue('pointer-events')).toBe('none')
    expect(overlayStyles.getPropertyValue('background-color')).toBe(
      'transparent'
    )
    expect(sidePanelStyles.getPropertyValue('pointer-events')).toBe('all')
  })

  test('should set z-index on overlay', () => {
    const { queryByTestId } = render(<SidePanel show zIndex={500} />)
    const styles = window.getComputedStyle(queryByTestId('sidepanel-overlay'))

    expect(styles.getPropertyValue('z-index')).toBe('500')
  })

  test('should set the side of the panel', () => {
    const { queryByTestId, rerender } = render(<SidePanel show />)
    const overlay = queryByTestId('sidepanel-overlay')
    let styles = window.getComputedStyle(overlay)

    expect(overlay.classList.contains('right')).toBe(true)
    expect(styles.getPropertyValue('flex-direction')).toBe('row-reverse')

    rerender(<SidePanel side="left" />)
    styles = window.getComputedStyle(overlay)

    expect(overlay.classList.contains('left')).toBe(true)
    expect(styles.getPropertyValue('flex-direction')).toBe('row')
  })
})

describe('Closing', () => {
  test('should render close button', () => {
    const { container } = render(<SidePanel show />)
    const button = container.querySelector('.SidePanel__CloseButton')

    expect(button).toBeInTheDocument()
  })

  test('should call onClose on close button click', () => {
    const spy = jest.fn()
    const { container } = render(<SidePanel show onClose={spy} />)

    const button = container.querySelector('.SidePanel__CloseButton')

    user.click(button)

    expect(spy).toHaveBeenCalled()
  })

  test('should call onClose on escape', () => {
    const spy = jest.fn()
    const { container } = render(<SidePanel show onClose={spy} />)
    const sidePanel = container.querySelector('.SidePanel')

    user.type(sidePanel, '{esc}')

    expect(spy).toHaveBeenCalled()
  })
})
