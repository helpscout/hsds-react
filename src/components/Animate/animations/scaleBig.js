export default {
  onMount: {
    transform: 'scale(0)'
  },
  onEntering: {
    scale: [0, 1]
  },
  onExiting: {
    scale: [1, 0]
  }
}
