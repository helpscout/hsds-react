# Components

This guide will show you how to use components from HSDS!

## Usage

Any one of HSDS's [components](https://github.com/helpscout/hsds-react/tree/master/src/components) can be imported into your React app.

In the following example, we're going to be building a form using a handful of HSDS's components.

Welp. This `Form` looks mighty empty.

```jsx
import React, { Component } from 'react'

class Form extends Component {
  render() {
    return <form>Form. Coming soon.</form>
  }
}

export default Form
```

## Importing

Let's add an `Input` to make it useful. We can import HSDS's `Input` by adding:

```jsx
import Input from '@helpscout/hsds-react/components/Input'
```

Technically, you can do this:

```jsx
import { Input } from '@helpscout/blue'
```

However, the above example will, by default, import **all** of HSDS. I get that HSDS is cool and all, but we don't want to make your App bigger than it needs to be.

Using the first example's import method ensures you're only adding what you need 🙌.

```jsx
import React, { Component } from 'react'
import Input from '@helpscout/hsds-react/components/Input'

class Form extends Component {
  ...
}
```

## Default props

Great 👍! Now that we have our `Input`, let's add it to our `Form`:

```jsx
import React, { Component } from 'react'
import Input from '@helpscout/hsds-react/components/Input'

class Form extends Component {
  render() {
    return (
      <form>
        <Input placeholder="First name" value="" />
      </form>
    )
  }
}
```

You'll notice that we've added some props to our `Input`. HSDS's components were designed to accept and render any valid React/default HTML prop. Components that are based on HTML primitives, like `Input` or `Select`, will work just like a regular `input` or `select` (except better 😉).

## Special props

Hmm 🤔. Our `Input` is missing a `label`. We could add an HTML `label` to our `Form`. Or we could even import HSDS's `Label` component:

```jsx
import Label from '@helpscout/hsds-react/components/Label'
```

Or... we could use the super convenient `label` prop from `Input` to automatically generate a `Label` for us:

```jsx
import React, { Component } from 'react'
import Input from '@helpscout/hsds-react/components/Input'

class Form extends Component {
  render() {
    return (
      <form>
        <Input label="First name" placeholder="Buddy" value="" />
      </form>
    )
  }
}
```

React is neat as it allows us to create custom components with special props that do special things ⚡️.

To see what non-HTML special props HSDS's components can accept, check out the component's [README](https://github.com/helpscout/hsds-react/tree/master/src/components/Input) file. **Every component has one**.

Neato! We have our first HSDS `Input` within our `Form`. Let's add a couple more:

```jsx
import React, { Component } from 'react'
import Input from '@helpscout/hsds-react/components/Input'

class Form extends Component {
  render() {
    return (
      <form>
        <Input label="First name" placeholder="Buddy" value="" />
        <Input label="Last name" placeholder="Elf" value="" />
        <Input label="Location" placeholder="North Pole" value="" />
      </form>
    )
  }
}
```

## Composition

The `Input` spacing seems a little off in our `Form` 😱. Good thing HSDS has a `FormGroup` component to help with this very thing!

Just like with `Input`, we'll start by importing it:

```jsx
import FormGroup from '@helpscout/hsds-react/components/FormGroup'
```

Now we can wrap our `Input` components:

```jsx
import React, { Component } from 'react'
import FormGroup from '@helpscout/hsds-react/components/FormGroup'
import Input from '@helpscout/hsds-react/components/Input'

class Form extends Component {
  render() {
    return (
      <form>
        <FormGroup>
          <Input label="First name" placeholder="Buddy" value="" />
        </FormGroup>
        <FormGroup>
          <Input label="Last name" placeholder="Elf" value="" />
        </FormGroup>
        <FormGroup>
          <Input label="Location" placeholder="North Pole" value="" />
        </FormGroup>
      </form>
    )
  }
}
```

Nice 😍! Our `Form` is looking mighty spiffy. It's a good thing HSDS's components are designed to work with each other. This allows you to compose your UI however it is you see fit.

Lastly, we need a way to submit our `Form` data. We need a `Button`!

```jsx
import Button from '@helpscout/hsds-react/components/Button'
```

Just like our `Input`, we'll wrap our `Button` with `FormGroup` to ensure proper spacing:

```jsx
import React, { Component } from 'react'
import Button from '@helpscout/hsds-react/components/Button'
import FormGroup from '@helpscout/hsds-react/components/FormGroup'
import Input from '@helpscout/hsds-react/components/Input'

class Form extends Component {
  render() {
    return (
      <form>
        <FormGroup>
          <Input label="First name" placeholder="Buddy" value="" />
        </FormGroup>
        <FormGroup>
          <Input label="Last name" placeholder="Elf" value="" />
        </FormGroup>
        <FormGroup>
          <Input label="Location" placeholder="North Pole" value="" />
        </FormGroup>
        <FormGroup>
          <Button submit>Send</Button>
        </FormGroup>
      </form>
    )
  }
}
```

Amazing 🌈! We have our completed form.
