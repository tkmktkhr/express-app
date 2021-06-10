### Create Docker image

image for dev mode
`docker image build --no-cache --build-arg ENVIRONMENT=dev -t <name> .`

### husky

TODO write the bellow in package.json and make it work.

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
```
