![](https://ddwva799xzrph.cloudfront.net/items/110k3c0l3v183J3J0g2I/hsds-logo-readme.png)

# HSDS: React

[![Build Status](https://travis-ci.org/helpscout/hsds-react.svg?branch=master)](https://travis-ci.org/helpscout/hsds-react)
[![Coverage Status](https://coveralls.io/repos/github/helpscout/hsds-react/badge.svg?branch=master)](https://coveralls.io/github/helpscout/hsds-react?branch=master)
[![npm version](https://badge.fury.io/js/%40helpscout%2Fhsds-react.svg)](https://badge.fury.io/js/%40helpscout%2Fhsds-react)
![node](https://img.shields.io/badge/node-12.13.0-blue.svg)
![npm](https://img.shields.io/badge/npm-6.12.0-blue.svg)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

React components for Help Scout's Design System

## Live Demo

Check out HSDS's Storybook: [https://hsds.helpscout.com/](https://hsds.helpscout.com/).

## Install

```
npm install @helpscout/hsds-react --save
```

## Getting Started

After cloning this repo down, run:

```
npm install
```

Once everything is installed, run:

```
npm start
```

Check out HSDS's Storybook at http://localhost:8900/ in your browser!

## SVG Adapter

As of v2.18.0, the `svg` set is opt-in. This was done to reduce the compiled bundle size. To load the `svg` icons, add the appropriate adapter to your app.

It is recommended that the adapter be loaded somewhere within your main entry point (e.g. `src/index.js`).

```js
// src/index.js
// For a lighter-weight svg set for embeddables
import '@helpscout/hsds-react/adapters/embed'
// For the complete svg set
import '@helpscout/hsds-react/adapters/app'
```

Note: This loads all the `svg` images, including [`Icon`](./src/components/Icon) and [`Illo`](./src/components/Illo).

## Testing

To run Jest in watch mode, run:

```
npm run dev
```

To execute all the tests (with Coverage reporting), run:

```
npm run test
```

## Publishing

### Merging a PR

To merge a PR when the release is completed, please do a _Squash and merge_ from the PR page. It will keep the history clean in the master branch

We tend to do a release with only one PR at the time, _if possible_

### Releasing on NPM

You can learn more about [releasing master](https://helpscout.gitbook.io/hsds-react/contributing/release) or [releasing a beta build](https://helpscout.gitbook.io/hsds-react/testing/local-integration-testing)

To publish and release a new version of HSDS, run the following command:

```
npm run release
```

You'll be presented with a CLI prompt with options.
Pick the one you want, and that's it! The script will take care of the rest (from testing to publishing).

## Deploying Storybook

To deploy the Storybook, run the following command:

```
npm run deploy
```

## Learning

- HSDS documentation: [https://hsds.helpscout.com/](https://hsds.helpscout.com/)
- Developer in-depth documentation: [dev docs](./docs/README.md)
- Also, check out our [videos](./VIDEOS.md) for more learning resources

## Blue?

On Nov 8, 2018, we rebranded Blue to HSDS: React :tada:.

The original [Blue](https://www.npmjs.com/package/@helpscout/blue) library will still exist on npm, and is still installable via:

```
npm install @helpscout/blue --save
```

However, continued development of this component library will continue under HSDS: React, which is installable via:

```
npm install @helpscout/hsds-react --save
```

A big thanks to all the folks involved in Blue! Blue will always be your boy :blue_heart: .
