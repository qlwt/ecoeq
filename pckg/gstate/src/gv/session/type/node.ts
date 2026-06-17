import type { gv_session__node_version } from "#src/gv/session/cst/version"

export type GVSession_Index = {
    readonly id: string
}

export type GVSession_Node_State = {
    readonly monopoly: number
    readonly military: number
    readonly research_food: number
    readonly research_serv: number
}

export type GVSession_Node_Point = {
    readonly state: GVSession_Node_State
}

export type GVSession_Node = {
    readonly id: string
    readonly bgc: string
    readonly name: string
    readonly state: GVSession_Node_State
    // readonly graph_offset: number
    // readonly graph: readonly GVSession_Node_Point[]
}

export type GVSession_Node_CacheMap = (
    & {
        [K in typeof gv_session__node_version]: GVSession_Node
    }
)
