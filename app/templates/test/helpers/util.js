/** A library with helpers for testing contracts. */
/* global web3, assert */

import { curry, equals, pipe, reject } from 'ramda'

/** Creates a function that asserts false with the given message. */
const assertFalse = msg => () => assert(false, msg)

/** Makes asserting the results of transactions easier. */
const assertResult = assertion => result => assertion(result.valueOf())
const assertResultString = assertion => result => assertion(web3.toUtf8(result.valueOf()))

/** Asserts that the given transaction threw */
export const assertThrow = promisedTransaction => {
  const falseSucceedMessage = 'Expected transaction to fail but it succeeded.'
  return promisedTransaction
    .then(assertFalse(falseSucceedMessage))
    .catch(err => {
      // not the most elegant, but we need to rethrow if we caught the assertFalse from above
      if (err.message === falseSucceedMessage) {
        throw err
      } else if (!(/invalid JUMP/.test(err.message))) {
        throw new Error('Expected transaction to throw an "invalid JUMP" error. Instead got: ' + err.message)
      }

      // otherwise we got the "invalid JUMP" that we expected, so the error is caught and the assertion passes
    })
}

/**
 * Returns a function that asserts that the value of the given call result is equal to the given value. Best explained by usage (see example).
 * @example swap.owner.call(owner).then(equals(owner))
 */
export const resultEquals = (value, msg) => assertResult(resultValue => assert.equal(resultValue, value, msg))

export const stringEquals = (value, msg) => assertResultString(resultValue => assert.equal(resultValue, value, msg))

/**
 * Sends a transaction and asserts that only the given address is authorized
 * @param accounts A list of accounts to test as senders of the transaction.
 * @param authorizedAccount The only account that should be authorized to send the transaction.
 * @param contractFunction A partially applied contract function whose only remaining parameter is the sender account. e.g. account => Swap.deployed().Offer(1e12, 1e18, 360, 0, 1, { from: account })
 */
export const assertAuth = curry((accounts, authorizedAccount, contractFunction) => {
  const unauthorizedAccounts = reject(equals(authorizedAccount), accounts)
  // run the contractFunction with each of the unauthorized accounts and assert that each throws
  const unauthorizedAssertions = Promise.all(unauthorizedAccounts.map(pipe(contractFunction, assertThrow)))
  // run the contract function on the authorized account (implied positive assertion)
  const authorizedAssertion = contractFunction(authorizedAccount)

  // return a promise that all the unauthorized accounts failed and the authorized account succeeded
  return Promise.all([ unauthorizedAssertions, authorizedAssertion ])
})
