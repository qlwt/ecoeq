import { cache_schedule_use_item } from "#src/cache/schedule/use/item";
import type { CacheMap, CacheNode } from "#src/cache/type/node";

export type Cache_NodeExtract_Result<G_CacheMap extends CacheMap> = {
    [K in keyof G_CacheMap]: CacheNode<K, G_CacheMap[K]>
}[keyof G_CacheMap]

export const cache_node_extract = function <G_CacheMap extends CacheMap>(key: string): Cache_NodeExtract_Result<G_CacheMap> | null {
    cache_schedule_use_item(key)

    const item = localStorage.getItem(key)

    if (item === null) {
        return null
    }

    try {
        return JSON.parse(item) as any
    } catch (error) {
        console.error(error)

        return null
    }
}
