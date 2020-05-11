import React from 'react'
import { FluffyCard } from '../index'

export default {
  component: FluffyCard,
  title: 'Components/Structural/FluffyCard',
}

export const Default = () => (
  <FluffyCard href="#">
    Elf is a 2003 American Christmas fantasy comedy film, directed by Jon
    Favreau and written by David Berenbaum.{' '}
  </FluffyCard>
)

Default.story = {
  name: 'default',
}

export const _Container = () => (
  <FluffyCard.Container>
    <FluffyCard href="#">
      Elf is a 2003 American Christmas fantasy comedy film, directed by Jon
      Favreau and written by David Berenbaum.{' '}
    </FluffyCard>
    <FluffyCard href="#">
      Elf is a 2003 American Christmas fantasy comedy film, directed by Jon
      Favreau and written by David Berenbaum. The story is about one of Santa's
      elves (Ferrell) who learns he is actually a human and goes to New York
      City to meet his biological father (Caan), spreading Christmas cheer in a
      world of cynics as he goes.
    </FluffyCard>
  </FluffyCard.Container>
)
