# Emoji

This component renders an emoji image. This component is a light-weight wrapper around the `<Emoji>` component from the [emoji-mart](https://github.com/missive/emoji-mart/) library.


## Example

```jsx
<Emoji emoji={{ id: 'santa', skin: 3 }} />
<Emoji emoji=':santa::skin-tone-3:' />
<Emoji emoji='santa' set='emojione' />
```


## Props

| Prop | Required | Default | Description |
| ---- | :------: | ------- | ----------- |
| **emoji** | ✓ | | Either a string or an `emoji` object |
| **size** | | | The emoji width and height. |
| **native** | | `false` | Renders the native unicode emoji |
| **onClick** | | | Params: `(emoji, event) => {}` |
| **onLeave** | | | Params: `(emoji, event) => {}` |
| **onOver** | | | Params: `(emoji, event) => {}` |
| **set** | | `apple` | The emoji set: `'apple', 'google', 'twitter', 'emojione'` |
| **sheetSize** | | `64` | The emoji [sheet size](#sheet-sizes): `16, 20, 32, 64` |
| **backgroundImageFn** | | ```((set, sheetSize) => `https://unpkg.com/emoji-datasource@2.4.4/sheet_${set}_${sheetSize}.png`)``` | A Fn that returns that image sheet to use for emojis. Useful for avoiding a request if you have the sheet locally. |
| **skin** | | `1` | Skin color: `1, 2, 3, 4, 5, 6` |

Additional documentation can be found on [emoji-mart's README](https://github.com/missive/emoji-mart/).
