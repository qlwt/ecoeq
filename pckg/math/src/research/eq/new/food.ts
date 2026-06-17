import { demand_new_food } from "#src/demand/new/food";
import type { EcoDef } from "#src/type/ecodef";

export const research_eq_new_food = function(eco: EcoDef): number {
    const base_ln = Math.log(eco.cst.research_prodmul)
    const employment_max = demand_new_food(eco) / eco.prod_food.baseoutput * (1 + eco.prod_food.baseinput)

    return Math.log(
        employment_max / eco.cst.research_inframul * base_ln
    ) / base_ln * eco.cst.research_divisor
}
