# Lighthouse tokens

Design tokens exported from Figma, built into platform code with [Style Dictionary](https://styledictionary.com) v4.

- `tokens/semantic.colors/light.tokens.json` and `dark.tokens.json` are the Figma exports for each mode. They must contain the same tokens.
- The build generates `build/ios-swift/LighthouseColor.swift`. Each colour there is a single SwiftUI `Color` that switches between its light and dark value with the system appearance.

Only colour tokens are built for now. The number tokens (radius, spacing, stroke, opacity, blur) are ignored.

## Build

No install needed beyond Node:

```bash
npx style-dictionary@4.4.0 build --config config.mjs
```

## How it works

`config.mjs` only declares the build. The custom hooks live in `style-dictionary/`, one per file:

| Hook | File | What it does |
|---|---|---|
| Preprocessor | `preprocessors/attach-dark.mjs` | Copies each colour's dark value from `dark.tokens.json` onto the light token. Fails the build if one is missing. |
| Name transform | `transforms/name-color-camel.mjs` | `Color/Background/Base/Primary` → `backgroundBasePrimary` |
| Value transform | `transforms/color-swiftui-dynamic.mjs` | Builds `Color(light: UIColor(…), dark: UIColor(…))` from the two values |
| Format | `formats/swiftui-enum.mjs` | Writes the `LighthouseColor` enum and the `Color(light:dark:)` initialiser |

## Sync

On every push to `main` that changes the tokens or the build, `.github/workflows/sync-colours.yml` rebuilds the colours and opens a pull request in `lighthouse-ios`.
