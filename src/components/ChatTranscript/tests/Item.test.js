import React from 'react'
import { mount, shallow } from 'enzyme'
import {default as Item, ITEM_TYPES} from '../Item'
import {Attachment} from '../../index'

const ui = {
  attachments: '.c-ChatTranscriptItem__attachmentList',
  author: '.c-ChatTranscriptItem__author',
  content: '.c-ChatTranscriptItem__content',
  contentWrapper: '.c-ChatTranscriptItem__contentWrapper',
  createdAt: '.c-ChatTranscriptItem__createdAt',
  header: '.c-ChatTranscriptItem__header',
  privateNote: '.c-ChatTranscriptItem__privateNote'
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.hasClass('c-ChatTranscriptItem')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Item className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
      <Item>
        <div className='child'>Hello</div>
      </Item>
    )
    const o = wrapper.find(ui.content)
    const el = o.find('div.child')

    expect(el.text()).toContain('Hello')
  })

  test('Renders within the contentWrapper', () => {
    const wrapper = shallow(
      <Item>
        <div className='child'>Hello</div>
      </Item>
    )
    const w = wrapper.find(ui.contentWrapper)
    const o = w.find(ui.content)
    const el = o.find('div.child')

    expect(w.length).toBe(1)
    expect(o.length).toBe(1)
    expect(el.text()).toContain('Hello')
  })
})

describe('Body', () => {
  test('Renders body content', () => {
    const wrapper = mount(
      <Item body='Mugatu' />
    )
    const o = wrapper.find(ui.content)

    expect(o.text()).toContain('Mugatu')
  })

  test('Renders body content over children', () => {
    const wrapper = mount(
      <Item body='Mugatu'>
        Zoolander
      </Item>
    )
    const o = wrapper.find(ui.content)

    expect(o.text()).toContain('Mugatu')
  })

  test('Injects HTML from body content', () => {
    const html = '<a href="#">Derek</a>'
    const wrapper = mount(
      <Item body={html} />
    )
    const o = wrapper.find(ui.content)

    expect(o.html()).toContain(html)
  })
})

describe('Author', () => {
  test('Does not render author, if author.name is not provided', () => {
    const props = {
      author: {
        id: 123
      }
    }
    const wrapper = shallow(
      <Item {...props} />
    )
    const o = wrapper.find(ui.author)

    expect(o.length).toBe(0)
  })

  test('Renders author, if author.name is provided', () => {
    const props = {
      author: {
        name: 'Mugatu'
      }
    }
    const wrapper = shallow(
      <Item {...props} />
    )
    const o = wrapper.find(ui.author)

    expect(o.length).toBe(1)
    expect(o.html()).toContain(props.author.name)
  })

  test('Renders within header', () => {
    const props = {
      author: {
        name: 'Mugatu'
      }
    }
    const wrapper = shallow(
      <Item {...props} />
    )
    const h = wrapper.find(ui.header)
    const o = h.find(ui.author)

    expect(h.length).toBe(1)
    expect(o.length).toBe(1)
  })
})

describe('Timestamp', () => {
  test('Does not render timestamp by default', () => {
    const props = {}
    const wrapper = shallow(
      <Item {...props} />
    )
    const o = wrapper.find(ui.createdAt)

    expect(o.length).toBe(0)
  })

  test('Renders createdAt, if provided', () => {
    const props = {
      createdAt: '9:41pm'
    }
    const wrapper = shallow(
      <Item {...props} />
    )
    const o = wrapper.find(ui.createdAt)

    expect(o.length).toBe(1)
    expect(o.html()).toContain(props.createdAt)
  })

  test('Renders within header', () => {
    const props = {
      createdAt: '9:41pm'
    }
    const wrapper = shallow(
      <Item {...props} />
    )
    const h = wrapper.find(ui.header)
    const o = h.find(ui.createdAt)

    expect(h.length).toBe(1)
    expect(o.length).toBe(1)
  })
})

describe('Type', () => {
  describe('LineItem', () => {
    test('Adds associated className', () => {
      const props = {
        type: ITEM_TYPES.lineItem
      }
      const wrapper = shallow(<Item {...props} />)

      expect(wrapper.hasClass('is-line_item')).toBeTruthy()
    })

    test('Renders a LineItem component instead', () => {
      const props = {
        author: {
          name: 'Derek'
        },
        type: ITEM_TYPES.lineItem
      }
      const wrapper = shallow(<Item {...props} />)
      const o = wrapper.find(Item.LineItem)

      expect(o.length).toBe(1)
    })
  })

  describe('Message', () => {
    test('Adds associated className', () => {
      const props = {
        type: ITEM_TYPES.message
      }
      const wrapper = shallow(<Item {...props} />)

      expect(wrapper.hasClass('is-message')).toBeTruthy()
    })

    test('Does render header', () => {
      const props = {
        author: {
          name: 'Derek'
        },
        type: ITEM_TYPES.message
      }
      const wrapper = shallow(<Item {...props} />)
      const h = wrapper.find(ui.header)

      expect(h.length).toBe(1)
    })
  })

  describe('Note', () => {
    test('Adds associated className', () => {
      const props = {
        type: ITEM_TYPES.note
      }
      const wrapper = shallow(<Item {...props} />)

      expect(wrapper.hasClass('is-note')).toBeTruthy()
    })

    test('Does render header', () => {
      const props = {
        author: {
          name: 'Derek'
        },
        type: ITEM_TYPES.note
      }
      const wrapper = shallow(<Item {...props} />)
      const h = wrapper.find(ui.header)

      expect(h.length).toBe(1)
    })

    test('Renders "Private Note" text', () => {
      const props = {
        author: {
          name: 'Derek'
        },
        type: ITEM_TYPES.note
      }
      const wrapper = shallow(<Item {...props} />)
      const o = wrapper.find(ui.privateNote)

      expect(o.length).toBe(1)
    })
  })
})

describe('Attachments', () => {
  test('Does not render by default', () => {
    const props = {
      author: {
        name: 'Derek'
      },
      type: ITEM_TYPES.note
    }
    const wrapper = shallow(<Item {...props} />)
    const o = wrapper.find(ui.attachments)

    expect(o.length).toBe(0)
  })

  test('Renders if attachments are provided', () => {
    const props = {
      attachments: [
        {
          name: 'one.jpg'
        },
        {
          name: 'two.jpg'
        }
      ],
      author: {
        name: 'Derek'
      },
      type: ITEM_TYPES.note
    }
    const wrapper = mount(<Item {...props} />)
    const o = wrapper.find(ui.attachments)
    const a = o.find(Attachment)

    expect(o.length).toBe(1)
    expect(a.length).not.toBeLessThan(2)
  })

  test('Renders "Download All" by default', () => {
    const props = {
      attachments: [
        {
          name: 'one.jpg'
        },
        {
          name: 'two.jpg'
        }
      ],
      author: {
        name: 'Derek'
      },
      type: ITEM_TYPES.note
    }
    const wrapper = mount(<Item {...props} />)
    const o = wrapper.find(ui.attachments)
    const a = o.find(Attachment)

    expect(o.length).toBe(1)
    expect(a.length).toBe(3)
  })

  test('Renders attachments with IDs', () => {
    const props = {
      attachments: [
        {
          id: '001',
          name: 'one.jpg'
        },
        {
          id: '002',
          name: 'two.jpg'
        }
      ],
      author: {
        name: 'Derek'
      },
      type: ITEM_TYPES.note
    }
    const wrapper = mount(<Item {...props} />)
    const o = wrapper.find(ui.attachments)
    const a = o.find(Attachment)

    expect(a.length).toBe(3)
  })

  test('Does not render "Download All", if specified', () => {
    const props = {
      attachments: [
        {
          name: 'one.jpg'
        },
        {
          name: 'two.jpg'
        }
      ],
      author: {
        name: 'Derek'
      },
      showDownloadAllAttachments: false,
      type: ITEM_TYPES.note
    }
    const wrapper = mount(<Item {...props} />)
    const o = wrapper.find(ui.attachments)
    const a = o.find(Attachment)

    expect(o.length).toBe(1)
    expect(a.length).toBe(2)
  })

  test('onAttachmentClick callback works', () => {
    const props = {
      attachments: [
        {
          name: 'one.jpg'
        },
        {
          name: 'two.jpg'
        }
      ],
      author: {
        name: 'Derek'
      },
      onAttachmentClick: jest.fn(),
      type: ITEM_TYPES.note
    }
    const wrapper = mount(<Item {...props} />)
    const o = wrapper.find(Attachment).first()

    o.simulate('click')

    expect(props.onAttachmentClick).toHaveBeenCalled()
  })

  test('onDownloadAllAttachmentClick callback works', () => {
    const props = {
      attachments: [
        {
          name: 'one.jpg'
        },
        {
          name: 'two.jpg'
        }
      ],
      author: {
        name: 'Derek'
      },
      onDownloadAllAttachmentClick: jest.fn(),
      type: ITEM_TYPES.note
    }
    const wrapper = mount(<Item {...props} />)
    const o = wrapper.find(Attachment).last()

    o.simulate('click')

    expect(props.onDownloadAllAttachmentClick).toHaveBeenCalled()
  })
})
