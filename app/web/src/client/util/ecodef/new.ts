import { gv } from "@eco/gstate"
import * as math from "@eco/math"

export const ecodef_new = function(session_state: gv.GVSession_Node_State): math.EcoDef {
    const loyalty = 0.1

    return {
        cst: {
            money: 100,

            greedgraph_empl_start_value: 0.9,
            greedgraph_empl_mid_value: 0.45,
            greedgraph_empl_mid_ratio: 0.5,

            greedgraph_head_start_value: 0,
            greedgraph_head_mid_value: 0.3,
            greedgraph_head_mid_ratio: 0.9,

            research_prodmul: 1.30,
            research_divisor: 100,
            research_inframul: 0,
            research_decay: 0.004,

            pop_empl: 80,
            pop_head: 20,

            need_food: 1,
            need_serv: 15,
        },

        balance: {
            loyalty,
            mil: session_state.military / 100,
            monopoly: session_state.monopoly / 100 * (1 - loyalty),
        },

        prod_serv: {
            baseinput: 0,
            baseoutput: 2.0,
            research: session_state.research_serv,
        },

        prod_food: {
            baseinput: 0,
            baseoutput: 1.2,
            research: session_state.research_food,
        },
    }
}
