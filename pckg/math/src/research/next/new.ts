import { research_distr_new } from "#src/research/distr/new"
import type { EcoDef } from "#src/type/ecodef"
import type { WFEco } from "#src/wf/new/eco"

export type Research_Next = {
    readonly food: number
    readonly serv: number
}

export const research_next_new = function (eco: EcoDef, wf_eco: WFEco): Research_Next {
    const research_distr = research_distr_new(eco, wf_eco)

    return {
        food: eco.prod_food.research * (1 - eco.cst.research_decay) + research_distr.food,
        serv: eco.prod_serv.research * (1 - eco.cst.research_decay) + research_distr.serv,
    }
}
