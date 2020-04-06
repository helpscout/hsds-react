import React from 'react'
import { ScopeProvider } from '../../styled'
import { Avatar, Link, Message, PreviewCard } from '../../index'
import { faker } from '@helpscout/helix'

export default {
  component: Message,
  title: 'Components/Conversation/Message (Chat)',
}

export const Default = () => (
  <div>
    <Message from avatar={<Avatar name="Arctic Puffin" />} />
    <Message to>
      <Message.Action read timestamp="9:41am">
        Buddy became upset. <a href="#">Find out what happened</a>
      </Message.Action>
    </Message>
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am">
        :sob:
        <br />
        omgomgomg
        {1}
      </Message.Chat>
      <Message.Chat read timestamp="9:41am" metaPosition="top">
        🚀
      </Message.Chat>
      <Message.Chat read timestamp="9:41am">
        <strong>*Frantically running through North pole*</strong>
      </Message.Chat>
    </Message>

    <Message from>
      <Message.Action read timestamp="9:41am">
        Puffin joined.
      </Message.Action>
    </Message>
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat read timestamp="9:41am" body="🙂" />
      <Message.Chat read timestamp="9:41am" body="Hello World" />
    </Message>
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat read timestamp="9:41am">
        Hey Buddy!
      </Message.Chat>
      <Message.Media
        imageUrl="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
        caption="image.jpg"
        timestamp="9:41am"
        read
      />
    </Message>

    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am">
        <strong>*NOT NOW ARCTIC PUFFIN!*</strong>
      </Message.Chat>
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
          Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner, and
          Bob Newhart...
        </PreviewCard>
        <Message.Chat read timestamp="9:41am" body="🙃" />
      </Message.Content>
      <Message.Chat read timestamp="9:41am">
        Just read that!
      </Message.Chat>
      <Message.Chat read timestamp="9:41am">
        {faker.lorem.paragraphs()()}
      </Message.Chat>
    </Message>

    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat read timestamp="9:41am">
        :sob:
      </Message.Chat>
    </Message>

    <Message to>
      <Message.Action read timestamp="9:41am">
        Buddy left the North Pole.
      </Message.Action>
    </Message>
    <Message to>
      <Message.Action read timestamp="9:41am">
        Buddy came back to the North Pole.
      </Message.Action>
    </Message>
    <Message to>
      <Message.Action read timestamp="9:41am">
        Marked as important.
      </Message.Action>
    </Message>

    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat
        isNote
        read
        timestamp="9:41am"
        body="Note: <em>SAAAAAAANTAAAAAAAA!</em> www.helpscout.com"
      />
      <Message.Chat
        read
        timestamp="9:41am"
        caption="Caption before the bubble"
        metaPosition="top"
      >
        🦄❤️
      </Message.Chat>
    </Message>

    <Message to>
      <Message.Action read timestamp="9:41am">
        Marked as super important.
      </Message.Action>
    </Message>

    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat typing />
    </Message>
  </div>
)

Default.story = {
  name: 'default',
}

export const _Action = () => (
  <Message to>
    <Message.Action read timestamp="9:41am">
      Buddy became upset.{' '}
      <a href="https://www.helpscout.net/">Find out what happened</a>
    </Message.Action>
  </Message>
)

_Action.story = {
  name: 'action',
}

export const _Content = () => (
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
)

_Content.story = {
  name: 'content',
}

export const Note = () => (
  <Message to avatar={<Avatar name="Buddy" />}>
    <Message.Chat isNote read timestamp="9:41am">
      Note: SAAAAAAANTAAAAAAAA!
    </Message.Chat>
  </Message>
)

Note.story = {
  name: 'note',
}

export const Typing = () => (
  <Message from avatar={<Avatar name="Arctic Puffin" />}>
    <Message.Chat typing />
  </Message>
)

Typing.story = {
  name: 'typing',
}
