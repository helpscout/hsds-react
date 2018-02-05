# `optimalTextColor(hex)`

Determines the most legible text color based on a hex color value, and returns either 'black' or 'white'

The calculations are made based on [this algorithm](https://24ways.org/2010/calculating-color-contrast/).

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Hex color to check against. |


### Returns

`black`/`white` : A `string` calculated based on the `hex` argument.


### Example

```js
import { optimalTextColor } from '../utils/color'

const textColor = optimalTextColor('#000')

// Output
// white
```
