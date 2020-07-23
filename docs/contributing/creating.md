# Creating a component

In this guide, we'll walk through creating a custom component in HSDS!

We do encourage you to have a look at other components and follow how thay are put together, you might learn a thing or two, which is always a good thing!

We'll be created a `Strong` component, an enhancement to the default HTML `strong` primitive.

## Directory

All of HSDS's components are located under `src/components/`:

```
hsds-react/
  └── src/
      └── components/
```

## Initial files

The first thing we'll need to do is create a dedicated `Strong` directory under `Components/`:

```
hsds-react/
  └── src/
      └── components/
          └── Strong/
```

Under our newly created `Strong/` directory, we'll need to create a few files:

- `index.js`
- `Strong.jsx`
- `Strong.css.js`
- `Strong.test.js`
- `Strong.stories.mdx`

```
hsds-react/
  └── src/
      └── components/
          └── Strong/
              └── Strong.css.js
              ├── index.js
              ├── Strong.jsx
              ├── Strong.test.js
              ├── Strong.stories.mdx
              └── Strong.utils.js
```

The **`index.js`** file is the main file allow the consuming App/component to use `Strong`.

The **`Strong.jsx`** file our actual React component.

### Component generator

Using the provided component generator npm script creates templates that includes all the files for you (component jsx, css, stories and test files) that follow our general patterns.

```bash
  npm run remake --name="Strong"
```

## Base component code

Add the starting React component boilerplate for `Strong.jsx`:

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { StrongUI } from './Strong.css.js'

class Strong extends React.PureComponent {
  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames(
      'c-Strong',
      isSuperBold && 'is-superBold',
      className
    )

    return (
      <StrongUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </StrongUI>
    )
  }
}

Strong.defaultProps = {
  isSuperBold: false,
  'data-cy': 'Strong',
}

Strong.propTypes = {
  /** Awesome prop to make this component super bold */
  isSuperBold: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Strong
```

Whoa 😳! Lots of stuff going on already!

#### `Strong.css.js`

The style `strong` component, using CSS-in-JS techniques. More on that our [styling guide](styling.md).

#### `PureComponent`

Creating a component **class** from extending `React.PureComponent` works seems to work best for component libraries.

Compared to a `React.Component`, it's often more performant and faster since it shallow diff's props when React needs to re-render.

If you're expecting your Component to have a bunch of deeply nested, logic heavy child components, extends from `React.Component` instead of `React.PureComponent`.

Compared to Stateless-Functional Components, the pros are many, which include:

- Ability to reference DOM nodes
- Standardized component structure
- Access to React [lifecycle hooks](https://reactjs.org/docs/state-and-lifecycle.html)
- Prop-diffing, so that it doesn't re-render all the time (this is a big one)

#### `componentClassName`

The `classNames` utility is a light-weight version of the popular [`classnames`](https://www.npmjs.com/package/classnames) library.

It is used to both define your component's `className`, and to extends the `className` prop.

**Always give your components a className**. Even if it's not directly attached to a CSS style rule. The main reasons are for inclusivity and thoughtful architecture.

The concept of markup and classNames can be understood by everyone who knows HTML. That allows for non JS/React folks to inspect to understand/debug the UI. It also allows for folks to write tests that explicitly target selectors.

The second point is thoughtful architecture. HTML is the foundation to your React component. It's critical to get this right to make your components/app accessible and easy to reason about/comprehend. There has to be a purpose for every single HTML selector added to a React component. Describe that reasoning with a thoughtful className.

HSDS follows the [ITCSS](https://developer.helpscout.com/seed/glossary/itcss/) naming architecture, which is why components have a `className` prefix of `c-`.

#### `is-superBold`

Any prop that can modify a components appearance or behaviour is added as a `className` under `componentClassName`. This is to both apply styling and to better communicate a component's state within the DOM (for debugging/testing/targeting).

These modifier classNames should typically be prefixed with words like `is-`, `has-`, `with`.

#### `...getValidProps(rest)`

HSDS's components are designed to be used as if they were default HTML elements. The `...rest` pattern allows for users to pass in custom (but HTML-supported) props like:

- `aria` roles
- `data-` attributes
- `title`

(Just to name a few)

It also allows for the user to hook into default React props, like:

- `onMouseEnter`
- `onClick`
- `htmlFor`

`getValidProps()` is a special [utility function](https://helpscout.gitbook.io/react-utils) that filters out non-default HTML/React props. This prevents React from throwing errors if non-default props are accidentally passed during the Object spread process.

Wonderful 🙏! You've created the base for `Strong`, that's performant, easy to extend, and Flow typed.

## Utils

Your component might need different functions, constants or other stuff that don't need to live inside of it, the place to put those is inside your utils file: `Strong.utils.js`.

## Exporting

We'll need to export `Strong` to make it simpler to import and use. This is all done in our `index.js` file:

```jsx
import Strong from './Strong'

export default Strong
```

Whoa 😳! More stuff!

## More Exporting

All of HSDS's components are made available in `components/index.js`:

```
hsds-react/
  └── src/
      └── components/
          └── index.js
```

Open that file. You should see a **bunch** of exports listed in **alphabetical order**. Add `Strong`:

```jsx
...
export { default as Strong } from './Strong'
...
```

And that's it 🙏! You've successfully created, hooked up, and exported our new `Strong` component 💪.

## About naming conventions

You'll quickly notice a pattern to everything we add inside a component. The reason for this is that HSDS has many components! And when you are working inside your code editor, it's easier to find what you need if everything is named following a convention.

Below is a summary of things to pay attention to with examples of a slightly more complex component:

#### Folder Structure

We try to follow a one-level folder structure for the most part but sometimes a component is too complex and composed of multiple smaller components, to give structure add folders as needed, for example:

```
hsds-react/
  └── src/
      └── components/
          └── Table/
              └── __tests__/
                  ├── Table.Cell.test.js
                  └── Table.test.js
              └── styles/
                  ├── Table.Cell.css.js
                  └── Table.css.js
              └── stories/
                  ├── Table.stories.mdx
                  └── TableBody.stories.mdx
              ├── index.js
              ├── Table.jsx
              ├── Table.Cell.jsx
              ├── Table.utils.js
```

## Next

Let's add some [styles](stying.md)!

## See also

- [react-utils](https://helpscout.gitbook.io/react-utils)
