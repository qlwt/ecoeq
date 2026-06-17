import { cache_node_clear } from "#src/cache/node/clear"
import { cache_node_extract } from "#src/cache/node/extract"
import { cache_key_new_session_list } from "#src/cache/key/new/session_list"
import { cache_node_save } from "#src/cache/node/save"
import { gv_session__list_version, gv_session__list_version as gv_session__reflist_version } from "#src/gv/session/cst/version"
import type { GVSession_RefList, GVSession_RefList_CacheMap as GVSession_RefList_CacheMap } from "#src/gv/session/type/list"
import * as asc from "@qyu/atom-state-core"

export const gv_session__reflist = asc.state_atom_advanced<GVSession_RefList>(() => {
    const reflist_cache = cache_node_extract<GVSession_RefList_CacheMap>(cache_key_new_session_list())

    if (reflist_cache) {
        return {
            init: reflist_cache.payload,

            config: {
                cleanup: () => {
                    cache_node_clear(cache_key_new_session_list())
                },
            },
        }
    }

    return {
        init: cache_node_save<GVSession_RefList_CacheMap, typeof gv_session__list_version>({
            key: cache_key_new_session_list(),
            version: gv_session__reflist_version,
            payload: [],
        }),

        config: {
            cleanup: () => {
                cache_node_clear(cache_key_new_session_list())
            },
        },
    }
})
