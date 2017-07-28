import React from 'react'
import { mount } from 'enzyme'
import Input from '../../../components/Input'
import barista from '../helpers/barista'

const styles = barista(`
  @import "src/styles/components/Input/_index";
`)

test('should do a thing', () => {
  const markup = mount(<Input />).html()
  styles.html(markup)

  // const o = styles.$('.c-Input')
  // console.log(o.prop('display'))
})
