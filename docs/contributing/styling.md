# Styling a component

In this guide, we'll walk through styling our newly created [custom `Strong` component](creating.md).

## CSS-in-JS

Blue uses CSS-in-JS techniques for styling, powered by [Fancy](https://helpscout.gitbook.io/fancy).

Start by creating a dedicated `styles/` directory under `Strong/`:

```
blue/
  └── src/
      └── components/
          ├── styles/
          ├── index.js
          └── Strong.js
```

Within `styles/`, create a file named after our component. In our case, `Strong.css.js`:

```
blue/
  └── src/
      └── components/
          ├── styles/
          │    └── Strong.css.js
          ├── index.js
          └── Strong.js
```

The `.css.js` file extension is a convention Blue uses to distinguish dedicated CSS-in-JS file types. They're still plain ol' `.js` files though 🤓.

## Styled Components

Add the starting styled component boilerplate for `Strong.css.js`:

```jsx
// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const StrongUI = styled('strong')`
  ${baseStyles} font-weight: 600;

  &.is-superBold {
    font-weight: 900;
  }
`

export default StrongUI
```

Whoa 😳! Lots of stuff! What is this stuff!

#### `baseStyles`

These are initial styles used for **every single** Blue component. Blue is designed to work out-of-the-box, with no reliance on normalizers or resets. As such, basic reset styles like `box-sizing: border-box;` and `font-family` are manually added to every component.

Add your desired custom styling after adding `${baseStyles}`.

#### `styled`

`styled` is an adapter for [Fancy](https://helpscout.gitbook.io/fancy), and works just like `styled` from [Styled Components](https://www.styled-components.com) or [Emotion](https://emotion.sh/).

#### `StrongUI`

The design pattern we use to distinguish styled-components (SC) vs. regular React components is to add `UI` to the end of the name.

#### `is-superBold`

This contains the modifier styles specified in our `Strong` component. Similar to Sass, ampersand for className inheritance is supported.

Blue's CSS-in-JS practices favour the use of conventional CSS modifier classes, rather than [dynamically computed styles](https://www.styled-components.com/docs/basics#adapting-based-on-props). From experience, this keeps the code much cleaner and easier to read. It also avoids clashing, which sometimes happens with dynamic styling.

#### export

We're making our `StrongUI` available as the default export, but also as a named export. The reason for this is incase we need to use the isolated SC in another component.

And that's it 🙏! You've successfully styled our new `Strong` component 💪.

## Next

Let's [write a story](storybook.md) to see this thing in a browser!

## See also

* [Fancy](https://helpscout.gitbook.io/fancy)
* [Emotion](https://emotion.sh/)
