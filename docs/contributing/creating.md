# Creating a component

In this guide, we'll walk through creating a custom component in Blue!

We'll be created a `Strong` component, an enhancement to the default HTML `strong` primitive.

## Directory

All of Blue's components are located under `src/components/`:

```
blue/
  └── src/
      └── components/
```

## Initial files

The first thing we'll need to do is create a dedicated `Strong` directory under `Components/`:

```
blue/
  └── src/
      └── components/
          └── Strong/
```

Under our newly created `Strong/` directory, we'll need to create 2 files:

* `index.js`
* `Strong.js`

```
blue/
  └── src/
      └── components/
          └── Strong/
              ├── index.js
              └── Strong.js
```

The **`index.js`** file is the main file allow the consuming App/component to use `Strong`. It also "connects" our component to `PropProvider`, allowing the user to more easily customize `Strong` ([more on that later](#propConnect)!).

The **`String.js`** file our actual React component.

## Base component code

Add the starting React component boilerplate for `Strong.js`:

```jsx
// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { StrongUI } from './styles/Strong.css.js'

export const COMPONENT_KEY = 'Strong'

type Props = {
  children?: any,
  className?: string,
  isSuperBold: boolean,
}

class Strong extends Component<Props> {
  static defaultProps = {
    isSuperBold: false,
  }

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

namespaceComponent(COMPONENT_KEY, Strong)

export default Strong
```

Whoa 😳! Lots of stuff going on already!

#### `Flow`

Blue uses [Flow](https://flow.org/en/) for typing. To enable Flow type on our component, we have to start off the file with `// @flow`.

#### `Strong.css.js`

The style `strong` component, using CSS-in-JS techniques. More on that our [styling guide](styling.md).

#### `PureComponent`

Creating a component **class** from extending `React.PureComponent` works seems to work best for component libraries.

Compared to a `React.Component`, it's often more performant and faster since it shallow diff's props when React needs to re-render.

If you're expecting your Component to have a bunch of deeply nested, logic heavy child components, extends from `React.Component` instead of `React.PureComponent`.

Compared to Stateless-Functional Components, the pros are many, which include:

* Ability to reference DOM nodes
* Standardized component structure
* Access to React [lifecycle hooks](https://reactjs.org/docs/state-and-lifecycle.html)
* Prop-diffing, so that it doesn't re-render all the time (this is a big one)

#### `componentClassName`

The `classNames` utility is a light-weight version of the popular [`classnames`](https://www.npmjs.com/package/classnames) library.

It is used to both define your component's `className`, and to extends the `className` prop.

**Always give your components a className**. Even if it's not directly attached to a CSS style rule. The main reasons are for inclusivity and thoughtful architecture.

The concept of markup and classNames can be understood by everyone who knows HTML. That allows for non JS/React folks to inspect to understand/debug the UI. It also allows for folks to write tests that explicitly target selectors.

The second point is thoughtful architecture. HTML is the foundation to your React component. It's critical to get this right to make your components/app accessible and easy to reason about/comprehend. There has to be a purpose for every single HTML selector added to a React component. Describe that reasoning with a thoughtful className.

Blue follows the [ITCSS](https://developer.helpscout.com/seed/glossary/itcss/) naming architecture, which is why components have a `className` prefix of `c-`.

#### `is-superBold`

Any prop that can modify a components appearance or behaviour is added as a `className` under `componentClassName`. This is to both apply styling and to better communicate a component's state within the DOM (for debugging/testing/targeting).

These modifier classNames should typically be prefixed with words like `is-`, `has-`, `with`.

#### `...getValidProps(rest)`

Blue's components are designed to be used as if they were default HTML elements. The `...rest` pattern allows for users to pass in custom (but HTML-supported) props like:

* `aria` roles
* `data-` attributes
* `title`

(Just to name a few)

It also allows for the user to hook into default React props, like:

* `onMouseEnter`
* `onClick`
* `htmlFor`

`getValidProps()` is a special [utility function](https://helpscout.gitbook.io/react-utils) that filters out non-default HTML/React props. This prevents React from throwing errors if non-default props are accidentally passed during the Object spread process.

Wonderful 🙏! You've created the base for `Strong`, that's performant, easy to extend, and Flow typed.

#### `namespaceComponent`

This is a Higher-Order component that sets up the internal namespacing within Blue. It allows for Blue components to reliably type-check each other.

`COMPONENT_KEY` is the namespace for the component, in our case, `Strong`. Exporting it allows for other components to use the key for type-checking.

## Exporting

We'll need to export `Strong` to make it simpler to import and use. This is all done in our `index.js` file:

```jsx
// @flow
import Strong from './Strong'
import { propConnect } from '../PropProvider'

export default propConnect('Strong')(Strong)
```

Whoa 😳! More stuff!

#### `propConnect`

`propConnect` is a special Higher-Order Component that works very similar to [Redux's](https://redux.js.org/) `connect`. It hooks up our `Strong` component to Blue's `PropProvider`, which allows the user to more [easily override props](https://github.com/helpscout/blue/blob/master/src/components/PropProvider/docs/Provider.md).

We provide it with the (`string`) namespace (`'Strong'`), as well as the actual Component.

## More Exporting

All of Blue's components are made available in `components/index.js`:

```
blue/
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

## Next

Let's add some [styles](stying.md)!

## See also

* [Flow](https://flow.org/en/)
* [react-utils](https://helpscout.gitbook.io/react-utils)
