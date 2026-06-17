import type { GVSession_Index } from "#src/gv"

export const cache_key_new_session_node = function (index: GVSession_Index): string {
    return `gv_session__node::${index.id}`
}
