![Elsewhen](./docs/images/saucepan-lg.png)

# React Redux Saucepan

[![Build Status](https://img.shields.io/travis/elsewhencode/react-redux-saucepan.svg?style=flat-square)](https://travis-ci.org/elsewhencode/react-redux-saucepan) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

[![dependencies Status](https://david-dm.org/elsewhencode/react-redux-saucepan/status.svg?style=flat-square)](https://david-dm.org/elsewhencode/react-redux-saucepan)  [![devDependencies Status](https://david-dm.org/elsewhencode/react-redux-saucepan/dev-status.svg?style=flat-square)](https://david-dm.org/elsewhencode/react-redux-saucepan?type=dev)

[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

> A minimal Universal React redux JS stack using [Flow](http://flowtype.org), with hot reloading, linting and serverside renderring.

This is a universal react project. It provides serverside rendering and uses Flow syntax. We put together React Redux Saucepan here at [elsewhen](http://elsewhen.co), and included the things you most likely need and ake out the things you may not want. We also do our best to keep this maintained and updated. Posting any issues, questions, suggestions and PRs are more than welcome :).

## What's inside
![What's inside](/docs/images/dispenser.png)


[react 16](https://github.com/facebook/react)

[react-router 4](https://github.com/ReactTraining/react-router)

[react-redux 4](https://github.com/reduxjs/react-redux)

[redux 4](https://github.com/reduxjs/redux)

[webpack 4](https://github.com/webpack/webpack)

[express 4](https://expressjs.com/)

[react-hot-loader 4](https://github.com/gaearon/react-hot-loader)

[flow](https://flow.org/)

[prettier](https://github.com/prettier/prettier)

[styled-components](https://github.com/styled-components/styled-components)

[eslint](https://github.com/eslint/eslint)

[stylelint](https://github.com/stylelint/stylelint)

[babel(env)](https://github.com/babel/babel/tree/master/packages/babel-preset-env)


## Quick start
![Getting started](/docs/images/install.png)

First make sure you have at least node 8, and we recommend using npm 6

- Clone the repo, 

```shell
git clone  https://github.com/elsewhencode/react-redux-saucepan
```

- Then enter the folder `react-redux-saucepan`

```shell
cd react-redux-saucepan
```

- Install the dependencies

```shell
npm i
```

- Start developing, or...

```shell
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Commands
![Commands](/docs/images/console.png)

- To build for production and start the server (includes Flow and Lint check in webpack build):

```shell
npm start
```

- To only build in production (it dumps the files in `dist` folder):

```shell
npm run build
```

- To start in develop with hot reloading (includes babel-watch for server-side code changes):

```shell
npm run start:dev
```

- To run a type check and a flow coverage report:

```shell
npm run flow
```

- To check code style (for both stylelint and eslint):

```shell
npm run lint
```

- Runs the tests (if there is any)

```shell
npm test
```

## Project Structure
![Project Structure](/docs/images/folders.png)


```
.
├── dist
|   
├── docs
|
├── flow-typed
|
├── scripts
|   ├── webpack.client.js
|   ├── webpack.dev.js
|   └── webpack.server.js
|
├── src
|   ├── client
|   |   └── ...
|   |
|   ├── server
|   |   └── ...
|   |
|   ├── shared
|   |   ├── api
|   |   |   └── ...
|   |   |
|   |   ├── components
|   |   |   └── ...
|   |   |    
|   |   └── pages
|   |       └── ...
|   |
|   └── util
|
└──  static
```

### So, what is `client`,`server` and `shared` folders?
Work in progress...


### Why reducers and containers are in pages?
Work in progress...

## Developing
![Developing](/docs/images/development.png)

When runing in development mode, there will be an express file: `./src/server/index.dev.js` that serves you. It will consume your dev webpack config in `./scripts/webpack.dev.js` using [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware). It will throw an empty html file (`./src/server/html.js`) which initiates the react app on browser (there is no serverside rendering in dev mode). This is the same html file that gets used in production, so you an have the same meta, favicon etc.. . Instead of using node to run `index.dev.js` we use [babel-watch](https://github.com/kmagiera/babel-watch). This enables you to use latest JS syntax on the server and watch for any changes and reload it if necessary.

There is hot reloading avialable to make development easier for you. Eslint, flow and stylelint are also checked on the fly as you add new code to the project. `./scripts/webpack.dev.js` sets the global `__DEVELOPMENT__` to `true` which you can use in your code.

To run the app in development mode, simply run:
You can build the app by runing:

```shell
npm run build
```

## Building for production
![production](/docs/images/production.png)

Build is done done by webpack for both server-side and client-side. Out put is set to `./dist` folder which is Webpack's default output directory. The process includes Flow type checking, linting, and transpiling for both client and server. You can find webpack configs in `./scripts` folder. 

Transpiling is set in `.browserslistrc` using [browserslist](https://github.com/browserslist/browserslist) for your target browsers and done by [babel-env](https://babeljs.io/docs/plugins/preset-env/). 

There are global variables  set to help you check whether you're on client or server in the runtime: `__CLIENT__` and `__SERVER__`. Also both client and server webpack configs will set `__PRODUCTION__` global to `true` and `__DEVELOPMENT__` to `false`.

You can build the app by runing:
```shell
npm run build
```

the you can run the app by runing:
```shell
node dist/index.js 
```

`build` script is also set as a prestart for starting the app in production mode. So you can run above steps at once:
```shell
npm start
```

## Configuration

Values that can set by developer are `WEB_PORT`, and `HOST` that can be set in a `.env` file which is read by `./config.js` and then used across the app.

## Tests
![Tests](/docs/images/testing.png)

We havn't written any test yet and it's in our todo list is in our to do list. 🙈

```shell
npm test
```

## Project guidelines
![Project guidelines](/docs/images/project-guidelines.png)

We try to follow our [Javascript project guidelines](https://github.com/elsewhencode/project-guidelines) as much as we can, but we also like to keep this app quite minimal. You will find most of the Elsewhen's project guidelines in the tools we use and the way folders are structures, as well as naming, linting and chosen dependencies.

## Code style and linting
![code style](/docs/images/code-style.png)

This project uses [Airbnb's javascript style guide](https://github.com/airbnb/javascript) for Javascript syntax and `flowtype/recommended` for Flow syntax using `eslint-plugin-flowtype`.

For styles we use [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) which is checked by [Stylelint](https://stylelint.io/). This checks your style-components code using [stylelint-processor-styled-components](https://github.com/styled-components/stylelint-processor-styled-components).

You can check your code style by simply runing:

```shell
npm run lint
```


## Api
![Project guidelines](/docs/images/api.png)

React Redux Saucepan uses [Github rest api](https://developer.github.com/v3/) to represent some sample data. You can find the requests done by [axios](https://github.com/axios/axios) in `./src/shared/api/index.js`. Api calls are made in both client and server side (to include the data in serverside rendered markup).


## License

React Redux Saucepan is open source software [licensed as MIT](https://github.com/elsewhencode/react-redux-saucepan/blob/master/LICENSE).
