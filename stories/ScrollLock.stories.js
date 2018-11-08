import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flexy, Image, Scrollable } from '../src/index.js'

const stories = storiesOf('ScrollLock', module)

stories.add('default', () => (
  <div>
    <p>
      ScrollLock prevents you from scrolling past the start or end of a
      scrollable container, so that you don't accidentally scroll the parent
      element (or the entire document). It's enabled by default in Scrollable
      and can be added to any other scrollable container too.
    </p>
    <Flexy gap="sm">
      <Flexy.Block>
        <Scrollable style={{ height: '300px' }} isScrollLocked={false}>
          <h3>Not locked</h3>
          <Image
            src="https://i.imgur.com/rxVPIlf.jpg"
            alt="Buddy!"
            title="Buddy!"
          />
        </Scrollable>
      </Flexy.Block>
      <Flexy.Block>
        <Scrollable style={{ height: '300px' }}>
          <h3>Locked up</h3>
          <Image
            src="https://i.imgur.com/rxVPIlf.jpg"
            alt="Buddy!"
            title="Buddy!"
          />
        </Scrollable>
      </Flexy.Block>
    </Flexy>
    <p>
      <b>Buddy:</b> Who the heck are you?
    </p>
    <p>
      <b>Gimbel's Santa:</b> What are you talkin' about? I'm Santa Claus.
    </p>
    <p>
      <b>Buddy:</b> No, you're not.
    </p>
    <p>
      <b>Gimbel's Santa:</b> Uh, why of course I am! Ho, ho, ho, ho, ho.
    </p>
    <p>
      <b>Buddy:</b> Well, if you're Santa, what song did I sing for you on your
      birthday this year?
    </p>
    <p>
      <b>Gimbel's Santa:</b> Um, Happy Birthday of course. Ho, ho, ho, ho, ho,
      ho. How old are you son?
    </p>
    <p>
      <b>Kid with Santa:</b> Four.
    </p>
    <p>
      <b>Gimbel's Santa:</b> You're a big boy. What's your name?
    </p>
    <p>
      <b>Kid with Santa:</b> Paul.
    </p>
    <p>
      <b>Gimbel's Santa:</b> Now what can I get you for Christmas?
    </p>
    <p>
      <b>Buddy:</b> Don't tell him what you want, he's a liar.
    </p>
    <p>
      <b>Gimbel's Santa:</b> Let the kid talk.
    </p>
    <p>
      <b>Buddy:</b> You disgust me! How can you live with yourself?
    </p>
    <p>
      <b>Gimbel's Santa:</b> Just cool it, Zippy.
    </p>
    <p>
      <b>Buddy:</b> You sit on a throne of lies.
    </p>
    <p>
      <b>Gimbel's Santa:</b> Look, I'm not kiddin'.
    </p>
    <p>
      <b>Buddy:</b> You're a fake.
    </p>
    <p>
      <b>Gimbel's Santa:</b> I'm a fake?
    </p>
    <p>
      <b>Buddy:</b> Yes!
    </p>
    <p>
      <b>Gimbel's Santa:</b> How'd you like to be dead, huh? Ho, ho, just
      kidding.
    </p>
    <p>
      <b>Buddy:</b> You stink.
    </p>
    <p>
      <b>Gimbel's Santa:</b> I think you're gonna have a good Christmas, all
      right.
    </p>
    <p>
      <b>Buddy:</b> You smell like beef and cheese, you don't smell like Santa.
    </p>
  </div>
))
