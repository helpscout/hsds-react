import { isArray, isString } from './is'

export type Sequence = string
export type SequenceNames = Array<Sequence>
export type AnimationSequence = SequenceNames | Sequence

export const getSequenceNames = (
  sequence: AnimationSequence
): SequenceNames => {
  let names = <SequenceNames>[]

  if (isArray(sequence)) {
    names = <SequenceNames>sequence
  }

  if (isString(sequence)) {
    names = (<Sequence>sequence)
      .trim()
      .split(' ')
      .filter(n => n !== '')
  }

  return names
}
