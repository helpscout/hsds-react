# `hexToRgb(hex)`

Converts a hex color into an rgb-based object with rgb values.


### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Hex color to convert to an rgb object. |


### Returns

`object`: An rgb object. (Example: `{ r: 255, g: 0, b: 0}`)


### Example

```js
import { hexToRgb } from '../utils/color'

const rgb = hexToRgb('#000')

// Output
// {
//   r: 0,
//   g: 0,
//   b: 0
// }
```
