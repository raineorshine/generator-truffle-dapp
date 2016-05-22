# <%=project%>

## Development

### Setup

Complete all steps below, skipping those that are already installed. This is a one-time event. All setup is for OSX and steps may be different for other operating systems.

1. Install [homebrew](http://brew.sh/).
1. Install [geth](https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac): `brew update && brew upgrade && brew tap ethereum/ethereum && brew install ethereum`
1. Install [node](https://nodejs.org).
1. Install testrpc: `npm install -g ethereumjs-testrpc`
1. Install truffle: `npm install -g truffle`
1. *Clone this repo: `git clone https://github.com/<%=username%>/<%=project%>`
1. **Install local dependencies: `npm install`

**You will have to run `npm install` after a pull if any new dependencies have been added to package.json. You will know pretty quickly if this is the case because you will get a "Cannot find module" error when you run the tests.

### Usage

Run each of the following commands in separate shells and keep them running for development:

```
$ testrpc
$ npm run watch
```

### Truffle

The project follows truffle's workflow as much as possible. As such you
have the typical truffle commands:

```
$ truffle build
$ truffle console
$ truffle deploy
$ truffle serve
$ truffle test
$ truffle watch
```

### npm scripts

The project uses [npm](https://npmjs.org) [scripts](https://docs.npmjs.com/misc/scripts) for non-truffle build tasks. npm is automatically installed with [node](https://nodejs.org). You can enter `npm run` in a shell to see a list of the available npm scripts (which are stored in package.json). Enter `npm run SCRIPT_NAME` to run the specified script. eg. `npm run watch`.

#### Scripts

Watch the contract and test files and run `truffle test` whenever they change:

Note: To ease development, linting is enabled but does not *block* the task. Look for `> standard` at the beginning of the test output and ensure that there are no linting errors prior to committing.

```
$ npm run watch
```

### Directory structure

`/app` contains the web front-end
`/contracts` contains the Solidity smart contract code
`/environments` contains configurations and build outputs for development, production, staging, and test
`/node_modules` contains installed npm modules (ignored)
`/test` contains contract tests in javascript

### Troubleshooting

- `Error: VM Exception while executing transaction: invalid JUMP`

  This indicates that a throw statement was executed in a transaction.

- `Error: new BigNumber() not a number: [object Object]`

  Wrong parameters are being passed to a contract function.

- `Error: sender doesn't have enough funds to send tx. The upfront cost is: 3141592 and the senders account only has: 0`

  The testrpc account is out of ether. Restart testrpc.

- Unexplained failure of multiple unit tests

  This happens rarely and goes away if you immediately run the test again. It might a race condition where something should be `then`'d that isn't, so occasionally a necessary precondition is executed after a transaction instead of before.

- `Cannot find module: X`

  A new dependency was probably added to the package.json when you pulled the latest code down from the repo. Run `npm install` in the project root to install it. If this does not fix the problem, it is possible that the commit author forgot to add it to the package.json. In that case you can run `npm install --save MissingModuleName` wich will install it and add it to the package.json.
