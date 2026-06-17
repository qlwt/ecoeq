import { pop_new } from "#src/pop/new"
import type { EcoDef } from "#src/type/ecodef"

export const salary_new_head = function(eco: EcoDef, salary_worker: number): number {
    const population = pop_new(eco)

    return (
        + salary_worker
        + Math.max(0, (
            + eco.cst.money * population
            - salary_worker * population
        ) / eco.cst.pop_head)
    )
}

