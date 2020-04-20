/* eslint-disable @mysticatea/eslint-comments/disable-enable-pair */
/* eslint-disable @mysticatea/node/no-extraneous-require */
/* eslint-disable no-invalid-this, no-param-reassign, no-shadow, require-jsdoc, consistent-return */
"use strict"

const patched = {}

function isPromise(obj) {
    return typeof obj === "object" && typeof obj.then === "function"
}

function runDocument(plugin) {
    const result = this.result
    result.lastPlugin = plugin
    const promise = result.root.nodes.map(root => {
        try {
            return plugin(root, result)
        } catch (error) {
            this.handleError(error, plugin)
            throw error
        }
    })
    if (promise.some(isPromise)) {
        return Promise.all(promise)
    }
}

function patchDocument(Document, LazyResult) {
    LazyResult = LazyResult.prototype
    const runRoot = LazyResult.run

    LazyResult.run = function run(...args) {
        return (this.result.root instanceof Document
            ? runDocument
            : runRoot
        ).apply(this, args)
    }
}

function patchNode(Node) {
    Node = Node.prototype
    const NodeToString = Node.toString
    Node.toString = function toString(stringifier) {
        return NodeToString.call(this, stringifier || this.root().source.syntax)
    }
}

function patch(Document) {
    if (Document) {
        if (patched["lazy-result"]) {
            return
        }
        patch()
        try {
            patchDocument(Document, require("postcss/lib/lazy-result"))
        } catch (_e) {
            // noop
        }
        patched["lazy-result"] = true
    } else {
        if (patched.node) {
            return
        }
        try {
            patchNode(require("postcss/lib/node"))
        } catch (_e) {
            // noop
        }
        patched.node = true
    }
}

module.exports = patch
