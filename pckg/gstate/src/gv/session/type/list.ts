import { gv_session__list_version } from "#src/gv/session/cst/version"
import type { GVSession_Index } from "#src/gv/session/type/node"

export type GVSession_RefList = (
    readonly GVSession_Index[]
)

export type GVSession_RefList_CacheMap = (
    & {
    }
    & {
        [K in typeof gv_session__list_version]: GVSession_RefList
    }
)
