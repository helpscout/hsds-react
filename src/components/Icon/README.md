# Icon

An Icon component renders an SVG icon.

## Adapter

As of v2.18.0, the `svg` set is opt-in. This was done to reduce the compiled bundle size. To load the `svg` icons, add the appropriate adapter to your app.

It is recommended that the adapter be loaded somewhere within your main entry point (e.g. `src/index.js`).

```js
// src/index.js
// For a lighter-weight svg set for embeddables
import '@helpscout/hsds-react/adapters/embed'
// For the complete svg set
import '@helpscout/hsds-react/adapters/app'
```

Note: This loads all the `svg` images, including [`Icon`](../../components/Icon) and [`Illo`](../../components/Illo).

### Loading / Unloading SVG

To manually load SVG sets without an adapter, you can use the `load` function from this component:

```js
import { load } from '@helpscout/hsds-react/components/Icon'

const customSVGSet = { ... }

load(customSVGSet)
```

To unload, or reset, the SVG set, you can use the `unload` function:

```js
import { unload } from '@helpscout/hsds-react/components/Icon'

unload()
```

## Example

```jsx
<Icon name="emoji" />
```

## Props

| Prop        | Type              | Description                                                    |
| ----------- | ----------------- | -------------------------------------------------------------- |
| center      | `bool`            | Center aligns component.                                       |
| className   | `string`          | Custom class names to be added to the component.               |
| clickable   | `bool`            | Enables the component to be clickable.                         |
| ignoreClick | `bool`            | Ignores click events. Bubbles click event to parent component. |
| inline      | `bool`            | Displays the component as `inline-block`.                      |
| muted       | `bool`            | Applies muted styles.                                          |
| name        | `string`          | Determines the SVG image. Required.                            |
| onClick     | `function`        | Callback function when component is clicked.                   |
| state       | `string`          | Changes icon color to represent a state.                       |
| shade       | `string`          | Changes icon color shade.                                      |
| size        | `number`/`string` | Adjusts the size of the component.                             |
| title       | `string`          | Provides a name for the component.                             |
| withCaret   | `bool`            | Renders a caret icon, next to the component's SVG icon.        |

### Shades

| Prop         | Description        |
| ------------ | ------------------ |
| `subtle`     | Medium-light grey. |
| `muted`      | Lighter grey.      |
| `faint`      | Very lighter grey. |
| `extraMuted` | Extra light grey.  |

### States

| Prop      | Description              |
| --------- | ------------------------ |
| `error`   | Changes color to red.    |
| `success` | Changes color to green.  |
| `warning` | Changes color to yellow. |
