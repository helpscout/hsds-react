# Write a story

In this guide, we'll walk through render our newly [styled](styling.md) [custom `Strong` component](creating.md) in [Storybook](https://storybook.js.org/).

## Directory

All of HSDS's stories are located under `src/stories/`:

```
hsds-react/
  └── stories/
```

They are manually imported and rendered with the main `index.js` file:

All of HSDS's stories are located under `src/stories/`:

```
hsds-react/
  └── stories/
      └── index.js
```

## Initial files

The first thing we'll need to do is create a dedicated `Strong` directory under `stories/`:

```
hsds-react/
  └── stories/
      └── Strong/
```

Under `Strong/`, we'll need to create the main `index.js` file:

```
hsds-react/
  └── stories/
      └── Strong/
          └── index.js
```

## Base story code

In our `Strong/index.js` file, we'll need to add:

```jsx
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Strong } from '../../src/index.js'

const stories = storiesOf('Strong', module)

stories.add('default', () => <Strong>Super strong!</Strong>)
```

Additional stories can be added using `stories.add`. Be sure to give each story a unique name.

## Add to Storybook

Almost there 🌈! The last thing we need to do is add our `Strong/index.js` file to the main `stories/index.js` file.

Open up `stories/index.js`. You should see a **bunch** of imports listed in **alphabetical order**. Add `Strong`:

```jsx
...
import './Strong'
...
```

Amaze 😍! We can see our `Strong` component in Storybook!

## Next

Let's [write some tests](testing.md) to make sure `Strong` works as we expect it to. (Just in case!)

## See also

* [Storybook](https://storybook.js.org/)
