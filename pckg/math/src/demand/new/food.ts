import { pop_new } from "#src/pop/new";
import type { EcoDef } from "#src/type/ecodef";

export const demand_new_food = function (eco: EcoDef): number {
    return pop_new(eco) * eco.cst.need_food
}
