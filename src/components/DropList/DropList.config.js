export function getAnimateProps(userOptions) {
  return {
    duration: 200,
    easing: 'ease-in-out',
    sequence: 'fade down',
    ...userOptions,
    // These shouldn't be overriden
    animateOnMount: true,
    mountOnEnter: false,
    unmountOnExit: false,
  }
}

export function getTippyProps(userOptions) {
  return {
    trigger: 'manual',
    ...userOptions,
    // These shouldn't be overriden
    interactive: true,
  }
}
