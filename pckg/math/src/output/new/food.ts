import { research_mul_new_food } from "#src/research/mul/new/food";
import type { EcoDef } from "#src/type/ecodef";

export const output_new_food = function(eco: EcoDef): number {
    return eco.prod_food.baseoutput * research_mul_new_food(eco)
}
