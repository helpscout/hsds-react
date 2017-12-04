'use strict'

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

let lastTime = 0;
if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function(callback, element) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

if (!window.SVGElement)
  window.SVGElement = window.Element
