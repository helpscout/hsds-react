export default {
  onMount: {
    height: 0,
    overflow: 'hidden'
  },
  onEntering: (node) => {
    const el = node.childNodes[0]
    return {
      height: [0, el.offsetHeight]
    }
  },
  onExit: (node) => {
    const el = node.childNodes[0]
    return {
      height: [el.offsetHeight, 0]
    }
  }
}
