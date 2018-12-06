import pathfinder from 'sass-pathfinder'
import alert from '@seedcss/seed-alert'
import button from '@seedcss/seed-button'
import colorScheme from '@seedcss/seed-color-scheme'
import control from '@seedcss/seed-control'
import dash from '@seedcss/seed-dash'
import family from '@seedcss/seed-family'
import flexy from '@seedcss/seed-flexy'
import grid from '@seedcss/seed-grid'
import seedThis from '@seedcss/seed-this'

const includePaths = pathfinder([
  alert,
  button,
  colorScheme,
  control,
  dash,
  family,
  flexy,
  grid,
  list,
  seedThis,
])

export default includePaths
