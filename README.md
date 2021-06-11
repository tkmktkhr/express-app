### Docker Container

Build image for dev mode
`docker image build --no-cache --build-arg ENVIRONMENT=dev -t <name:tag> .`

Start container
`docker container run -p <local-port>:3030 <image:tag>`

### husky

TODO write the bellow in package.json and make it work.

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
```
