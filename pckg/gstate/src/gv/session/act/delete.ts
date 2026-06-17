import { cache_key_new_session_list } from "#src/cache/key/new/session_list"
import { cache_node_save } from "#src/cache/node/save"
import { gv_session__list_version } from "#src/gv/session/cst/version"
import { gv_session__reflist } from "#src/gv/session/state/reflist"
import { gv_session__register } from "#src/gv/session/state/register"
import type { GVSession_RefList_CacheMap } from "#src/gv/session/type/list"
import type { GVSession_Index } from "#src/gv/session/type/node"
import * as asc from "@qyu/atom-state-core"
import * as sc from "@qyu/signal-core"

export type GVSession_ActDelete_Params = {
    readonly index_list: readonly GVSession_Index[]
}

export const gv_session__act_delete = function(params: GVSession_ActDelete_Params): asc.Action_Atom {
    return ({ reg }) => {
        sc.batcher.batch_sync(() => {
            const list = reg(gv_session__reflist)
            const register = reg(gv_session__register)

            list.input(cache_node_save<GVSession_RefList_CacheMap>({
                key: cache_key_new_session_list(),
                version: gv_session__list_version,

                payload: list.output().filter(index => {
                    return !params.index_list.some(param_index => param_index.id === index.id)
                })
            }))

            params.index_list.forEach(index => {
                register.delete(register.key(index))
            })
        })
    }
}
