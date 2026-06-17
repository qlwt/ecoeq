import { research_eq_new_food } from "#src/research/eq/new/food";
import { research_eq_new_serv } from "#src/research/eq/new/serv";
import type { EcoDef } from "#src/type/ecodef";
import type { WFEco } from "#src/wf/new/eco";

export type ResearchDistribution = {
    readonly food: number
    readonly serv: number
}

export const research_distr_new = function(eco: EcoDef, wf_eco: WFEco): ResearchDistribution {
    const eq_food = research_eq_new_food(eco)
    const eq_serv = research_eq_new_serv(eco)

    const dir_food = Math.sign(eq_food - eco.prod_food.research)
    const dir_serv = Math.sign(eq_serv - eco.prod_serv.research)

    const wf_head_industry = wf_eco.head.food_industry + wf_eco.head.serv_industry

    const res_head_food = Math.min(
        Math.abs(eq_food - eco.prod_food.research),
        wf_eco.head.research * (wf_eco.head.food_industry / wf_head_industry)
    )

    const res_head_serv = wf_eco.head.research - res_head_food

    const wf_empl_industry = wf_eco.empl.food_industry + wf_eco.empl.serv_industry

    const res_empl_food = Math.min(
        Math.abs(eq_food - eco.prod_food.research) - res_head_food,
        wf_eco.empl.research * (wf_eco.empl.food_industry / wf_empl_industry)
    )

    const res_empl_serv = wf_eco.empl.research - res_empl_food

    return {
        food: (res_head_food + res_empl_food) * dir_food,
        serv: (res_head_serv + res_empl_serv) * dir_serv,
    }
}
