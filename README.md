# JobBoard OCTO

[![CircleCI](https://circleci.com/gh/octo-web-front-end-tribe/octo-job-board/tree/dev.svg?style=svg)](https://circleci.com/gh/octo-web-front-end-tribe/octo-job-board/tree/dev)

[![Coverage Status](https://coveralls.io/repos/github/octo-web-front-end-tribe/octo-job-board/badge.svg?branch=tech-add-code-coverage)](https://coveralls.io/github/octo-web-front-end-tribe/octo-job-board?branch=tech-add-code-coverage)


## Getting started

```bash
# get project sources
git clone git@github.com:octo-web-front-end-tribe/octo-job-board.git
cd octo-job-board

# install dependencies
npm install

# run tests
npm test

# build Vue.js  client for production with minification
npm run build

# start the application
npm start
```

You can run the API server independently from the client's development one.

## Server

```bash
cd server
npm start
```

## Client

```bash
cd client
npm run dev
```

## Release to production

The release to production process is as simple as running the command (from any branch):

```bash
npm run release
```
