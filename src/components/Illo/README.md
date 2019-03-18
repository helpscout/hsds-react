# Illo

An Illo component renders an SVG illustration.

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
import { load } from '@helpscout/hsds-react/components/Illo'

const customSVGSet = { ... }

load(customSVGSet)
```

To unload, or reset, the SVG set, you can use the `unload` function:

```js
import { unload } from '@helpscout/hsds-react/components/Illo'

unload()
```

## Example

```jsx
<Illo name="blankSlateBurgandy" />
```

## Props

| Prop               | Type              | Description                                                                       |
| ------------------ | ----------------- | --------------------------------------------------------------------------------- |
| className          | `string`          | Custom class names to be added to the component.                                  |
| color              | `string`          | Custom color for SVG image on primary paths.                                      |
| colorSecondary     | `string`          | Custom color for SVG image on secondary paths.                                    |
| colorUi            | `string`          | Custom color for SVG image on UI themed paths.                                    |
| colorUiDark        | `string`          | Custom color for SVG image on UI dark themed paths.                               |
| colorUiLight       | `string`          | Custom color for SVG image on UI light themed paths.                              |
| colorUiTransparent | `string`          | Custom color for SVG image on UI transparent themed paths. Default `transparent`. |
| colorUiWhite       | `string`          | Custom color for SVG image on UI white themed paths. Default `white`.             |
| name               | `string`          | Determines the SVG image. Required.                                               |
| onClick            | `function`        | Callback function when component is clicked.                                      |
| size               | `number`/`string` | Adjusts the size of the component.                                                |
| title              | `string`          | Provides a name for the component.                                                |
