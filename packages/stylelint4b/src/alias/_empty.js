"use strict"

module.exports = new Proxy(
    {},
    {
        get(_target, name) {
            console.log(`Access: ${name}`)
            return undefined
        },
    },
)
