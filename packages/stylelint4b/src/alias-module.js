"use strict"

/**
 * @type {Map<string, any>}
 */
const alias = new Map()
module.exports = {
    /**
     * @param {string} moduleId
     * @param {any} moduleObject
     */
    async defineAlias(moduleId, moduleObject) {
        alias.set(String(moduleId), await moduleObject)
    },
    /**
     * @param { { [moduleId: string]: any } } aliases
     */
    async defineAliases(aliases) {
        for (const moduleId of Object.keys(aliases)) {
            alias.set(String(moduleId), await aliases[moduleId])
        }
    },
    get(moduleId) {
        const m = alias.get(String(moduleId))
        if (m) {
            return m
        }
        console.error("not found module:", moduleId)
        throw new Error(`not found module: ${moduleId}`)
    },
    has(moduleId) {
        return alias.has(String(moduleId))
    },
}
