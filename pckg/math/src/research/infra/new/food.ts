import type { EcoDef } from "#src/type/ecodef";

export const research_infra_new_food = function(eco: EcoDef): number {
    return eco.cst.research_inframul * (eco.prod_food.research / eco.cst.research_divisor)
}
