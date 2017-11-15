/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
  // no easing, no acceleration
export const linear = (t) => { return t }
  // accelerating from zero velocity
export const easeInQuad = (t) => { return t*t }
  // decelerating to zero velocity
export const easeOutQuad = (t) => { return t*(2-t) }
  // acceleration until halfway, then deceleration
export const easeInOutQuad = (t) => { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
  // accelerating from zero velocity 
export const easeInCubic = (t) => { return t*t*t }
  // decelerating to zero velocity 
export const easeOutCubic = (t) => { return (--t)*t*t+1 }
  // acceleration until halfway, then deceleration 
export const easeInOutCubic = (t) => { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
  // accelerating from zero velocity 
export const easeInQuart = (t) => { return t*t*t*t }
  // decelerating to zero velocity 
export const easeOutQuart = (t) => { return 1-(--t)*t*t*t }
  // acceleration until halfway, then deceleration
export const easeInOutQuart = (t) => { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }
  // accelerating from zero velocity
export const easeInQuint = (t) => { return t*t*t*t*t }
  // decelerating to zero velocity
export const easeOutQuint = (t) => { return 1+(--t)*t*t*t*t }
  // acceleration until halfway, then deceleration 
export const easeInOutQuint = (t) => { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
