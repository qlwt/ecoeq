export type CacheNode<Version, Payload> = {
    readonly version: Version
    readonly payload: Payload
}

export type CacheMap = {
    [K in number]: any
}
