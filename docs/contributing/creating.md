# Creating a component

In this guide, we'll walk through creating a custom component in HSDS!

All Components in HSDS are or have been updated to TypeScript, do not fret! You can write your components in regular old JavaScript, just make sure the extensions are '.ts' or '.tsx' (if your file contains jsx, you want .tsx) things will work as normal.
We do enocurage you to have a look at other components and follow how thay are put together, you might learn a thing or two, which is always a good thing!

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

* `index.ts`
* `Strong.tsx`
* `Strong.utils.ts`

If your component will be styled (not all are!) add a `styles` folder and put a `Strong.css.js` file in it

```
hsds-react/
  └── src/
      └── components/
          └── Strong/
              └── styles/
                  └── Strong.css.js
              ├── index.ts
              ├── Strong.tsx
              └── Strong.utils.ts
```

The **`index.ts`** file is the main file allow the consuming App/component to use `Strong`. It also "connects" our component to `PropProvider`, allowing the user to more easily customize `Strong` ([more on that later](#propConnect)!).

The **`String.tsx`** file our actual React component.

## Base component code

Add the starting React component boilerplate for `Strong.tsx`:

```jsx
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Strong.utils.ts'
import { StrongUI } from './styles/Strong.css.js'

class Strong extends React.PureComponent {
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

#### TypeScript

HSDS uses [TypeScript](https://www.typescriptlang.org/) for typing. You can write your component in JS, and add the TypeScript layer little by little.
Here are a couple of relevant links to get you started:

* [JSX in TypeScript](https://www.typescriptlang.org/docs/handbook/jsx.html)
* [Understanding TypeScript’s type notation](http://2ality.com/2018/04/type-notation-typescript.html)
* [Typescript, React, JSX](https://basarat.gitbooks.io/typescript/docs/jsx/react.html)

Notice how our example at the moment does not include anything TypeScript wise yet.

**Important**

I just told you a lie, TypeScript requires that specific way to import React: `import * as React from 'react'` so no `import React, { PureComponent as Component } from 'react'`

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

HSDS follows the [ITCSS](https://developer.helpscout.com/seed/glossary/itcss/) naming architecture, which is why components have a `className` prefix of `c-`.

#### `is-superBold`

Any prop that can modify a components appearance or behaviour is added as a `className` under `componentClassName`. This is to both apply styling and to better communicate a component's state within the DOM (for debugging/testing/targeting).

These modifier classNames should typically be prefixed with words like `is-`, `has-`, `with`.

#### `...getValidProps(rest)`

HSDS's components are designed to be used as if they were default HTML elements. The `...rest` pattern allows for users to pass in custom (but HTML-supported) props like:

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

This is a Higher-Order component that sets up the internal namespacing within HSDS. It allows for HSDS components to reliably type-check each other.

`COMPONENT_KEY` is the namespace for the component, in our case, `Strong`. This key normally resides in the "utils" file.

## Utils

Your component might need different functions, constants or other stuff that don't need to live inside of it, the place to put those is inside your utils file: `Strong.utils.ts`, at the minimum, this file is where the `COMPONENT_KEY` lives:

**Strong.utils.ts**

```ts
export const COMPONENT_KEY = 'Strong'
```

## Exporting

We'll need to export `Strong` to make it simpler to import and use. This is all done in our `index.js` file:

```jsx
import Strong from './Strong'
import { propConnect } from '../PropProvider'
import { COMPONENT_KEY } from './Strong.utils.ts'

export default propConnect(COMPONENT_KEY)(Strong)
```

Whoa 😳! More stuff!

#### `propConnect`

`propConnect` is a special Higher-Order Component that works very similar to [Redux's](https://redux.js.org/) `connect`. It hooks up our `Strong` component to HSDS's `PropProvider`, which allows the user to more [easily override props](https://github.com/helpscout/hsds-react/blob/master/src/components/PropProvider/docs/Provider.md).

We provide it with the (`string`) namespace (`COMPONENT_KEY`), as well as the actual Component.

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

## Adding TypeScript types

When working with TypeScript on A react component, one of the things it brings to the table is a different way to generate a component's "prop types", you no longer need the separate package 'prop-types' as you will be using TS's type system. Let's add this to our example, first, create a new file: `Strong.types.ts`

```
hsds-react/
  └── src/
      └── components/
          └── Strong/
              └── styles/
                  └── Strong.css.js
              ├── index.ts
              ├── Strong.tsx
              └── Strong.types.ts
```

**Strong.types.ts**

Notice the convention to define the component prop types: `ComponentNameProps`, for state types use: `ComponentNameState`

```ts
export type StrongProps = {
  children?: any
  className?: string
  isSuperBold: boolean
}
```

**Strong.tsx**

```jsx
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { StrongUI } from './styles/Strong.css.js'
import { StrongProps } from './Strong.types.ts'

export const COMPONENT_KEY = 'Strong'

class Strong extends React.PureComponent<StrongProps> {
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

And that's it 🙏! You've successfully created, hooked up, and exported our new `Strong` component 💪.

## About naming conventions

You'll quickly notice a pattern to everything we add inside a component. The reason for this is that HSDS has many components! And when you are working inside your code editor, it's easier to find what you need if everything is named following a convention.

Below is a summary of things to pay attention to with examples of a slightly more complex component:

#### Folder Structure

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
              ├── index.ts
              ├── Table.tsx
              ├── Table.Cell.tsx
              ├── Table.utils.ts
              └── Table.types.ts
```

#### Types

```ts
export type TableProps = {
  /* ... */
}
export type TableState = {
  /* ... */
}
export type TableCellProps = {
  /* ... */
}
export type TableCellState = {
  /* ... */
}
```

In general, the pattern looks like `Component.SubComponent`...

## Next

Let's add some [styles](stying.md)!

## See also

* [react-utils](https://helpscout.gitbook.io/react-utils)
