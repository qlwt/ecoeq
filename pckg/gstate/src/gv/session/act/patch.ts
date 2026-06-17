import { cache_key_new_session_node } from "#src/cache/key/new/session_node"
import { cache_node_save } from "#src/cache/node/save"
import { gv_session__node_version } from "#src/gv/session/cst/version"
import { gv_session__register } from "#src/gv/session/state/register"
import type { GVSession_Index, GVSession_Node, GVSession_Node_CacheMap } from "#src/gv/session/type/node"
import * as asc from "@qyu/atom-state-core"

export type GVSession_ActPatch_Params = {
    readonly index: GVSession_Index
    readonly body: Partial<Omit<GVSession_Node, "id">>
}

export const gv_session__act_patch = function(params: GVSession_ActPatch_Params): asc.Action_Atom {
    return ({ reg }) => {
        const session = reg(gv_session__register).reg(params.index)
        const session_now = session.output()

        session.input(cache_node_save<GVSession_Node_CacheMap, typeof gv_session__node_version>({
            key: cache_key_new_session_node(params.index),
            version: gv_session__node_version,

            payload: {
                ...session_now,
                ...params.body,
            },
        }))
    }
}
