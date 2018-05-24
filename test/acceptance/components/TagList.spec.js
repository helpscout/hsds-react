import React from 'react'
import { Tag, TagList } from '../../../src/index'
import TagSpec from '../../../stories/Tag/specs/Tag'
import wait from '../../../src/tests/helpers/wait'

describe('TagList', () => {
  it('should not expand beyond a certain size when containing a lot of tags', done => {
    const tagMarkup = TagSpec.generate(3).map(tag => (
      <Tag key={tag.id} value={tag.value} />
    ))
    mount(
      <div>
        <TagList className="control" />
        <TagList className="test" style={{ width: 200 }}>
          {tagMarkup}
        </TagList>
      </div>
    )
    const control = $('.control')
    const test = $('.test')

    wait(100).then(() => {
      expect(test.height()).toBeGreaterThan(control.height())
      expect(test.height()).toBeLessThan(80)
      done()
    })
  })

  it('should force a single line of tags, if overflowFade is enabled', done => {
    const tagMarkup = TagSpec.generate(80).map(tag => (
      <Tag key={tag.id} value={tag.value} />
    ))
    mount(
      <div>
        <TagList className="control">
          <Tag value="Tag" />
        </TagList>
        <TagList className="test" style={{ width: 200 }} overflowFade>
          {tagMarkup}
        </TagList>
      </div>
    )
    const control = $('.control')
    const test = $('.test')

    wait(400).then(() => {
      expect(control.height()).toBe(test.height())
      done()
    })
  })
})
