# `rgbToHex(r, g, b)`

Converts an rgb value into a hex-based color.


### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `r` | `number` | Number value for red. |
| `g` | `number` | Number value for green. |
| `b` | `number` | Number value for blue. |


### Returns

`string`: A hex color value based on the `r`, `g`, `b` arguments.


### Example

```js
import { rgbToHex } from '../utils/color'

const hex = rgbToHex(0, 0, 0)

// Output
// #000000
```
