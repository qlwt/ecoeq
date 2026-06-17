import { cache_schedule_set } from "#src/cache/schedule/set";
import type { CacheMap, CacheNode } from "#src/cache/type/node";

export type Cache_NodeSave_Params<
    G_CacheMap extends CacheMap, Version extends keyof G_CacheMap = keyof G_CacheMap
> = {
    [K in Version]: {
        readonly key: string

        readonly version: K
        readonly payload: G_CacheMap[K]
    }
}[Version]

export const cache_node_save = function <G_CacheMap extends CacheMap, Version extends keyof G_CacheMap = keyof G_CacheMap>(
    params: Cache_NodeSave_Params<G_CacheMap, Version>
): G_CacheMap[Version] {
    cache_schedule_set(params.key, () => JSON.stringify(
        {
            version: params.version,
            payload: params.payload,
        } satisfies CacheNode<keyof G_CacheMap, G_CacheMap[keyof G_CacheMap]>
    ))

    return params.payload
}
