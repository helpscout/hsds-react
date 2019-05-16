# styled

This is an adapter for [Fancy](https://github.com/helpscout/fancy), which provides some flexibility for how Fancy is consumed within Blue.

As a bonus, it makes migrating away from Fancy easier, if we ever choose to swap Fancy out with another CSS-in-JS equivalent (with a similar API).

See [Fancy's documentation](https://github.com/helpscout/fancy) for more details.

## Extras (aka. `_`)

With the [`@helpscout/fancy@2.5.0`](https://github.com/helpscout/fancy/releases/tag/v2.5.0) update, we're able to add extra arguments to the `styled` function. These "extras" are handy utilities used to style components within this library.

Extras is unique to this library, and isn't a default feature of a library like [Emotion](https://emotion.sh/docs/introduction).

### Example

**Without Extras**

```jsx
import styled from '../styled'
import { getColor } from '../../../styles/utilities/color'

const Brick = styled('div')`
  background-color: ${getColor('red.500')};
`
```

**With Extras**

```jsx
import styled from '../styled'

const Brick = styled('div')`
  background-color: ${styled._.getColor('red.500')};
`
```

**Or**

```jsx
import styled from '../styled'
const { _ } = styled

const Brick = styled('div')`
  background-color: ${_.getColor('red.500')};
`
```

**Or...**

```jsx
import styled from '../styled'

const Brick = styled('div')`
  ${({ _ }) => `
    background-color: ${_.getColor('red.500')};
  `};
`
```

Extras include the following utilities:

* `addFontSmoothing`
* `baseStyles`
* `darken`
* `forEach`
* `getColor`
* `getShadow`
* `isBeacon`
* `isHSApp`
* `lighten`
* `makeFontFamily`
* `makeFontFamilyMono`
* `resetStyles`
* `rgb`
* `rgba`
* `setFontSize`
