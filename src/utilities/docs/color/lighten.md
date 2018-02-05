# `lighten(hex, value = 20)`

Lightens the hex color with a specified value.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Hex color to adjust. |
| `value` | `number` | Amount (%) to adjust by. Default is `20`. |


### Returns

`string` : The adjusted hex color value.


### Example

```js
import { lighten } from '../utils/color'

const textColor = lighten('#000')

// Output
// #141414
```
