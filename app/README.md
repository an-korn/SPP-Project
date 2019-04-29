*This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app) and uses [Next.js](https://github.com/zeit/next.js) so, to fully understand how it works, check these repos.*

## Table of Content

* [Development](#development)
* [Code](#code)

## Development

* Adjust environment variables

  We get all environment variables from `.env.local` file. To get list of all variables check them in `.env.sample`.

* Start

  ```
  yarn start
  ```

* Test

  ```
  yarn test
  ```

* Lint

  ```
  yarn lint:[ js | styles | componentNames | fileNames ]
  ```

## Code

### Structure

```
/config

/src
  /actions            - Assembly of all actions
  /collections
    /CollectionName   - Actions, reducer, sagas, requests

    index.js          - Export of `reducers` and `sagas`
    store.js          - Export of `configureStore`

  /components
    /ComponentName
      index.js

  /containers
    /ContainerName
      index.js

  /forms
    /FormName
      index.js

  /lib                - Aliases for common operations
  /helpers            - Helpers for common operations

  /pages

  /static             - Files which will be public
```
