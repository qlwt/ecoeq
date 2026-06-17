import { research_eq_new_food } from "#src/research/eq/new/food";
import { research_eq_new_serv } from "#src/research/eq/new/serv";
import type { EcoDef } from "#src/type/ecodef";

export const research_max_new = function(eco: EcoDef): number {
    const eq_food = research_eq_new_food(eco)
    const eq_serv = research_eq_new_serv(eco)

    return (
        + Math.abs(eq_food - (eco.prod_food.research * (1 - eco.cst.research_decay)))
        + Math.abs(eq_serv - (eco.prod_serv.research * (1 - eco.cst.research_decay)))
    )
}
