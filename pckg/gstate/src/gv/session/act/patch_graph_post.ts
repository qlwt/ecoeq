// import { cache_key_new_session_node } from "#src/cache/key/new/session_node"
// import { cache_node_save } from "#src/cache/node/save"
// import { gv_session__node_version } from "#src/gv/session/cst/version"
// import { gv_session__register } from "#src/gv/session/state/register"
// import type { GVSession_Index, GVSession_Node_CacheMap, GVSession_Node_Point } from "#src/gv/session/type/node"
// import * as asc from "@qyu/atom-state-core"
//
// export type GVSession_ActPatchGraphPost_Params = {
//     readonly index: GVSession_Index
//     readonly point: GVSession_Node_Point
// }
//
// export const gv_session__act_patch_graph_post = function(params: GVSession_ActPatchGraphPost_Params): asc.Action_Atom {
//     return ({ reg }) => {
//         const session = reg(gv_session__register).reg(params.index)
//         const session_now = session.output()
//
//         let graph: readonly GVSession_Node_Point[]
//         let graph_offset = session_now.graph_offset
//
//         if (session_now.graph.length >= 1000) {
//             const l_graph = session_now.graph.slice(1)
//
//             l_graph.push(params.point)
//
//             graph = l_graph
//             graph_offset += 1
//         } else {
//             graph = [...session_now.graph, params.point]
//         }
//
//         session.input(cache_node_save<GVSession_Node_CacheMap, typeof gv_session__node_version>({
//             key: cache_key_new_session_node(params.index),
//             version: gv_session__node_version,
//
//             payload: {
//                 ...session_now,
//
//                 graph,
//                 graph_offset,
//             },
//         }))
//     }
// }
