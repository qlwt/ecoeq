import { research_mul_new_raw } from "#src/research/mul/new/raw";
import type { EcoDef } from "#src/type/ecodef";

export const research_mul_new_serv = function (eco: EcoDef): number {
    return research_mul_new_raw(eco, eco.prod_serv.research)
}

