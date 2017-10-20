export default {
  onMount: {
    opacity: 0
  },
  onEnter: {
    easing: 'linear',
    opacity: [0, 1]
  },
  onExit: {
    easing: 'linear',
    opacity: [1, 0]
  }
}
