# Portal

The "Portal" approach is used for components like Modals or Popovers. Components that need to render at the `<body>` level, regardless of where they're initially called or rendered.

This technique ensures the "Portal'ed" component have much greater control when it comes to positioning or styling (mostly CSS things).

I've used Portal-based libraries before (`react-portal` for React, and `ember-wormhole` for Ember). I understand how they work, but I've never built one from scratch before.

From my understanding, modern React conventions may require the `<Portal>` component to be a Higher-Order component.

So other components like `Modal`, `Popover`, or `Tooltip` can leverage Portal'ing features by using the Portal HOC.
