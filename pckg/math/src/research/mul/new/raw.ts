import type { EcoDef } from "#src/type/ecodef";

export const research_mul_new_raw = function (eco: EcoDef, research: number): number {
    return eco.cst.research_prodmul ** (research / eco.cst.research_divisor)
}
