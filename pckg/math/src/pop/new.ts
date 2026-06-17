import type { EcoDef } from "#src/type/ecodef";

export const pop_new = function (eco: EcoDef): number {
    return eco.cst.pop_empl + eco.cst.pop_head
}
