# @natsuneko-laboratory/get-meta-from-glob

Create Unity's meta collections from glob patterns.

## Usage

```yaml
name: "Release by Tag"

on:
  push:
    tags:
      - v\d+\.\d+\.\d+
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          lfs: true

      - uses: natsuneko-laboratory/get-meta-from-glob@main
        with:
          patterns: |
            Assets/NatsunekoLaboratory/RefinedAnimationProperty/**/*.*
          output: ./MetaList

      - run: |
          mkdir ./dist

      - uses: natsuneko-laboratory/create-unitypackage@main
        with:
          meta: ./MetaList
          output: dist/RefinedAnimationProperty.unitypackage

      - uses: actions/upload-artifact@v2
        with:
          name: RefinedAnimationProperty.unitypackage
          path: dist/RefinedAnimationProperty.unitypackage
```

## Properties

| Property   | Type   | Required          | Description                         |
| ---------- | ------ | ----------------- | ----------------------------------- |
| `patterns` | string | Yes               | Glob patterns, one pattern per line |
| `root`     | string | No (default: `.`) | Root directory                      |
| `output`   | string | Yes               | Output filepath                     |

## License

MIT by [Natsune - @6jz](https://twitter.com/6jz)
