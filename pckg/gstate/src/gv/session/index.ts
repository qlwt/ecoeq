import { gv_session__act_delete } from "#src/gv/session/act/delete";
import { gv_session__act_patch } from "#src/gv/session/act/patch";
// import { gv_session__act_patch_graph_post } from "#src/gv/session/act/patch_graph_post";
// import { gv_session__act_patch_graph_slice } from "#src/gv/session/act/patch_graph_slice";
import { gv_session__act_patch_state } from "#src/gv/session/act/patch_state";
import { gv_session__act_post } from "#src/gv/session/act/post";
import { gv_session__list_version, gv_session__node_version } from "#src/gv/session/cst/version";
import { gv_session__reflist } from "#src/gv/session/state/reflist";
import { gv_session__register } from "#src/gv/session/state/register";

export const gv_session = {
    state: {
        reflist: gv_session__reflist,
        register: gv_session__register,
    },

    act: {
        post: gv_session__act_post,
        patch: gv_session__act_patch,
        delete: gv_session__act_delete,
        patch_state: gv_session__act_patch_state,
        // patch_graph_post: gv_session__act_patch_graph_post,
        // patch_graph_slice: gv_session__act_patch_graph_slice,
    },

    cst: {
        list_version: gv_session__list_version,
        node_version: gv_session__node_version,
    },
} as const
