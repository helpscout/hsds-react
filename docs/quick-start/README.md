# Quick start

This guide will show you how to get started with Blue!

## Installation

The first thing you'll need to do, is add Blue to your React project. This can be done by adding the [latest version](https://github.com/helpscout/hsds-react/releases) to your `package.json` file.

Or, even faster, you can run:

```
npm install @helpscout/blue --save
```

## React (v15)

Blue has a couple of `peerDependencies`:

* [`react`](https://www.npmjs.com/package/react)
* [`react-dom`](https://www.npmjs.com/package/react-dom)

Make sure you have these installed in your project.

Blue currently runs on **React version 15**. Work is being done to add compatibility with 16+. 💪

## Styles

A large portion of Blue's styles are currently being powered by [Sass](https://sass-lang.com/). To ensure Blue's components work correctly in your App, you'll need to add these styles.

### SCSS Workflows

All of the uncompiled `.scss` files are available from Blue.

You can import the single main `blue.scss` from:

```scss
@import '@helpscout/hsds-react/scss/blue.scss';
```

Or, individual `.scss` files as required:

```scss
@import '@helpscout/hsds-react/styles/components/Alert.scss';
@import '@helpscout/hsds-react/styles/components/Button.scss';
@import '@helpscout/hsds-react/styles/components/Heading.scss';
```

#### Seed

We also have certain external `.scss` styles coming from [Seed components](https://developer.helpscout.com/seed/), our SCSS design system.

Check out [Seed's guide](https://developer.helpscout.com/seed/guides/quick-start/seed-packs/#include) for setting up the correct `includePaths` for your Sass-powered project.

### CSS Workflows

Blue provides a compiled `.css` file, which can be imported from:

```js
import '@helpscout/hsds-react/css/blue.css'
```

### Future of CSS-in-Blue

We're moving towards a CSS-in-JS future, powered by [Fancy](https://github.com/helpscout/fancy), our custom CSS-in-JS solution (which uses [Emotion](https://emotion.sh/) under the hood).

Once the migration from `scss` -> CSS-in-JS is complete, you will no longer be required to import styles into your App when using Blue components.

## Next

Let's start using some [components](components.md)!
