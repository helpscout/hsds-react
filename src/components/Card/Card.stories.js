import React from 'react'
import { Card, Heading } from '../index'

export default {
  title: 'Components/Structural/Card',
  component: Card,
}

export const Default = () => <Card>Hello</Card>

Default.story = {
  name: 'default',
}

export const Link = () => (
  <Card href="https://www.helpscout.net/">
    Link to: https://www.helpscout.net/
  </Card>
)

Link.story = {
  name: 'link',
}

export const _Block = () => (
  <Card seamless>
    <Card.Block>Block One</Card.Block>
    <Card.Block>Block Two</Card.Block>
    <Card.Block>Block Three</Card.Block>
  </Card>
)

_Block.story = {
  name: 'block',
}

export const Scrollable = () => (
  <Card seamless flex style={{ height: '100vh' }}>
    <Card.Block>
      <Heading>Elf: Synopsis</Heading>
    </Card.Block>
    <Card.Block bgMuted scrollable flex>
      <p>
        On Christmas Eve in 1973, an infant boy stows away in Santa Claus' sack.
        When discovered back at the North Pole, he is adopted by Papa Elf. Papa
        Elf names his son Buddy.
      </p>

      <p>
        Buddy grows up at the North Pole believing he is an elf, but due to his
        human size he is unable to perform elf tasks. When Buddy accidentally
        learns that he is human, Papa Elf explains that he was born to Walter
        Hobbs and Susan Wells, and was given up for adoption without Walter
        knowing. Susan died and Walter works at a children's book publisher in
        New York City at the Empire State Building. Santa notes that Walter is
        on the naughty list due to his greed and selfishness, but suggests Buddy
        could help redeem him, and so Buddy travels alone to New York.
      </p>

      <p>
        Buddy has trouble acclimating to the customs of the human world. Buddy
        finds his father's office, but Walter has him ejected after Buddy
        mentions Susan Wells. After following a security guard's sarcastic
        suggestion to go "back to Gimbels" due to his elf outfit, the Gimbels'
        manager mistakes him for an employee at Santa Land. He meets Jovie, an
        unenthused employee to whom he is attracted. Knowing that Santa will
        arrive the next day, Buddy stays behind and spends the night decorating
        Santa Land, and buys a nightie for Walter.
      </p>

      <p>
        The next day, Buddy is appalled that the store's Santa is not real and
        rips off the man's fake beard, causing them to fight, with the manager
        having to subdue the fake Santa. Walter bails Buddy out of prison and
        takes him to Dr. Leonardo for a DNA test, which confirms that Buddy is
        Walter's son. The doctor convinces him to take Buddy home to meet his
        step-mother Emily and 11-year-old half-brother Michael. Walter and
        Michael are annoyed by Buddy's childlike behavior, but Emily insists
        that they take care of him until he "recovers".
      </p>

      <p>
        Buddy wins Michael over by helping him defeat a gang of bullies in a
        snowball fight and Michael encourages Buddy to ask Jovie out. Walter
        learns from his boss Fulton Greenway that his company is in financial
        trouble after publishing a failed children's book, and organizes a book
        pitch for Christmas Eve, for which Walter and his associates Eugene and
        Morris arrange a meeting with best-selling children's author Miles Finch
        to hire him.
      </p>

      <p>
        One night, Buddy goes on a date with Jovie and wins her over. On
        Christmas Eve, Buddy bursts into Walter's office during a meeting with
        Finch to tell Walter about his love, and mistakes Finch, who has
        dwarfism for an elf. Finch loses his temper and attacks Buddy before
        storming out, causing Walter to harshly disown Buddy.
      </p>

      <p>
        Eugene and Morris find a notebook Finch left that is filled with ideas
        for children's books. Walter pitches these ideas to Greenway, but
        Michael bursts in to tell Walter that Buddy ran away. Greenway refuses
        to reschedule; Walter quits his job and leaves to find Buddy.
      </p>
    </Card.Block>
    <Card.Block>Block Three</Card.Block>
  </Card>
)

Scrollable.story = {
  name: 'scrollable',
}
