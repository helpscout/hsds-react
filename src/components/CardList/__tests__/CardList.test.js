import * as React from 'react'
import { mount } from 'enzyme'
import Animate from '../../Animate'
import ArticleCard from '../../ArticleCard'
import Card from '../../Card'
import { CardList } from '../CardList'
import { AnimateGroup } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<CardList />)
    const el = wrapper.find('div.c-CardList')

    expect(el.hasClass('c-CardList')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<CardList className="list-of-cards" />)
    const el = wrapper.find('div.c-CardList')

    expect(el.prop('className')).toContain('list-of-cards')
  })
})

describe('Animation', () => {
  test('Wraps Card children in an Animate, within an AnimateGroup', () => {
    const wrapper = mount(
      <CardList>
        <Card>One</Card>
      </CardList>
    )
    const animateGroup = wrapper.find(AnimateGroup)
    const animate = animateGroup.find(Animate)
    const card = animate.find(Card)

    expect(animateGroup.length).toBe(1)
    expect(animate.length).toBe(1)
    expect(card.length).toBe(1)
  })

  test('Rejects non-Card components', () => {
    const wrapper = mount(
      <CardList>
        <Card className="the-card">One</Card>
        <div className="buddy">Two</div>
        <ArticleCard className="the-articleCard">Three</ArticleCard>
      </CardList>
    )
    const animateGroup = wrapper.find(AnimateGroup)

    expect(animateGroup.find('div.the-card').length).toBe(1)
    expect(animateGroup.find('div.buddy').length).toBe(0)
    expect(animateGroup.find('div.the-articleCard').length).toBe(1)
  })

  test('Wraps AnimateCard children in an Animate, within an AnimateGroup', () => {
    const wrapper = mount(
      <CardList>
        <ArticleCard title="Hello one" content="One" />
      </CardList>
    )
    const animateGroup = wrapper.find(AnimateGroup)
    const animate = animateGroup.find(Animate)
    const card = animate.find(ArticleCard)

    expect(animateGroup.length).toBe(1)
    expect(animate.length).toBe(1)
    expect(card.length).toBe(1)
  })

  test('Passes staggering props to AnimateGroup', () => {
    const wrapper = mount(
      <CardList>
        <Card>One</Card>
      </CardList>
    )
    const props = wrapper.find(AnimateGroup).props()

    expect(props.stagger).toBe(true)
    expect(props.staggerDelay).not.toBe(null)
  })

  test('Can set custom AnimateGroup props', () => {
    const wrapper = mount(
      <CardList animationStagger={1000}>
        <Card>One</Card>
      </CardList>
    )
    const props = wrapper.find(AnimateGroup).props()

    expect(props.staggerDelay).toBe(1000)
  })

  test('Can set custom Animate delay', () => {
    const delay = 500
    const stagger = 60
    const wrapper = mount(
      <CardList animationStagger={stagger} animationDelay={delay}>
        <Card>One</Card>
      </CardList>
    )
    const props = wrapper
      .find('Animate')
      .last()
      .props()

    expect(props.delay).toBe(delay + stagger)
  })

  test('Can set custom Animate easing', () => {
    const wrapper = mount(
      <CardList animationEasing="ease">
        <Card>One</Card>
      </CardList>
    )
    const props = wrapper
      .find('Animate')
      .last()
      .props()

    expect(props.easing).toBe('ease')
  })

  test('Can set custom Animate sequences', () => {
    const wrapper = mount(
      <CardList animationSequence="fade down">
        <Card>One</Card>
      </CardList>
    )
    const props = wrapper
      .find('Animate')
      .last()
      .props()

    expect(props.sequence).toBe('fade down')
  })
})
