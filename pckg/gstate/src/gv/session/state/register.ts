import { cache_key_new_session_node } from "#src/cache/key/new/session_node"
import { cache_node_clear } from "#src/cache/node/clear"
import { cache_node_extract } from "#src/cache/node/extract"
import { cache_node_save } from "#src/cache/node/save"
import { gv_session__node_version } from "#src/gv/session/cst/version"
import type { GVSession_Index, GVSession_Node, GVSession_Node_CacheMap } from "#src/gv/session/type/node"
import * as asc from "@qyu/atom-state-core"

const color_list = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#9B59B6",
    "#1ABC9C",
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#E67E22",
    "#34495E",
    "#95A5A6",
] as const

const color_new = function(): string {
    const color_pool = color_list

    return color_pool[Math.trunc(Math.random() * color_pool.length)]!
}

const name_list = [
    "Feudalism",
    "Mercantilism",
    "Mixed Economy",
    "Market Economy",
    "Command Economy",
    "Guild Economy",
    "Distributism",
    "Georgism",
    "Mutualism",
    "Anarcho Capitalism",
    "Liberal Communism",
    "Restrictionism",
    "Distributed Socialism",
    "Industrialism",
    "Globalised Meritocracy",
    "Extractionism",
    "Libertarian Autarky",
    "Electoral Ownership",
    "Anarcho-Guildism",
    "Red Georgism",
    "Command Reiganomics",
] as const

const name_new = function(): string {
    const name_pool = name_list

    return name_pool[Math.trunc(Math.random() * name_pool.length)]!
}

export const gv_session__register = asc.family_atom_hash(({ reg }) => ({
    key: (index: GVSession_Index) => index.id,

    get: (index: GVSession_Index) => {
        return asc.state_atom_advanced<GVSession_Node>(() => {
            const node_cache = cache_node_extract<GVSession_Node_CacheMap>(
                cache_key_new_session_node(index)
            )

            if (node_cache !== null) {
                if (node_cache.version === gv_session__node_version) {
                    return {
                        init: node_cache.payload,

                        config: {
                            cleanup: () => {
                                cache_node_clear(cache_key_new_session_node(index))
                            },
                        },
                    }
                }
            }

            return {
                init: cache_node_save<GVSession_Node_CacheMap, typeof gv_session__node_version>({
                    key: cache_key_new_session_node(index),
                    version: gv_session__node_version,

                    payload: {
                        id: index.id,
                        name: name_new(),
                        bgc: color_new(),
                        // graph: [],
                        // graph_offset: 0,

                        state: {
                            monopoly: 70,
                            military: 25,
                            research_food: 0,
                            research_serv: 0,
                        },
                    }
                }),

                config: {
                    cleanup: () => {
                        cache_node_clear(cache_key_new_session_node(index))
                    },
                },
            }
        })
    },
}))
