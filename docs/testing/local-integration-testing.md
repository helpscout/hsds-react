# Local Integration Testing

In this guide, we'll walk through how you can integrate your new HSDS: React updates with local projects.

## Creating a beta build

The simplest way to do this is to create a new beta build for HSDS: React.

To do this, run this command:

```
npm run release:beta
```

You'll be prompted to select a version to upgrade to.

Note: The version numbers (below) may be different when you run this.

```
? Select semver increment or specify new version (Use arrow keys)
❯ patch         2.6.8
  minor         2.7.0
  major         3.0.0
  prepatch      2.6.8-0
  preminor      2.7.0-0
  premajor      3.0.0-0
  prerelease    2.6.8-0
  ──────────────
  Other (specify)
```

### Other (specify)

It is recommended that you select the `Other (specify)` option. This allows you to create a (unique) namespaced release.

From the above example, you'll be asked to specify your own version after selecting `Other (specify)`:

```
? Select semver increment or specify new version Other (specify)
? Version
```

For this guide, we'll enter in `2.6.8-hello-0`:

```
? Select semver increment or specify new version Other (specify)
? Version 2.6.8-hello-0
```

Next, you'll be asked to specify the tag for your release.

Note: This list (below) may be different when you run this.

```
? How should this pre-release version be tagged in npm? (Use arrow keys)
❯ next
  new-blue
  ──────────────
  Other (specify)
```

You can either select `next` (if you're confident this release will be 👍). If not, or if you want to release under a custom tag, select `Other (specify)`.

For this example, we'll release under a custom tag of `hello`:

```
? Select semver increment or specify new version Other (specify)
? Version 2.6.8-hello-0
? How should this pre-release version be tagged in npm? Other (specify)
? Tag hello
```

Congrats! You just created a custom beta release!

### Prepatching

To easiest thing to do would be to select `prepatch`. From the above example, you'll be asked to confirm after selecting `prepatch`:

```
Will bump from 2.6.7 to 2.6.8-0 and tag this release in npm as beta. Continue? (Y/n)
```

Press `Enter`, or type `Y` + `Enter`.

Congrats! You just created a prepatch beta release!

### Integration with local development

Awesome! We just released a custom beta build with the version `@helpscout/hsds-react@v2.6-8-hello-0.

To test it out in your local development project, simply version bump the `@helpscout/hsds-react` version in your project's `package.json`.

```
"@helpscout/hsds-react": "2.6.7" -> "2.6-8-hello-0"
```

And that's it 🙏! You've successfully integrated your newly custom beta build with your local project.

### (Beta) Build and repeat

Feel free to create new beta builds as needed! Repeat the steps above until you're confident the update is ready for prime time!

### What about `npm link`?

Unfortunately, setting up `npm link` with this project is (very) tedious and slow. We've explored various ways to automate the linking process. The results were inconsistent and very slow.

As of this moment, it's actually much more efficient to create and release beta builds.
