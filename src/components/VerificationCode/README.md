# VerificationCode

A special type of input specifically designed for entering 2FA codes

## Example

```jsx
<VerificationCode />
```

## Props

| Prop          | Type       | Default | Description                                              |
| ------------- | ---------- | ------- | -------------------------------------------------------- |
| code          | `string`   | `''`    | If you need to assign a value externally, use this prop. |
| isValid       | `boolean`  | `true`  | Gives the field invalid stylings                         |
| numberOfChars | `number`   | `6`     | If you need more or less number of characters            |
| onEnter       | `function` | `noop`  | To get the current value on enter press                  |
| onChange      | `function` | `noop`  | To get the current value on change                       |
