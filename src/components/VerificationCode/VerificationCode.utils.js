/* istanbul ignore file */
export const CLASSNAMES = {
  hidden: 'hidden',
}

export function selectAll(digitInputNodes, digitMaskNodes) {
  let selection = window.getSelection()

  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }

  digitInputNodes.forEach((digitInputNode, index) => {
    digitInputNode.classList.add(CLASSNAMES.hidden)
    digitMaskNodes[index].classList.remove(CLASSNAMES.hidden)

    if (digitMaskNodes[index].innerText) {
      let range = document.createRange()
      range.selectNode(digitMaskNodes[index])
      selection.addRange(range)
    }
  })
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
  return window
    .getSelection()
    .toString()
    .replace(/\s/g, '')
}

export function getCurrentCodeValue(digitInputNodes) {
  return digitInputNodes
    .map(input => input.value)
    .join('')
    .trim()
}
