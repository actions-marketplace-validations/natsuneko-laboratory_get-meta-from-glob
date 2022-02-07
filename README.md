# @natsuneko-laboratory/get-meta-from-glob

Create Unity's meta collections from glob patterns.

## Usage

```yaml
job:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: natsuneko-laboratory/get-meta-from-glob@v1
        with:
          patterns:
            - "NatsunekoLaboratory/SampleProject/**/*.cs"
            - "NatsunekoLaboratory/SampleProject/**/*.asmdef"
          output: ./meta
```

## License

MIT by [Natsune - @6jz](https://twitter.com/6jz)
