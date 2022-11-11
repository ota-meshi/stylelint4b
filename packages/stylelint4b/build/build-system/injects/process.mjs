// eslint-disable-next-line no-shadow
export const process = buildProxy(
    {
        platform: "",
        env: buildProxy({}, "process.env"),
        cwd() {
            return ""
        },
    },
    "process",
)

/** Build proxy object */
function buildProxy(object, path) {
    return new Proxy(object, {
        get(_target, name) {
            if (name in object) {
                return object[name]
            }
            console.log(`Access ${path}.${name}`)
            return undefined
        },
    })
}
