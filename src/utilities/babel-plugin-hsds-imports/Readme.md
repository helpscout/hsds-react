# HSDS Imports Babel Plugin

What do we _don't_ want?

```js
import Page from 'hsds-react-next/components/Page'
import Button from 'hsds-react-next/components/Button'
import Select from 'hsds-react-next/components/Select'
```

What do we want?

```js
import { Page, Button, Select } from 'hsds-react-next'
```

Currently applications need to import components using the first mode above to allow tree-shaking, otherwise we can use `import { Page, Button, Select } from 'hsds-react-next/components/'` (notice the "/components" requirement) but it won't be tree-shakeable.

So feel free to write the nice and concise form of importing, and get all the benefits. Who said you can't have your cake and eat it too?

Have a look at the test cases, in a nutshell:

- Allows you to use destructuring
- Allows you to remove "components" from the import path
- Accepts one option `packages` to instruct which hsds package you want this to have an effect on, say both of "helspcout-hsds-react-next" and "@helpscout/hsds-react" or just one

Instead of keeping a long list of cases (that will never be complete) on when the component shouldn't act, the plugin only acts on the package provided in the plugin options and if the import is a valid component.

```
// valid components Accordion and Card, changes
import { Accordion, Card } from '@helpscout/hsds-react/components/'
// default import, leaves
import Page from '@helpscout/hsds-react/components/Page'
// No component in this import, leaves
import '@helpscout/hsds-react/adapters/app'
// 'OverlayUI' invalid, leaves
import { OverlayUI } from '@helpscout/hsds-react/components/Overlay/Overlay.css'
// Invalid 'Hello', leaves
import { Button, Hello } from '@helpscout/hsds-react/components/'

↓ ↓ ↓ ↓ ↓ ↓

import Card from "@helpscout/hsds-react/components/Card";
import Accordion from "@helpscout/hsds-react/components/Accordion";
import Page from '@helpscout/hsds-react/components/Page';
import '@helpscout/hsds-react/adapters/app';
import { OverlayUI } from '@helpscout/hsds-react/components/Overlay/Overlay.css';
import { Button, Hello } from '@helpscout/hsds-react/components/';
```

The component list is generated from the `/components/index.js` file.

To use, add it to your babel conf file:

```
{
  "plugins": [
    [
      "@helpscout/hsds-react/src/utilities/babel-plugin-hsds-imports/",
      { "packages": ["helpscout-hsds-react-next"] }
    ]
  ]
}

```
