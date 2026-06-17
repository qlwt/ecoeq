import { demand_new_serv } from "#src/demand/new/serv";
import type { EcoDef } from "#src/type/ecodef";

export const research_eq_new_serv = function(eco: EcoDef): number {
    const base_ln = Math.log(eco.cst.research_prodmul)
    const employment_max = demand_new_serv(eco) / eco.prod_serv.baseoutput * (1 + eco.prod_serv.baseinput)

    return Math.log(
        employment_max / eco.cst.research_inframul * base_ln
    ) / base_ln * eco.cst.research_divisor
}

