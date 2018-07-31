export type AnimationSequence = Object | Function

export type AnimationSequences = {
  onEnter: AnimationSequence,
  onEntering: AnimationSequence,
  onEntered: AnimationSequence,
  onExit: AnimationSequence,
  onExiting: AnimationSequence,
  onExited: AnimationSequence,
}
