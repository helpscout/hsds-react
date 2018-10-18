# Publishing a release

In this guide, we'll walk through publishing for our [newly merged](review.md) [custom `Strong` component](creating.md) to [npm](https://www.npmjs.com/package/@helpscout/blue).

## Log in

To publish to npm, you **must** have [maintainer access](https://docs.npmjs.com/cli/owner) to the [@helpscout/blue](https://www.npmjs.com/package/@helpscout/blue) package.

## Publish!

Make sure you're on the latest `master` branch.

Install all the dependencies by running:

```
npm install
```

Once you're ready, run the following command:

```
npm run release
```

This will kick of Blue's automated release scripts, powered by [np](https://github.com/sindresorhus/np).

![Release prompt by np](https://github.com/sindresorhus/np/raw/master/screenshot-ui.png)

Select what kind of release you would like to do:

* patch
* minor
* major

Our `Strong` component doesn't affect anything, and should be a non-breaking enhancement to the library. Let's select `patch` and hit `Enter`.

Once you do, `np` will:

* Run the linter
* Run all Jest tests
* Build/bundle `.js` files
* Build/bunlde `.css`/`.js` files
* Semver bump the `git` Tag
* Semver bump the `version` in `package.json`
* Publish to `npm`
* Push newest version to Github

(😻 `np` is amazing)

## Release notes

Blue is very transparent with it's [release notes](https://github.com/helpscout/blue/releases). `np` should have automatically created a new version on Github. Edit that version with the appropriate descriptions/screenshots.

Pro Tip: If your pull request description is thorough. You can just copy/paste it as the release notes 😎.

## High five

🙌 Yay! We did it. We walked throug the entire process of creating a component to publishing it on npm.

Thank you so much for sticking through this guide.

Hope you have a fantastic day ❤️!

## See also

* [npm](https://www.npmjs.com/)
* [@helpscout/blue](https://www.npmjs.com/package/@helpscout/blue)
* [np](https://github.com/sindresorhus/np)
* [Release notes](https://github.com/helpscout/blue/releases)
