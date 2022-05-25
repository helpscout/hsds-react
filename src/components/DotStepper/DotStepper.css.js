import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'

const BULLET_SIZE = 6
const BULLET_MARGIN = 5
const getProgressWidth = step => step * BULLET_SIZE + (step - 1) * BULLET_MARGIN

export const DotStepperUI = styled('ol')`
  display: flex;
  list-style: none;
  margin: 0;
  padding: ${BULLET_MARGIN}px;
  position: relative;
`

export const ProgressBulletUI = styled('div')`
  position: absolute;
  top: ${BULLET_MARGIN}px;
  left: ${BULLET_MARGIN}px;
  background: ${getColor('green.300')};
  width: ${({ step }) => getProgressWidth(step)}px;
  height: ${BULLET_SIZE}px;
  border-radius: ${BULLET_SIZE}px;
  transition: all 0.15s ease-out;

  &::after {
    content: '';
    width: ${BULLET_SIZE}px;
    height: ${BULLET_SIZE}px;
    top: 0;
    right: 0;
    position: absolute;
    border-radius: ${BULLET_SIZE}px;
    background: ${getColor('green.500')};
  }
`

export const BulletUI = styled('li')`
  float: left;
  width: ${BULLET_SIZE}px;
  height: ${BULLET_SIZE}px;
  border-radius: ${BULLET_SIZE}px;
  background: ${getColor('grey.500')};
  overflow: hidden;
  margin: 0 0 0 ${BULLET_MARGIN}px;
  text-indent: -9999px;

  &:first-child {
    margin: 0;
  }
`
