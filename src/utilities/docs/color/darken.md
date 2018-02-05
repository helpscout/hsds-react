# `darken(hex, value = 20)`

Darkens the hex color with a specified value.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Hex color to adjust. |
| `value` | `number` | Amount (%) to adjust by. Default is `20`. |


### Returns

`string` : The adjusted hex color value.


### Example

```js
import { darken } from '../utils/color'

const textColor = darken('#fff')

// Output
// #ebebeb
```
