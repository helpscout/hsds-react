'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('..');

var components = [_.Animate, _.Avatar, _.Badge, _.Button, _.Card, _.CardBlock, _.Heading, _.Icon, _.Image, _.Input, _.Label, _.Link, _.LoadingDots, _.Overlay, _.Select, _.Text, _.VisuallyHidden];

var componentTestHelper = function componentTestHelper(component) {
  test(component.name, function () {
    expect(component).toBeTruthy();
    expect(typeof component === 'undefined' ? 'undefined' : _typeof(component)).toBe('function');
  });
};

components.forEach(function (c) {
  return componentTestHelper(c);
});