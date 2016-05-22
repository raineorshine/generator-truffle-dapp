/* global web3, contract, describe, it, assert */

import { resultEquals as equals, assertAuth } from './helpers/util.js'
import { pipe, test } from 'ramda'
const waterfall = require('promise.waterfall')

describe('MyContract', () => {
  describe('Constructor', () => {
    contract('MyContract', accounts => {
      it('should be owned by the sender', () => {
        return MyContract.deployed().owner.call().then(equals(web3.eth.accounts[0]))
      })
    })
  })
})
