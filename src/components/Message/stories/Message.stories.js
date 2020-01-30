import React from 'react'
import { storiesOf } from '@storybook/react'
import { ScopeProvider } from '../../styled'
import { Avatar, Link, Message, PreviewCard } from '../../index'

const stories = storiesOf('Message', module)

stories.add('question', () => (
  <Message from avatar={<Avatar name="Arctic Puffin" />}>
    <Message.Question read timestamp="9:41am">
      How's it goin'?
    </Message.Question>
  </Message>
))

stories.add('action', () => (
  <Message to>
    <Message.Action read timestamp="9:41am">
      Buddy became upset.{' '}
      <a href="https://www.helpscout.net/">Find out what happened</a>
    </Message.Action>
  </Message>
))

stories.add('content', () => (
  <ScopeProvider scope="#Messages">
    <div id="Messages">
      <Message to avatar={<Avatar name="Buddy" />}>
        <Message.Chat read timestamp="9:41am">
          <Link href="https://en.wikipedia.org/wiki/Elf_(film)">
            https://en.wikipedia.org/wiki/Elf_(film)
          </Link>
        </Message.Chat>
        <Message.Content>
          <PreviewCard
            href="https://en.wikipedia.org/wiki/Elf_(film)"
            title="Wikipedia: Elf (film)"
            target="_blank"
          >
            Elf is a 2003 American Christmas fantasy comedy film directed by Jon
            Favreau and written by David Berenbaum. It stars Will Ferrell, James
            Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner,
            and Bob Newhart...
          </PreviewCard>
        </Message.Content>
        <Message.Chat read timestamp="9:42.am">
          Nam accumsan ex mi, nec ullamcorper lectus pulvinar mollis. In quis
          ligula quis mauris ultrices consectetur in non tortor. Ut ac ligula
          quam. Nulla vel eros nec augue consequat consequat ac non ex. Nam
          ultrices elementum congue. Maecenas id elementum diam. Integer ipsum
          lacus, iaculis id mi eget, ornare gravida mauris. Curabitur
          consectetur pharetra diam. Mauris vel sodales massa. Etiam eget
          eleifend sapien, vel vestibulum metus. Etiam varius mauris ipsum, non
          vestibulum eros imperdiet ac. Maecenas velit urna, varius nec
          vestibulum eu, vehicula id enim. Sed feugiat erat sit amet orci
          tincidunt malesuada eget eget nunc. Mauris quis vestibulum justo.
          Curabitur id commodo nisl.
        </Message.Chat>
      </Message>
      <Message to avatar={<Avatar name="Buddy" />}>
        <Message.Chat read timestamp="9:41am" isNote>
          <Link href="https://en.wikipedia.org/wiki/Elf_(film)">
            https://en.wikipedia.org/wiki/Elf_(film)
          </Link>
        </Message.Chat>
        <Message.Content isNote>
          <PreviewCard
            href="https://en.wikipedia.org/wiki/Elf_(film)"
            title="Wikipedia: Elf (film)"
            target="_blank"
          >
            Elf is a 2003 American Christmas fantasy comedy film directed by Jon
            Favreau and written by David Berenbaum. It stars Will Ferrell, James
            Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner,
            and Bob Newhart...
          </PreviewCard>
        </Message.Content>
        <Message.Chat read timestamp="9:42.am" isNote>
          Nam accumsan ex mi, nec ullamcorper lectus pulvinar mollis. In quis
          ligula quis mauris ultrices consectetur in non tortor. Ut ac ligula
          quam. Nulla vel eros nec augue consequat consequat ac non ex. Nam
          ultrices elementum congue. Maecenas id elementum diam. Integer ipsum
          lacus, iaculis id mi eget, ornare gravida mauris. Curabitur
          consectetur pharetra diam. Mauris vel sodales massa. Etiam eget
          eleifend sapien, vel vestibulum metus. Etiam varius mauris ipsum, non
          vestibulum eros imperdiet ac. Maecenas velit urna, varius nec
          vestibulum eu, vehicula id enim. Sed feugiat erat sit amet orci
          tincidunt malesuada eget eget nunc. Mauris quis vestibulum justo.
          Curabitur id commodo nisl.
        </Message.Chat>
      </Message>
    </div>
  </ScopeProvider>
))

stories.add('note', () => (
  <Message to avatar={<Avatar name="Buddy" />}>
    <Message.Chat isNote read timestamp="9:41am">
      Note: SAAAAAAANTAAAAAAAA!
    </Message.Chat>
  </Message>
))

stories.add('typing', () => (
  <Message from avatar={<Avatar name="Arctic Puffin" />}>
    <Message.Chat typing />
  </Message>
))
