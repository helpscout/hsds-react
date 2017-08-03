import React from 'react'
import { mount } from 'enzyme'
import Portal from '..'

test('Renders at the body on mount', () => {
  const preMountNodeCount = document.body.childNodes.length
  const wrapper = mount(
    <Portal>
      <div className='brick'>BRICK</div>
    </Portal>
  )
  const portal = document.body.childNodes[0]
  const el = portal.getElementsByClassName('brick')[0]

  expect(document.body.childNodes.length).toBe(preMountNodeCount + 1)
  expect(el).toBeTruthy()
  expect(el.innerHTML).toBe('BRICK')

  wrapper.unmount()
})

test('Is removed from the body on unmount', (done) => {
  const wrapper = mount(
    <Portal>
      <div className='brick'>BRICK</div>
    </Portal>
  )

  wrapper.unmount()

  setTimeout(() => {
    expect(document.getElementsByClassName('brick').length).toBe(0)
    done()
  }, 10)
})

test('Can add custom className', () => {
  const wrapper = mount(
    <Portal className='champ'>
      <div className='brick'>BRICK</div>
    </Portal>
  )

  expect(document.getElementsByClassName('champ').length).toBe(1)

  wrapper.unmount()
})

test('Can add custom ID', () => {
  const wrapper = mount(
    <Portal id='champ'>
      <div className='brick'>BRICK</div>
    </Portal>
  )

  expect(document.getElementById('champ')).toBeTruthy()

  wrapper.unmount()
})
