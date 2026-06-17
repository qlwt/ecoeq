import { research_mul_new_serv } from "#src/research/mul/new/serv";
import type { EcoDef } from "#src/type/ecodef";

export const output_new_serv = function(eco: EcoDef): number {
    return eco.prod_serv.baseoutput * research_mul_new_serv(eco)
}
