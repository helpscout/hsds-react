# Styling a component

In this guide, we'll walk through styling our newly created [custom `Strong` component](creating.md).

## CSS-in-JS

HSDS uses CSS-in-JS techniques for styling, powered by [styled-components](https://styled-components.com/).

```
hsds-react/
  └── src/
      └── components/
          └── Strong.css.js
          ├── index.js
          └── Strong.jsx
```

The `.css.js` file extension is a convention HSDS uses to distinguish dedicated CSS-in-JS file types. They're still plain ol' `.js` files though 🤓.

## Styled Components

Add the starting styled component boilerplate for `Strong.css.js`:

```jsx
import styled from 'styled-components'

export const StrongUI = styled('strong')`
  font-weight: 600;

  &.is-superBold {
    font-weight: 900;
  }
`

export default StrongUI
```

Whoa 😳! Lots of stuff! What is this stuff!

#### `StrongUI`

The design pattern we use to distinguish styled-components (SC) vs. regular React components is to add `UI` to the end of the name.

#### `is-superBold`

This contains the modifier styles specified in our `Strong` component. Similar to Sass, ampersand for className inheritance is supported.

HSDS's CSS-in-JS practices favour the use of conventional CSS modifier classes, rather than [dynamically computed styles](https://www.styled-components.com/docs/basics#adapting-based-on-props). From experience, this keeps the code much cleaner and easier to read. It also avoids clashing, which sometimes happens with dynamic styling.

#### export

We're making our `StrongUI` available as the default export, but also as a named export. The reason for this is incase we need to use the isolated SC in another component.

And that's it 🙏! You've successfully styled our new `Strong` component 💪.

## Next

Let's [write a story](storybook.md) to see this thing in a browser!

## See also

- [Styled component](https://styled-components.com/)
