import React from 'react'
import { mount, render } from 'enzyme'
import MessageCard from './MessageCard'
import {
  TitleUI,
  SubtitleUI,
  BodyUI,
  ActionUI,
  ImageUI,
} from './MessageCard.css'
import { MessageCardButton as Button } from './MessageCard.Button'
import { act } from 'react-dom/test-utils'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<MessageCard />)
    const el = wrapper.find('.c-MessageCard')

    expect(el.length).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<MessageCard className={customClassName} />)
    const el = wrapper.find('.c-MessageCard')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Mobile', () => {
  test('Should not have mobile styles by default', () => {
    const wrapper = mount(<MessageCard />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-mobile')).toBeFalsy()
  })

  test('Should have mobile styles if specified', () => {
    const wrapper = mount(<MessageCard isMobile />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-mobile')).toBeTruthy()
  })
})

describe('Align', () => {
  test('Has default alignment of right', () => {
    const wrapper = mount(<MessageCard />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-align-right')).toBeTruthy()
  })

  test('Can change alignment styles, if specified', () => {
    const wrapper = mount(<MessageCard align="left" />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-align-left')).toBeTruthy()
  })
})

describe('Visibility', () => {
  jest.useFakeTimers()

  test('Should be visible by default if there is no image', () => {
    const onShowSpy = jest.fn()
    const wrapper = mount(<MessageCard onShow={onShowSpy} />)

    expect(cardWrapperVisible(wrapper)).toEqual(false)
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
      wrapper.update()
    })

    expect(cardWrapperVisible(wrapper)).toEqual(true)
    expect(onShowSpy).toHaveBeenCalled()
  })

  test('Should not be visible by default if there is an image, but become visible when image loads', () => {
    const onShowSpy = jest.fn()
    const wrapper = mount(
      <MessageCard
        image={{ url: 'https://path.to/image.png' }}
        onShow={onShowSpy}
      />
    )

    expect(cardWrapperVisible(wrapper)).toEqual(false)
    expect(onShowSpy).not.toHaveBeenCalled()

    jest.runAllTimers()
    wrapper.update()

    expect(cardWrapperVisible(wrapper)).toEqual(false)
    expect(onShowSpy).not.toHaveBeenCalled()

    wrapper.find('img').simulate('load')

    act(() => {
      jest.runAllTimers()
      wrapper.update()
    })

    expect(wrapper.find('img')).toHaveLength(1)
    expect(cardWrapperVisible(wrapper)).toEqual(true)
    expect(onShowSpy).toHaveBeenCalled()
  })

  test('Should become visible without image if image fails to load', () => {
    const onShowSpy = jest.fn()
    const wrapper = mount(
      <MessageCard
        image={{ url: 'https://path.to/image.png' }}
        onShow={onShowSpy}
      />
    )

    expect(cardWrapperVisible(wrapper)).toEqual(false)
    expect(onShowSpy).not.toHaveBeenCalled()

    jest.runAllTimers()
    wrapper.update()

    expect(cardWrapperVisible(wrapper)).toEqual(false)
    expect(onShowSpy).not.toHaveBeenCalled()

    wrapper.find('img').simulate('error')

    act(() => {
      jest.runAllTimers()
      wrapper.update()
    })

    expect(wrapper.find('img')).toHaveLength(0)
    expect(cardWrapperVisible(wrapper)).toEqual(true)
    expect(onShowSpy).toHaveBeenCalled()
  })

  function cardWrapperVisible(wrapper) {
    return wrapper.find('.c-MessageCardWrapper').at(0).prop('visible')
  }
})

describe('Animation', () => {
  test('Should have no animation by default', () => {
    const wrapper = mount(<MessageCard />)

    expect(cardWrapperAnimation(wrapper)).toEqual(false)
  })

  test('Should have animation if withAnimation is true', () => {
    const wrapper = mount(<MessageCard withAnimation />)

    expect(cardWrapperAnimation(wrapper)).toEqual(true)
  })

  function cardWrapperAnimation(wrapper) {
    return wrapper.find('.c-MessageCardWrapper').at(0).prop('withAnimation')
  }
})

describe('Body', () => {
  test('Does not render body if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(BodyUI)

    expect(o.length).toBe(0)
  })

  test('Renders body if it is passed down as a prop', () => {
    const wrapper = mount(<MessageCard body="Santa!" />)
    const o = wrapper.find(BodyUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })

  test('Renders html in body', () => {
    const wrapper = mount(<MessageCard body="<span>Santa!</span>" />)
    const o = wrapper.find(BodyUI)

    expect(o.render().find('span').length).toBe(1)
  })

  test('Renders new line without html in body', () => {
    const body = 'this is a new line\nwith another line'
    const wrapper = mount(<MessageCard body={body} />)
    const o = wrapper.find(BodyUI)

    expect(o.render().find('br').length).toBe(1)
  })

  test('Accepts a custom onBodyClick callback', () => {
    const body = 'some text with a <a href="#">link</a> in it'
    const callback = jest.fn()
    const wrapper = mount(<MessageCard body={body} onBodyClick={callback} />)

    wrapper.simulate('click')
    expect(callback).not.toHaveBeenCalled()

    wrapper.find(BodyUI).simulate('click')
    expect(callback).toHaveBeenCalled()
  })
})

describe('Title', () => {
  test('Does not render title if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(TitleUI)

    expect(o.length).toBe(0)
  })

  test('Renders title if it is passed down as a prop', () => {
    const wrapper = mount(<MessageCard title="Santa!" />)
    const o = wrapper.find(TitleUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('Subtitle', () => {
  test('Does not render subtitle if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(SubtitleUI)

    expect(o.length).toBe(0)
  })

  test('Renders subtitle if it is passed down as a prop', () => {
    const wrapper = mount(<MessageCard subtitle="Santa!" />)
    const o = wrapper.find(SubtitleUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('image', () => {
  test('Does not render image if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const image = wrapper.find('img')

    expect(image).toHaveLength(0)
  })

  test('Renders image if it is passed down as a prop', () => {
    const wrapper = mount(
      <MessageCard image={{ url: 'https://path.to/image.png' }} />
    )
    const image = wrapper.find('img')

    expect(image).toHaveLength(1)
    expect(image.prop('src')).toEqual('https://path.to/image.png')
  })

  test('Sets size of image when provided', () => {
    const wrapper = mount(
      <MessageCard
        image={{
          url: 'https://path.to/image.png',
          width: '100',
          height: '200',
        }}
      />
    )
    const image = wrapper.find(ImageUI)

    expect(image.prop('width')).toEqual('100px')
    expect(image.prop('height')).toEqual('200px')
  })

  test('Scales size of image when larger than fits and width is bigger', () => {
    const wrapper = mount(
      <MessageCard
        image={{
          url: 'https://path.to/image.png',
          width: '800',
          height: '300',
        }}
      />
    )
    const image = wrapper.find(ImageUI)

    expect(image.prop('height')).toEqual('96.75px')
    expect(image.prop('width')).toEqual('258px')
  })

  test('Scales size of image when larger than fits and height is bigger', () => {
    const wrapper = mount(
      <MessageCard
        image={{
          url: 'https://path.to/image.png',
          width: '300',
          height: '800',
        }}
      />
    )
    const image = wrapper.find(ImageUI)

    expect(image.prop('height')).toEqual('258px')
    expect(image.prop('width')).toEqual('96.75px')
  })

  test('Sets default size of image when not provided', () => {
    const wrapper = mount(
      <MessageCard image={{ url: 'https://path.to/image.png' }} />
    )
    const image = wrapper.find(ImageUI)

    expect(image.prop('width')).toEqual('100%')
    expect(image.prop('height')).toEqual('auto')
  })

  test('Sets provided alt text', () => {
    const wrapper = mount(
      <MessageCard
        image={{ url: 'https://path.to/image.png', altText: 'Alt text' }}
      />
    )
    const image = wrapper.find('img')

    expect(image.prop('alt')).toEqual('Alt text')
  })

  test('Sets default alt text', () => {
    const wrapper = mount(
      <MessageCard image={{ url: 'https://path.to/image.png' }} />
    )
    const image = wrapper.find('img')

    expect(image.prop('alt')).toEqual('Message image')
  })
})

describe('Action', () => {
  test('Does not render action if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(ActionUI)

    expect(o.length).toBe(0)
  })

  test('Renders action if it is passed down as a prop', () => {
    const action = () => <div>Click here</div>
    const wrapper = mount(<MessageCard action={action} />)
    const o = wrapper.find(ActionUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Click here')
  })

  test('Should remove the box shadow', () => {
    const wrapper = mount(<MessageCard isWithBoxShadow={false} />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-with-box-shadow')).toBeFalsy()
  })
})

describe('Message Button Children', () => {
  test('Can render children', () => {
    const children = 'Hello world'
    const wrapper = mount(<Button>{children}</Button>)

    expect(wrapper.html()).toContain(children)
  })
})

describe('Message Button onClick', () => {
  test('Can accept custom onClick callback', () => {
    const callback = jest.fn()
    const wrapper = mount(<Button onClick={callback}>Click Me</Button>)
    wrapper.simulate('click')

    expect(callback).toHaveBeenCalled()
  })
})
