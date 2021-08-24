export const CLASSNAMES = {
  hidden: 'hidden',
}

/* istanbul ignore next */
export function selectAll(digitInputNodes, digitMaskNodes) {
  let selection = window.getSelection()

  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }
  let lastIndex = 0
  digitInputNodes.forEach((digitInputNode, index) => {
    digitInputNode.classList.add(CLASSNAMES.hidden)
    digitMaskNodes[index].classList.remove(CLASSNAMES.hidden)

    if (digitMaskNodes[index].innerText) {
      lastIndex = index
    }
  })

  selection.setBaseAndExtent(digitMaskNodes[0], 0, digitMaskNodes[lastIndex], 1)
}

export function clearAll(digitInputNodes, digitMaskNodes) {
  digitInputNodes.forEach((digitInput, index) => {
    digitInput.value = ''
    digitMaskNodes[index].innerText = ''
  })
}

export function showInputDigits(digitInputNodes, digitMaskNodes) {
  for (let i = 0; i < digitInputNodes.length; i++) {
    digitInputNodes[i].classList.remove(CLASSNAMES.hidden)
    digitMaskNodes[i].classList.add(CLASSNAMES.hidden)
  }
}

export function getCleanSelectedText() {
  return window.getSelection().toString().replace(/\s/g, '')
}

export function getCurrentCodeValue(digitInputNodes) {
  return digitInputNodes
    .map(input => input.value)
    .join('')
    .trim()
}
